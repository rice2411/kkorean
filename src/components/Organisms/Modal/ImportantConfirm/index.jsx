import {
    Box,
    Button,
    Heading,
    Image,
    Input,
    Label,
    Paragraph,
} from "@/components/Atoms";
import { DOMHelpers, FileHelpers } from "@/helpers";
import useModal from "@/hooks/useModal";
import React, { useEffect, useState } from "react";

const ImportantConfirmModal = () => {
    const { modalImportantConfirm, handleModiferModalImportantConfirm } =
        useModal();
    const [data, setData] = useState(modalImportantConfirm);
    const [textConfirm, setTextConfirm] = useState("");

    const handlelose = () => {
        handleModiferModalImportantConfirm({ isOpen: false });
    };

    useEffect(() => {
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
                        onClick={handlelose}
                        type="button"
                        className="absolute cursor-pointer top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                        data-modal-toggle="defaultModal"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </Box>
                    <Box className="p-4 md:p-5 text-center">
                        <Box className="flex items-center justify-center">
                            <svg
                                className="h-20 w-20 "
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier"></g>
                                <g id="SVGRepo_tracerCarrier"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M12 2.98828L22.2924 21H1.70764L12 2.98828ZM4.29241 19.5H19.7076L12 6.01163L4.29241 19.5Z"
                                        fill="#080341"
                                    ></path>{" "}
                                    <path
                                        d="M11.25 15L11.25 10.5L12.75 10.5L12.75 15L11.25 15Z"
                                        fill="#080341"
                                    ></path>{" "}
                                    <path
                                        d="M11.25 17.25L11.25 15.75L12.75 15.75L12.75 17.25L11.25 17.25Z"
                                        fill="#080341"
                                    ></path>{" "}
                                </g>
                            </svg>
                        </Box>

                        <Heading className="mb-5 text-lg font-normal text-gray-500">
                            {DOMHelpers.stringHTML2JSX(data?.text)}
                        </Heading>
                        <Box className="flex flex-col">
                            <Box className="!self-baseline flex ">
                                <Label
                                    className="text-sm font-thin"
                                    text={`Vui lòng nhập `}
                                ></Label>{" "}
                                <Label
                                    text={data.confirmData}
                                    className="ml-1 !font-bold "
                                ></Label>
                                <Label
                                    text={`để xác nhận xóa`}
                                    className="ml-1 font-thin"
                                ></Label>{" "}
                            </Box>
                            <Input
                                id="confirm"
                                onChange={(e) => setTextConfirm(e.target.value)}
                            />
                        </Box>
                        <Box className="flex items-center justify-center">
                            <Button
                                onClick={data.okButton.onClick}
                                disabled={data.confirmData !== textConfirm}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="mt-4 w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                {data.okButton?.text}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ImportantConfirmModal;
