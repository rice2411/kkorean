import { Box, Button, Image, Input, Paragraph } from "@/components/Atoms";
import Pagination from "@/components/Molecules/Pagination";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { FileHelpers } from "@/helpers";
import { useEffect, useState } from "react";
import UserModifierModal from "../Modal";
import useModal from "@/hooks/useModal";
import Toast from "@/utils/Toast";
import { ClassService, UserService } from "@/services";
import { useRevalidator } from "react-router-dom";
import { useLoading } from "@/hooks";
import ROLE from "@/constants/role";
import { Empty } from "@/components/Molecules";
import MODAL_TYPE from "@/constants/modal";

function TableUsers({ users }) {
    const revalidator = useRevalidator();
    const { showLoading, hideLoading } = useLoading();
    const {
        handleModiferModalBlank,
        handleModiferModalConfirm,
        handleModiferModalImportantConfirm,
    } = useModal();

    const [searchContent, setSearchContent] = useState("");
    const [page, setPage] = useState(1);
    const [classList, setClassList] = useState([]);

    const handleOpenModal = (type, data) => {
        handleModiferModalBlank({
            isOpen: true,
            title:
                type === MODAL_TYPE.CREATE
                    ? "Thêm tài khoản"
                    : "Chỉnh sửa tìa khoản",
            type,
            defaultData: data,
        });
    };

    const handleClose = () => {
        handleModiferModalConfirm({ isOpen: false });
    };

    const handleDeleteAccount = async (user) => {
        try {
            showLoading();
            await UserService.delete(user);
            await revalidator.revalidate();
            handleClose();
        } catch (err) {
            Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
            console.log(err);
        } finally {
            handleModiferModalImportantConfirm({ isOpen: false });
            hideLoading();
        }
    };

    const handleControlAccount = async (user) => {
        try {
            showLoading();
            const userUpdated = {
                ...user,
                isDisabled: user.isDisabled ? 0 : 1,
            };
            await UserService.update(userUpdated);
            await revalidator.revalidate();
            handleClose();
        } catch (err) {
            Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
            console.log(err);
        } finally {
            hideLoading();
        }
    };

    const handleConfirm = (user) => {
        handleModiferModalConfirm({
            isOpen: true,
            text: `Bạn có muốn ${
                user.isDisabled ? "khôi phục" : "vô hiệu hóa "
            } tài khoản <b>${user.email}</b>`,
            okButton: {
                text: "Xác nhận",
                onClick: () => {
                    handleControlAccount(user);
                },
            },
            cancelButton: {
                text: "Hủy",
                onClick: handleClose,
            },
        });
    };

    const handleImportantConfirm = (user) => {
        handleModiferModalImportantConfirm({
            isOpen: true,
            text: `Bạn có muốn <b>xóa vĩnh viễn</b> tài khoản <b>${user.email}</b> <br/> <span class='text-sm'>Hành động này sẽ không khôi phục lại được</span>`,
            okButton: {
                text: "Xóa",
                onClick: () => {
                    handleDeleteAccount(user);
                },
            },
            confirmData: "delete " + user.email.split("@")[0],
        });
    };

    const handleGetClassList = async () => {
        showLoading();
        try {
            const response = await ClassService.getListCache();
            setClassList(response);
        } catch (err) {
            Toast.error("Có lỗi xảy ra vui lòng thử lại sau");
            console.log(err);
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        handleGetClassList();
    }, []);

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
                                        id="simple-search"
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
                                    handleOpenModal(MODAL_TYPE.CREATE, null);
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
                                Thêm người dùng
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
                                        Người dùng
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Lớp
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Trạng thái tài khoản
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            {users.length === 0 && (
                                <tbody>
                                    <tr>
                                        <td colSpan={5}>
                                            <Empty />
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                            {users && users.length > 0 && (
                                <tbody>
                                    {users
                                        .slice(
                                            !searchContent
                                                ? DEFAULT_PAGE_SIZE * (page - 1)
                                                : 0,
                                            !searchContent
                                                ? DEFAULT_PAGE_SIZE * page
                                                : users.length
                                        )
                                        .filter(
                                            (user) =>
                                                user.fullName
                                                    .toLowerCase()
                                                    .includes(searchContent) ||
                                                user.email
                                                    .toLowerCase()
                                                    .includes(searchContent)
                                        )
                                        .map((user, index) => (
                                            <tr
                                                className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                                                key={user.id}
                                                onClick={(e) => {
                                                    if (
                                                        !e.target.id.includes(
                                                            "delete"
                                                        )
                                                    )
                                                        handleOpenModal(
                                                            "edit",
                                                            user
                                                        );
                                                }}
                                            >
                                                <td className="w-4 p-4 text-center">
                                                    {DEFAULT_PAGE_SIZE *
                                                        (page - 1) +
                                                        index +
                                                        1}
                                                </td>
                                                <th
                                                    scope="row"
                                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                                                >
                                                    <Image
                                                        className="w-10 h-10 rounded-full"
                                                        src={FileHelpers.getLocalFile(
                                                            "user-none",
                                                            "jpg"
                                                        )}
                                                        alt="Jese image"
                                                    />
                                                    <div className="ps-3">
                                                        <div className="text-base font-semibold">
                                                            {user.fullName}
                                                        </div>
                                                        <div className="font-normal text-gray-500">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4">
                                                    {user.role === ROLE.ADMIN
                                                        ? user.class
                                                        : classList.find(
                                                              (item) =>
                                                                  item.id ===
                                                                  user.class
                                                          )?.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`h-2.5 w-2.5 rounded-full me-2 ${
                                                                user.isDisabled
                                                                    ? "bg-red-500"
                                                                    : "bg-green-500"
                                                            }`}
                                                        />
                                                        {user.isDisabled
                                                            ? "Vô hiệu hóa"
                                                            : "Hoạt động"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 flex">
                                                    {user.role ===
                                                    ROLE.ADMIN ? (
                                                        <Paragraph className="italic">
                                                            Không thể xóa
                                                        </Paragraph>
                                                    ) : (
                                                        <>
                                                            <Box
                                                                id="deleteButton2"
                                                                onClick={() => {
                                                                    handleConfirm(
                                                                        user
                                                                    );
                                                                }}
                                                                isDisabled={
                                                                    user.role ===
                                                                    ROLE.ADMIN
                                                                }
                                                                className={`${
                                                                    user.isDisabled
                                                                        ? "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
                                                                        : "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300"
                                                                } mr-2 w-max cursor-pointer flex items-center font-medium rounded-lg text-sm px-3 py-2 text-center`}
                                                            >
                                                                {user.isDisabled ? (
                                                                    <svg
                                                                        viewBox="0 0 1024 1024"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="currentColor"
                                                                        className="h-4 w-4 mr-2 -ml-0.5"
                                                                    >
                                                                        <g id="SVGRepo_bgCarrier"></g>
                                                                        <g
                                                                            id="SVGRepo_tracerCarrier"
                                                                            stroke-linecap="round"
                                                                            stroke-linejoin="round"
                                                                        ></g>
                                                                        <g id="SVGRepo_iconCarrier">
                                                                            <path
                                                                                fill="currentColor"
                                                                                d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"
                                                                            ></path>
                                                                        </g>
                                                                    </svg>
                                                                ) : (
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
                                                                )}
                                                                {user.isDisabled
                                                                    ? "Khôi phục"
                                                                    : "  Vô hiệu hóa"}
                                                            </Box>
                                                            <Box
                                                                id="deleteButton1"
                                                                isDisabled={
                                                                    user.role ===
                                                                    ROLE.ADMIN
                                                                }
                                                                onClick={() => {
                                                                    handleImportantConfirm(
                                                                        user
                                                                    );
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
                                                        </>
                                                    )}
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
                        length={(users && users.length) || 0}
                    />
                </Box>
                <UserModifierModal classes={classList} />
            </section>
        </>
    );
}

export default TableUsers;
