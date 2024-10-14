import { EXAM_CONSTANTS, FILE_CONSTANTS } from "@/constants";
import { ExamUtils } from "@/utils";
import { useLoading } from "@/hooks";
import { useModal } from "@/hooks";
import { CloudinaryService, ExamService } from "@/services";
import Toast from "@/utils/Toast";
import { useRef, useState } from "react";
import { useRevalidator } from "react-router-dom";
import * as XLSX from "xlsx";
import TableExamsPresenter from "./presenter";
import { CloudinaryUtils } from "@/utils";

function TableExamsContainer({ exams }) {
  // Custom Hooks
  const { showLoading, hideLoading, setLoadingText } = useLoading();
  const { handleModiferModalConfirm, handleModiferModalBlank } = useModal();
  // React routr dom
  const revalidator = useRevalidator();
  // Ref
  const uploadRef = useRef();

  // State
  const [exam, setExam] = useState(null);

  // Function
  const resetRef = () => {
    uploadRef.current.value = "";
  };

  const handleCloseModalConfirm = () => {
    handleModiferModalConfirm({ isOpen: false });
  };

  const handleOpenModalExamPrevier = (exam) => {
    handleModiferModalBlank({ isOpen: true });
    setExam(exam);
  };

  const handleOpenWindowExplorer = (exam, type) => {
    switch (type) {
      case FILE_CONSTANTS.UPLOAD_TYPE.IMAGE:
        uploadRef.current.multiple = true;
        uploadRef.current.accept = FILE_CONSTANTS.ALLOWED_EXTENSIONS.IMAGE;
        break;
      case FILE_CONSTANTS.UPLOAD_TYPE.AUDIO:
        uploadRef.current.accept = FILE_CONSTANTS.ALLOWED_EXTENSIONS.AUDIO;
        break;
      case FILE_CONSTANTS.UPLOAD_TYPE.EXCEL:
        uploadRef.current.accept = FILE_CONSTANTS.ALLOWED_EXTENSIONS.EXCEL;
        break;
    }
    setExam(exam);
    uploadRef.current.click();
  };

  const handleFileChange = (event) => {
    switch (uploadRef.current.accept) {
      case FILE_CONSTANTS.ALLOWED_EXTENSIONS.IMAGE:
        handleUploadImages(event);
        break;
      case FILE_CONSTANTS.ALLOWED_EXTENSIONS.AUDIO:
        handleUploadAudio(event);
        break;
      case FILE_CONSTANTS.ALLOWED_EXTENSIONS.EXCEL:
        handleUploadExcel(event);
        break;
    }
  };

  const handleUploadAudio = async (e) => {
    try {
      showLoading();
      const files = e.target.files;

      if (!files || files.length === 0) {
        return;
      }

      const file = files[0];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (
        fileExtension &&
        FILE_CONSTANTS.ALLOWED_EXTENSIONS.AUDIO.includes(fileExtension)
      ) {
        const fileName = `${exam.id}_${file.name}`;
        const formData = CloudinaryUtils.generateFormData(fileName, file);
        const res = await CloudinaryService.upload(formData, "video");
        if (res) {
          const newTest = { ...exam, isAudioUploaded: 1 };
          await ExamService.update(newTest);
          revalidator.revalidate();
          Toast.success("Tải file nghe  lên thành công");
        }
      }
    } catch (err) {
      console.log(err);
      Toast.error("Có lỗi xảy ra vui lòng thử lại");
    } finally {
      hideLoading();
      resetRef();
    }
  };

  const handleUploadImages = async (event) => {
    try {
      showLoading();

      const selectedFiles = Array.from(event.target.files);

      const fileExtension = console.log(fileExtension);

      const invalidFiles = selectedFiles.filter(
        (file) =>
          !FILE_CONSTANTS.ALLOWED_EXTENSIONS.IMAGE.includes(
            file.name.split(".").pop().toLowerCase()
          )
      );

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

      const uploadImages = async (files) => {
        let count = 0;
        try {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileName = `${exam.id}_${file.name}`;
            const formData = CloudinaryUtils.generateFormData(fileName, file);
            await CloudinaryService.upload(formData);
            count++;
            setLoadingText(`Đã tải lên ${count}/${files.length}`);
          }
          return true;
        } catch (error) {
          console.error("Error uploading image:", error);
          return false;
        }
      };

      const res = await uploadImages(selectedFiles);
      if (res) {
        const newTest = { ...exam, isImageUploaded: 1 };
        await ExamService.update(newTest);
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

  const handleUploadExcel = async (event) => {
    const file = event.target.files[0];
    const payload = {
      name: file.name.split(".")[0],
      level: EXAM_CONSTANTS.EXAM_LEVEL.EASY,
      type: EXAM_CONSTANTS.EXAM_LEVEL.LISTENING,
      question: ``,
      isImageUploaded: 0,
      plan: EXAM_CONSTANTS.EXAM_PLAN.FREE,
    };
    // Kiểm tra nếu file không tồn tại
    if (!file) {
      return;
    }

    // Kiểm tra định dạng file
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension !== "xlsx" && fileExtension !== "xls") {
      Toast.error("Định dạng file không hỗ trợ");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
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
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      //kết quả
      const result = [];

      // chạy theo dòng
      jsonData.forEach((row) => {
        const rowData = [];

        for (let i = 0; i < row.length; i++) {
          if (row[i] === undefined || row[i] === null || row[i] === "") {
            break; // Dừng lại khi gặp ô trống
          }
          rowData.push(row[i]); // Thêm ô vào mảng nếu có dữ liệu
        }
        result.push(rowData);
      });
      payload.question = JSON.stringify(result);
      await handleCreateExam(payload);
    };

    reader.readAsArrayBuffer(file);
    excelUploadRef.current.value = "";
  };

  const handleCreateExam = async (payload) => {
    try {
      showLoading();
      const resposne = await ExamService.create(payload);
      if (resposne.data) {
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

  const handleDeleteExam = (data) => {
    handleModiferModalConfirm({
      isOpen: true,
      text: `Bạn có muốn xóa bộ đề <b>${data.name}</b>`,
      okButton: {
        text: "Xác nhận",
        onClick: async () => {
          try {
            showLoading();
            await ExamService.delete(data);
            EXAM_CONSTANTS.DEFAULT_FORMAT_QUESTION.forEach(async (item) => {
              const publicId = `${data.id}_${item}.png`;
              await CloudinaryService.deleteImageByPublicId(publicId);
            });
            await revalidator.revalidate();
            handleCloseModalConfirm();
            Toast.success(`Đã xóa thành công ${data.name}`);
          } catch (err) {
            Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
            console.log(err);
          } finally {
            hideLoading();
          }
        },
      },
      cancelButton: {
        text: "Hủy",
        onClick: handleCloseModalConfirm,
      },
    });
  };

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
}

export default TableExamsContainer;
