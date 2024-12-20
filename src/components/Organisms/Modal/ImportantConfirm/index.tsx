import { Box, Button, Heading, Input, Label, Svg } from "@/components/Atoms";
import { DOMHelpers, FileHelpers } from "@/helpers";
import { useLoading, useModal } from "@/hooks";
import { IContext } from "@/interface";
import React, { useEffect, useState } from "react";

// Define types for the modal button and confirm data

const ImportantConfirmModal: React.FC = () => {
    const { modalImportantConfirm, handleModiferModalImportantConfirm } =
        useModal() as unknown as IContext.IModalContext.UseModalReturnType;
    const { showLoading } =
        useLoading() as unknown as IContext.ILoadingContext.UseLoadingReturnType;
    const [data, setData] = useState<IContext.IModalContext.ModalState>(
        modalImportantConfirm
    );
    const [textConfirm, setTextConfirm] = useState<string>("");
    const [isSubmited, setIsSubmited] = useState<boolean>(false);

    const handleClose = () => {
        handleModiferModalImportantConfirm({ isOpen: false });
    };

    const handleSubmit = () => {
        showLoading();
        if (data.okButton?.onClick) {
            data.okButton.onClick();
        }
        setIsSubmited(true);
    };

    useEffect(() => {
        if (modalImportantConfirm.isOpen) {
            setIsSubmited(false);
        }
        setData(modalImportantConfirm);
    }, [modalImportantConfirm]);

    if (!data.isOpen) return null;

    return (
        <Box
            id="modal-success"
            className="absolute inset-0 bg-gray-300 bg-opacity-50 h-full flex items-center justify-center z-50 overflow-y-auto"
        >
            <Box className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                {/* Modal Content */}
                <Box className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    {/* Modal header */}
                    <Box
                        onClick={handleClose}
                        className="absolute cursor-pointer top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        data-modal-toggle="defaultModal"
                    >
                        <Svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            src={FileHelpers.getLocalFile("close", "path")}
                        />
                    </Box>
                    <Box className="p-4 md:p-5 text-center">
                        <Box className="flex items-center justify-center">
                            <Svg
                                className="h-20 w-20"
                                viewBox="0 0 24 24"
                                fill="none"
                                src={FileHelpers.getLocalFile("danger", "path")}
                            />
                        </Box>

                        <Heading className="mb-5 text-lg font-normal text-gray-500">
                            {DOMHelpers.stringHTML2JSX(data?.text || "")}
                        </Heading>
                        <Box className="flex flex-col">
                            <Box className="!self-baseline flex">
                                <Label
                                    className="text-sm font-thin"
                                    text={`Vui lòng nhập `}
                                />
                                <Label
                                    text={data.confirmData || ""}
                                    className="ml-1 !font-bold"
                                />
                                <Label
                                    text={`để xác nhận xóa`}
                                    className="ml-1 font-thin"
                                />
                            </Box>
                            <Input
                                onChange={(e) => setTextConfirm(e.target.value)}
                            />
                        </Box>
                        <Box className="flex items-center justify-center">
                            <Button
                                onClick={handleSubmit}
                                disabled={
                                    data.confirmData !== textConfirm ||
                                    isSubmited
                                }
                                data-modal-hide="popup-modal"
                                className="mt-4 w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                {isSubmited
                                    ? "Đang tải.."
                                    : data.okButton?.text}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ImportantConfirmModal;
