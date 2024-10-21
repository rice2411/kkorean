import { EXAM_CONSTANTS, FILE_CONSTANTS } from "@/constants";
import { ExamUtils } from "@/utils";
import { useLoading } from "@/hooks";
import { useModal } from "@/hooks";
import { ExamsAPI } from "@/apis";
import Toast from "@/utils/Toast";
import { useRef, useState } from "react";
import { useRevalidator } from "react-router-dom";
import * as XLSX from "xlsx";
import TableExamsPresenter from "./presenter";
import { FilesAPI } from "@/apis/";
import { IContext, IExam } from "@/interface";
import { AUDIO_KEY } from "@/constants/exam";
interface Props {
    exams: IExam.BaseExam[];
}

const TableExamsContainer: React.FC<Props> = ({ exams }) => {
    // Custom Hooks
    const { showLoading, hideLoading, setLoadingText } =
        useLoading() as unknown as IContext.ILoadingContext.UseLoadingReturnType;
    const { handleModiferModalConfirm, handleModiferModalBlank } =
        useModal() as unknown as IContext.IModalContext.UseModalReturnType;
    // React routr dom
    const revalidator = useRevalidator();
    // Ref
    const uploadRef = useRef<HTMLInputElement | null>(null);

    // State
    const [exam, setExam] = useState<IExam.BaseExam | null>(null);

    //#region LOGIC FUNCTION
    const resetRef = () => {
        if (uploadRef.current) {
            uploadRef.current.value = "";
        }
    };

    const onCloseModalConfirm = () => {
        handleModiferModalConfirm({ isOpen: false });
    };

    const onUploadAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            showLoading();
            const files = e.target.files;

            if (!files || files.length === 0) {
                return;
            }
            const file = files[0];
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            let fileName = file.name.split(".").shift()?.toLowerCase();

            if (
                typeof fileName === "string" &&
                !fileName.includes(EXAM_CONSTANTS.AUDIO_KEY)
            ) {
                Toast.error("File không đúng tên");
                return;
            }
            if (
                exam &&
                fileExtension &&
                FILE_CONSTANTS.EAllowedExtensions.AUDIO.includes(fileExtension)
            ) {
                setLoadingText(`Đang tải file ${file.name}`);
                fileName = `${exam.id}.${AUDIO_KEY}`;
                const res = await FilesAPI.upload(fileName, file, "video");
                if (res) {
                    const newTest = { ...exam, isAudioUploaded: 1 };
                    await ExamsAPI.update(newTest);
                    revalidator.revalidate();
                    Toast.success("Tải file nghe lên thành công");
                }
            }
        } catch (err) {
            console.log(err);
            Toast.error("Có lỗi xảy ra vui lòng thử lại");
        } finally {
            hideLoading();
            resetRef();
            setLoadingText("");
        }
    };

    const uploadImages = async (files: File[]) => {
        let count = 0;
        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileName = `${exam?.id}_${file.name
                    .split(".")
                    .slice(0, -1)
                    .join(".")}.${EXAM_CONSTANTS.IMAGE_KEY}`;
                await FilesAPI.upload(fileName, file);
                count++;
                setLoadingText(
                    `Vui lòng không đóng tab. Đã tải lên ${count}/${files.length}`
                );
            }
            return true;
        } catch (error) {
            console.error("Error uploading image:", error);
            return false;
        } finally {
            setLoadingText(``);
        }
    };

    const onUploadImages = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            showLoading();

            const selectedFiles = event.target.files
                ? Array.from(event.target.files)
                : [];

            const invalidFiles = selectedFiles.filter((file: File) => {
                const fileExtension =
                    file.name.split(".").pop()?.toLowerCase() || "";
                return !FILE_CONSTANTS.EAllowedExtensions.IMAGE.includes(
                    fileExtension
                );
            });

            if (invalidFiles.length > 0) {
                Toast.error("Định dạng file không hỗ trợ");
                return;
            }

            let count = 0;

            selectedFiles.forEach((item) => {
                if (
                    EXAM_CONSTANTS.DEFAULT_FORMAT_QUESTION.includes(
                        item.name.split(".").slice(0, -1).join(".")
                    )
                )
                    count++;
            });

            if (count !== selectedFiles.length) {
                Toast.error(
                    "Có file đặt tên chưa đúng định dạng vui lòng kiểm tra lại"
                );
                return;
            }

            const res = await uploadImages(selectedFiles);
            if (res && exam) {
                const newTest: IExam.BaseExam = { ...exam, isImageUploaded: 1 };
                await ExamsAPI.update(newTest);
                revalidator.revalidate();
                Toast.success("Tải ảnh lên thành công");
            }
        } catch (err) {
            console.log(err);
        } finally {
            resetRef();
            hideLoading();
        }
    };

    const onUploadExcel = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files && event.target.files[0];

        if (!file) {
            return;
        }

        const payload: IExam.ExamRequest = {
            name: file.name.split(".")[0],
            level: EXAM_CONSTANTS.EExamLevel.EASY,
            type: EXAM_CONSTANTS.EExamType.LISTENING,
            questions: "",
            isImageUploaded: 0,
            plan: EXAM_CONSTANTS.EExamPlan.FREE,
        };

        const fileExtension = file?.name.split(".").pop()?.toLowerCase();

        if (fileExtension !== "xlsx" && fileExtension !== "xls") {
            Toast.error("Định dạng file không hỗ trợ");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
                const data = new Uint8Array(e.target.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });

                // Lấy tên của sheet đầu tiên
                const firstSheetName = workbook.SheetNames[0];
                const examInfo = firstSheetName.split("-");

                payload.type = ExamUtils.getExamTypeString(examInfo[0]);
                payload.level = ExamUtils.getExamLevelString(examInfo[1]);
                payload.plan = ExamUtils.getExamPlanString(examInfo[2]);

                if (!ExamUtils.handleValidateExamInfo(payload)) {
                    Toast.error("Vui lòng kiểm tra tên của file sheet");
                    return;
                }

                const worksheet = workbook.Sheets[firstSheetName];

                // Chuyển đổi dữ liệu sheet thành JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                });

                //kết quả
                const result: any = [];

                // chạy theo dòng
                jsonData.forEach((row: any) => {
                    const rowData = [];

                    for (let i = 0; i < row.length; i++) {
                        if (
                            row[i] === undefined ||
                            row[i] === null ||
                            row[i] === ""
                        ) {
                            break; // Dừng lại khi gặp ô trống
                        }
                        rowData.push(row[i]); // Thêm ô vào mảng nếu có dữ liệu
                    }
                    result.push(rowData);
                });
                payload.questions = JSON.stringify(result);
                await onCreateExam(payload);
            }
        };

        reader.readAsArrayBuffer(file);
        resetRef();
    };

    const onCreateExam = async (payload: IExam.ExamRequest) => {
        try {
            showLoading();
            const resposne = (await ExamsAPI.create(payload)) as IExam.BaseExam;
            if (resposne.name) {
                Toast.success(`Bộ đề ${payload.name} đã tạo thành công`);
                revalidator.revalidate();
            }
        } catch (err) {
            console.log(err);
            Toast.error(`Đã có lỗi xảy ra`);
        } finally {
            hideLoading();
            resetRef();
        }
    };
    const onDeleteExam = async (data: IExam.BaseExam) => {
        showLoading();
        setLoadingText("Đang xóa vui lòng chờ..");
        try {
            const request = [];
            await ExamsAPI.delete(data);
            EXAM_CONSTANTS.DEFAULT_FORMAT_QUESTION.forEach(async (item) => {
                const publicId = `${data.id}_${item}.${EXAM_CONSTANTS.IMAGE_KEY}`;
                if (data.isImageUploaded)
                    request.push(FilesAPI.deleteAssetByPublicId(publicId));
            });
            if (
                data.type === EXAM_CONSTANTS.EExamType.LISTENING &&
                data.isAudioUploaded
            ) {
                const audioID = `${data.id}.${EXAM_CONSTANTS.AUDIO_KEY}`;
                request.push(FilesAPI.deleteAssetByPublicId(audioID));
            }
            await Promise.all(request);
            onCloseModalConfirm();
            Toast.success(`Đã xóa thành công ${data.name}`);
        } catch (err) {
            Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
            console.log(err);
        } finally {
            revalidator.revalidate();
            hideLoading();
            setLoadingText("Đang xóa vui lòng chờ..");
        }
    };

    //#endregion

    //#region HANDLE FUNCTION
    const handleOpenWindowExplorer = (
        exam: IExam.BaseExam | null,
        type: string
    ) => {
        if (uploadRef.current) {
            switch (type) {
                case FILE_CONSTANTS.EUploadType.IMAGE:
                    uploadRef.current.multiple = true;
                    uploadRef.current.accept =
                        FILE_CONSTANTS.EAllowedExtensions.IMAGE;
                    break;
                case FILE_CONSTANTS.EUploadType.AUDIO:
                    uploadRef.current.accept =
                        FILE_CONSTANTS.EAllowedExtensions.AUDIO;
                    break;
                case FILE_CONSTANTS.EUploadType.EXCEL:
                    uploadRef.current.accept =
                        FILE_CONSTANTS.EAllowedExtensions.EXCEL;
                    break;
            }
            setExam(exam);
            uploadRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (uploadRef.current) {
            switch (uploadRef.current.accept) {
                case FILE_CONSTANTS.EAllowedExtensions.IMAGE:
                    onUploadImages(event);
                    break;
                case FILE_CONSTANTS.EAllowedExtensions.AUDIO:
                    onUploadAudio(event);
                    break;
                case FILE_CONSTANTS.EAllowedExtensions.EXCEL:
                    onUploadExcel(event);
                    break;
            }
        }
    };

    const handleOpenModalExamPrevier = (exam: IExam.BaseExam | null) => {
        if (!exam) return;

        handleModiferModalBlank({
            isOpen: true,
            title:
                exam.name +
                ` - ${ExamUtils.getExamType(exam.type || 0)}` +
                " - Chế độ xem trước",
        });
        setExam(exam);
    };

    const handleDeleteExam = (data: IExam.BaseExam) => {
        handleModiferModalConfirm({
            isOpen: true,
            text: `Bạn có muốn xóa bộ đề <b>${data.name}</b>`,
            okButton: {
                text: "Xác nhận",
                onClick: () => {
                    onDeleteExam(data);
                },
            },
            cancelButton: {
                text: "Hủy",
                onClick: onCloseModalConfirm,
            },
        });
    };
    //#endregion

    return (
        <TableExamsPresenter
            // data
            exams={exams}
            exam={exam}
            // upload file properties
            uploadRef={uploadRef}
            handleOpenWindowExplorer={handleOpenWindowExplorer}
            handleFileChange={handleFileChange}
            // other
            handleOpenModalExamPrevier={handleOpenModalExamPrevier}
            handleDeleteExam={handleDeleteExam}
        ></TableExamsPresenter>
    );
};

export default TableExamsContainer;
