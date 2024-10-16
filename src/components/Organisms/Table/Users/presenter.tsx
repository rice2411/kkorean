import { Box, Image, Input, Paragraph, Svg } from "@/components/Atoms";
import Pagination from "@/components/Molecules/Pagination";
import {
    PAGINATION_CONSTANTS,
    MODAL_CONSTANTS,
    CONFIG_CONSTANTS,
} from "@/constants";
import { FileHelpers } from "@/helpers";
import { useState } from "react";
import { Empty } from "@/components/Molecules";
import { ModalCustom } from "@/components/Organisms/";

interface User {
    id: string;
    fullName: string;
    email: string;
    role: string;
    group: string; // Change this to a specific type if you have predefined group types
    isDisabled: boolean;
}

interface Group {
    id: string;
    name: string;
}

interface TableUsersPresenterProps {
    users: User[];
    groups: Group[];
    handleConfirmUpdateAccountStatus: (user: User) => void;
    handleImportantConfirm: (user: User) => void;
    handleOpenModalUser: (modalType: string, user: User | null) => void;
    handleConfirmResetPassword: (user: User) => void;
}

const TableUsersPresenter: React.FC<TableUsersPresenterProps> = ({
    users,
    groups,
    handleConfirmUpdateAccountStatus,
    handleImportantConfirm,
    handleOpenModalUser,
    handleConfirmResetPassword,
}) => {
    const [searchContent, setSearchContent] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    return (
        <section className="antialiased mt-4">
            <Box className="bg-white relative overflow-hidden mt-4">
                <Box className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t">
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <Box
                            onClick={() => {
                                handleOpenModalUser(
                                    MODAL_CONSTANTS.MODAL_TYPE.CREATE,
                                    null
                                );
                            }}
                            className="cursor-pointer flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            <Svg
                                className="mr-1 -ml-1 w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                src={FileHelpers.getLocalFile("add", "path")}
                            />
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
                                            ? PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE *
                                                  (page - 1)
                                            : 0,
                                        !searchContent
                                            ? PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE *
                                                  page
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
                                                    !e.currentTarget.id.includes(
                                                        "delete"
                                                    )
                                                ) {
                                                    handleOpenModalUser(
                                                        MODAL_CONSTANTS
                                                            .MODAL_TYPE.UPDATE,
                                                        user
                                                    );
                                                }
                                            }}
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
                                                <Image
                                                    className="w-10 h-10 rounded-full"
                                                    src={FileHelpers.getLocalFile(
                                                        "user-none",
                                                        "jpg"
                                                    )}
                                                    alt="User image"
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
                                                {user.role ===
                                                CONFIG_CONSTANTS.USER_ROLE.ADMIN
                                                    ? user.group
                                                    : groups.find(
                                                          (item) =>
                                                              item.id ===
                                                              user.group
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
                                                CONFIG_CONSTANTS.USER_ROLE
                                                    .ADMIN ? (
                                                    <Paragraph className="italic">
                                                        Không thể xóa
                                                    </Paragraph>
                                                ) : (
                                                    <>
                                                        <Box
                                                            id="deleteButton2"
                                                            onClick={() =>
                                                                handleConfirmUpdateAccountStatus(
                                                                    user
                                                                )
                                                            }
                                                            className={`${
                                                                user.isDisabled
                                                                    ? "text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
                                                                    : "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300"
                                                            } mr-2 w-max cursor-pointer flex items-center font-medium rounded-lg text-sm px-3 py-2 text-center`}
                                                        >
                                                            <Svg
                                                                viewBox="0 0 1024 1024"
                                                                className="h-4 w-4 mr-2 -ml-0.5"
                                                                src={FileHelpers.getLocalFile(
                                                                    "setting",
                                                                    "path"
                                                                )}
                                                            />
                                                            {user.isDisabled
                                                                ? "Khôi phục"
                                                                : "  Vô hiệu hóa"}
                                                        </Box>
                                                        <Box
                                                            id="deleteButton1"
                                                            onClick={() =>
                                                                handleImportantConfirm(
                                                                    user
                                                                )
                                                            }
                                                            className="w-max cursor-pointer flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
                                                        >
                                                            <Svg
                                                                className="h-4 w-4 mr-2 -ml-0.5"
                                                                viewBox="0 0 20 20"
                                                                src={FileHelpers.getLocalFile(
                                                                    "trash",
                                                                    "path"
                                                                )}
                                                            />
                                                            Xóa vĩnh viễn
                                                        </Box>
                                                        <Box
                                                            id="deleteButton3"
                                                            onClick={() =>
                                                                handleConfirmResetPassword(
                                                                    user
                                                                )
                                                            }
                                                            className="ml-2 w-max cursor-pointer flex items-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
                                                        >
                                                            <Svg
                                                                viewBox="0 0 52 52"
                                                                className="h-4 w-4 mr-2 -ml-0.5"
                                                                src={FileHelpers.getLocalFile(
                                                                    "resetPassword",
                                                                    "path"
                                                                )}
                                                            />
                                                            Đặt lại mật khẩu
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
                    totalItems={users.length}
                    page={page}
                    onPageChange={setPage}
                />
            </Box>
        </section>
    );
};

export default TableUsersPresenter;
