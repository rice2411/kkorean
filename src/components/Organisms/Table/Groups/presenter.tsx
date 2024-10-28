import React, { useState } from "react";
import { Box, Input, Svg } from "@/components/Atoms";
import Pagination from "@/components/Molecules/Pagination";
import { PAGINATION_CONSTANTS, MODAL_CONSTANTS } from "@/constants";
import { ModalCustom } from "@/components/Organisms/";
import { Empty } from "@/components/Molecules";
import { FileHelpers } from "@/helpers";
import { IGroup } from "@/interface";
import { useLoaderData } from "react-router-dom";

interface PresenterProps {
    handleOpenModalModifier: (type: number, data?: IGroup.BaseGroup) => void;
    handleDeleteGroup: (group: IGroup.BaseGroup) => void;
}

const TableGroupsPresenter: React.FC<PresenterProps> = ({
    handleOpenModalModifier,
    handleDeleteGroup,
}) => {
    const groups = useLoaderData() as IGroup.BaseGroup[];

    const [searchContent, setSearchContent] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    return (
        <>
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
                                    handleOpenModalModifier(
                                        MODAL_CONSTANTS.EModalType.CREATE
                                    );
                                }}
                                className="cursor-pointer flex items-center justify-center text-white bg-primary-400 hover:bg-primary-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                            >
                                <Svg
                                    className="mr-1 -ml-1 w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    src={FileHelpers.getLocalFile(
                                        "add",
                                        "path"
                                    )}
                                />
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
                                        <td colSpan={4}>
                                            <Empty />
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                            {groups && groups.length > 0 && (
                                <tbody>
                                    {groups
                                        .filter((group) =>
                                            group.name
                                                .toLowerCase()
                                                .includes(searchContent)
                                        )
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
                                        .map((group, index) => (
                                            <tr
                                                onClick={(
                                                    e: React.MouseEvent
                                                ) => {
                                                    const target =
                                                        e.target as HTMLElement;
                                                    if (
                                                        target.id &&
                                                        target.id.includes(
                                                            "delete"
                                                        )
                                                    ) {
                                                        return;
                                                    }
                                                    handleOpenModalModifier(
                                                        MODAL_CONSTANTS
                                                            .EModalType.UPDATE,
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
                                                            handleDeleteGroup(
                                                                group
                                                            );
                                                        }}
                                                        id={"delete-123"}
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
};

export default TableGroupsPresenter;
