import { Box, Input, Label, Button } from "@/components/Atoms";
import { Modal } from "@/components/Organisms";
import MODAL_TYPE from "@/constants/modal";
import { useLoading } from "@/hooks";
import useModal from "@/hooks/useModal";
import { ClassService } from "@/services";
import Toast from "@/utils/Toast";
import { useEffect, useState } from "react";
import { useRevalidator } from "react-router-dom";

function ClassModifierModal() {
    const revalidator = useRevalidator();
    const { handleModiferModalSuccess, handleModiferModalBlank, modalBlank } =
        useModal();
    const { showLoading, hideLoading } = useLoading();
    const [className, setClassName] = useState("");

    const handleContinue = () => {
        handleModiferModalSuccess({ isOpen: false });
    };

    const handleCancel = () => {
        handleModiferModalSuccess({ isOpen: false });
        handleModiferModalBlank({ isOpen: false });
    };

    const onCreate = async () => {
        const param = {
            name: className,
            members: 0,
        };
        const response = await ClassService.create(param);
        if (response.data) {
            const textResult = `Lớp <b>${param.name}</b> đã được tạo.`;
            handleModiferModalSuccess({
                isOpen: true,
                text: textResult,
                okButton: {
                    text: "Tiếp tục tạo",
                    onClick: handleContinue,
                },
                cancelButton: {
                    text: "Hủy ",
                    onClick: handleCancel,
                },
            });
        }
    };

    const onUpdate = async () => {
        const param = {
            ...modalBlank.defaultData,
            name: className,
        };
        const response = await ClassService.update(param);
        if (response.data) {
            const textResult = `Lớp <b>${param.name}</b> đã được cập nhật.`;
            handleModiferModalSuccess({
                isOpen: true,
                text: textResult,
                okButton: {
                    text: "OK",
                    onClick: handleCancel,
                },
                cancelButton: {
                    text: "Hủy ",
                    onClick: handleCancel,
                },
            });
        }
    };

    const handleSubmit = async () => {
        try {
            showLoading();
            modalBlank.type === MODAL_TYPE.CREATE
                ? await onCreate()
                : await onUpdate();
        } catch (err) {
            Toast.error("Có lỗi xảy ra vui lòng thử lại sau");
            console.log(err);
        } finally {
            revalidator.revalidate();
            hideLoading();
        }
    };

    useEffect(() => {
        setClassName(
            modalBlank.type === MODAL_TYPE.CREATE
                ? ""
                : modalBlank?.defaultData?.name
        );
    }, [modalBlank]);

    return (
        <>
            <Modal.BlankModal>
                {/* Modal body */}
                <Box className="grid gap-4 mb-4 sm:grid-cols-2">
                    <Box className="sm:col-span-2">
                        <Label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 w-full"
                            text="Tên lớp"
                            required={true}
                        />
                        <Input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Tên lớp"
                            required
                            name="name"
                            value={className}
                            onChange={(e) => {
                                setClassName(e.target.value);
                            }}
                        />
                    </Box>
                </Box>
                <Button
                    onClick={handleSubmit}
                    disabled={!className}
                    type="button"
                    className="w-full text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                    {modalBlank.type === MODAL_TYPE.CREATE ? (
                        <>
                            <svg
                                className="mr-1 -ml-1 w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Tạo lớp
                        </>
                    ) : (
                        "Lưu"
                    )}
                </Button>
            </Modal.BlankModal>
            <Modal.SuccessModal></Modal.SuccessModal>
        </>
    );
}

export default ClassModifierModal;
