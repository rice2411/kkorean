import { Box, Input } from "@/components/Atoms";
import Pagination from "@/components/Molecules/Pagination";
import { PAGINATION_CONSTANTS, MODAL_CONSTANTS } from "@/constants";
import { useState } from "react";
import { ModalCustom } from "@/components/Organisms/";
import { useModal } from "@/hooks";
import Toast from "@/utils/Toast";
import { GroupService } from "@/services";
import { useLoading } from "@/hooks";
import { Empty } from "@/components/Molecules";
import { useRevalidator } from "react-router-dom";

function TableGroups({ groups }) {
    const revalidator = useRevalidator();
    const { showLoading, hideLoading } = useLoading();
    const { handleModiferModalBlank, handleModiferModalConfirm } = useModal();

    const [searchContent, setSearchContent] = useState("");
    const [page, setPage] = useState(1);

    const handleOpenModal = (type, data) => {
        handleModiferModalBlank({
            isOpen: true,
            title:
                type === MODAL_CONSTANTS.MODAL_TYPE.CREATE
                    ? "Thêm lớp"
                    : "Chỉnh sửa lớp",
            type: type,
            defaultData: data,
        });
    };

    const handleClose = () => {
        handleModiferModalConfirm({ isOpen: false });
    };

    const onDelete = async (group) => {
        try {
            showLoading();
            await GroupService.delete(group);
            await revalidator.revalidate();
            handleClose();
        } catch (err) {
            Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
            console.log(err);
        } finally {
            hideLoading();
        }
    };

    const handleDelete = (group) => {
        handleModiferModalConfirm({
            isOpen: true,
            text: `Bạn có muốn xóa lớp <b>${group.name}</b>`,
            okButton: {
                text: "Xác nhận",
                onClick: () => {
                    onDelete(group);
                },
            },
            cancelButton: {
                text: "Hủy",
                onClick: handleClose,
            },
        });
    };

    return (
        <>
            <section className="antialiased mt-4 ">
                <Box className="bg-white  relative  overflow-hidden mt-4">
                    <Box className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t ">
                        <Box className="w-full md:w-1/2">
                            <Box className="flex items-center">
                                <Box className="relative w-full">
                                    <Box className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></Box>
                                    <Input
                                        onChange={(e) => {
                                            setSearchContent(
                                                e.target.value.toLowerCase()
                                            );
                                        }}
                                        type="text"
                                        placeholder="Tìm kiếm tài khoản theo tên, tài khoản, lớp"
                                        required=""
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2  "
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Box
                                onClick={() => {
                                    handleOpenModal(
                                        MODAL_CONSTANTS.MODAL_TYPE.CREATE,
                                        null
                                    );
                                }}
                                className="cursor-pointer flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none "
                            >
                                <svg
                                    className="h-3.5 w-3.5 mr-1.5 -ml-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    />
                                </svg>
                                Thêm lớp
                            </Box>
                        </Box>
                    </Box>
                    <Box className="overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        STT
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tên Lớp
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Số lượng học sinh
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            {groups.length === 0 && (
                                <tbody>
                                    <tr>
                                        <td colSpan={5}>
                                            <Empty />
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                            {groups && groups.length > 0 && (
                                <tbody>
                                    {groups
                                        .slice(
                                            !searchContent
                                                ? PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE *
                                                      (page - 1)
                                                : 0,
                                            !searchContent
                                                ? PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE *
                                                      page
                                                : groups.length
                                        )
                                        .filter((group) =>
                                            group.name
                                                .toLowerCase()
                                                .includes(searchContent)
                                        )
                                        .map((group, index) => (
                                            <tr
                                                onClick={() => {
                                                    handleOpenModal(
                                                        "edit",
                                                        group
                                                    );
                                                }}
                                                className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                                                key={group.id}
                                            >
                                                <td className="w-4 p-4 text-center">
                                                    {PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE *
                                                        (page - 1) +
                                                        index +
                                                        1}
                                                </td>
                                                <th
                                                    scope="row"
                                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                                                >
                                                    <div className="text-base font-semibold">
                                                        {group.name}
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4">
                                                    {group.members} người
                                                </td>

                                                <td className="px-6 py-4 flex">
                                                    <Box
                                                        onClick={() => {
                                                            handleDelete(group);
                                                        }}
                                                        className="w-max cursor-pointer flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center "
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-2 -ml-0.5"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        Xóa vĩnh viễn
                                                    </Box>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            )}
                        </table>
                    </Box>
                    <Pagination
                        page={page}
                        setPage={setPage}
                        length={(groups && groups.length) || 0}
                    />
                </Box>
                <ModalCustom.GroupsModalCustom />
            </section>
        </>
    );
}

export default TableGroups;
