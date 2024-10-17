import { Box, Button, Heading, Svg } from "@/components/Atoms";
import { DOMHelpers, FileHelpers } from "@/helpers";
import { useModal } from "@/hooks";
import { IContext } from "@/interface";
import React, { useEffect, useState } from "react";

const ConfirmModal = () => {
    const { modalConfirm, handleModiferModalConfirm } =
        useModal() as unknown as IContext.IModalContext.UseModalReturnType;
    const [data, setData] = useState(modalConfirm);

    const handlelose = () => {
        handleModiferModalConfirm({ isOpen: false });
    };

    useEffect(() => {
        setData(modalConfirm);
    }, [modalConfirm]);

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
                        className="absolute cursor-pointer top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                        data-modal-toggle="defaultModal"
                    >
                        <Svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            src={FileHelpers.getLocalFile("close", "path")}
                        ></Svg>
                    </Box>
                    <Box className="p-4 md:p-5 text-center">
                        <Svg
                            className="mx-auto mb-4 !text-gray-400 w-12 h-12 dark:text-gray-200"
                            fill="none"
                            viewBox="0 0 20 20"
                            src={FileHelpers.getLocalFile("warning", "path")}
                        ></Svg>
                        <Heading className="mb-5 text-lg font-normal text-gray-500">
                            {DOMHelpers.stringHTML2JSX(data?.text || "")}
                        </Heading>
                        <Box className="flex items-center justify-center">
                            <Button
                                onClick={data?.okButton?.onClick}
                                data-modal-hide="popup-modal"
                                className="text-white !bg-red-600 hover:!bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                {data.okButton?.text}
                            </Button>
                            <Button
                                onClick={data?.cancelButton?.onClick}
                                data-modal-hide="popup-modal"
                                className="py-2.5 px-5 ms-3 text-sm font-medium !text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                            >
                                {data.cancelButton?.text}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ConfirmModal;
