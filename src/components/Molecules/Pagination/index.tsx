import React from "react";
import { Box, Paragraph, Svg } from "@/components/Atoms";
import { PAGINATION_CONSTANTS } from "@/constants";
import { FileHelpers } from "@/helpers";

interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    length: number;
}

const inactiveClass = `flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`;
const activeClass = `flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700`;

const Pagination: React.FC<PaginationProps> = ({ page, setPage, length }) => {
    if (!length) return null;

    return (
        <Box
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
        >
            <Box className="text-sm font-normal text-gray-500 flex">
                Showing
                <Paragraph className="font-semibold text-gray-900 mx-1">
                    {Math.min(
                        (page - 1) * PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE + 1,
                        length
                    )}{" "}
                    -{" "}
                    {Math.min(
                        page * PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE,
                        length
                    )}
                </Paragraph>
                of
                <Paragraph className="font-semibold text-gray-900 ml-1">
                    {length}
                </Paragraph>
            </Box>
            <Box className="inline-flex items-stretch -space-x-px cursor-pointer ">
                <Box
                    onClick={() => {
                        if (page === 1) return;
                        setPage(page - 1);
                    }}
                    className="flex items-center justify-center py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                >
                    <Paragraph className="sr-only">Previous</Paragraph>
                    <Svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        src={FileHelpers.getLocalFile(
                            "pagination-left-arrow",
                            "path"
                        )}
                    />
                </Box>
                {Array(
                    Math.ceil(length / PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE)
                )
                    .fill(null)
                    .map((_, index) => (
                        <Box
                            key={index}
                            className={
                                page === index + 1 ? activeClass : inactiveClass
                            }
                            onClick={() => {
                                setPage(index + 1);
                            }}
                        >
                            {index + 1}
                        </Box>
                    ))}

                <Box
                    onClick={() => {
                        if (
                            page ===
                            Math.ceil(
                                length / PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE
                            )
                        )
                            return;
                        setPage(page + 1);
                    }}
                    className="cursor-pointer flex items-center justify-center py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                >
                    <Paragraph className="sr-only">Next</Paragraph>
                    <Svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        src={FileHelpers.getLocalFile(
                            "pagination-right-arrow",
                            "path"
                        )}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Pagination;
