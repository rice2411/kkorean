import { Box, Paragraph } from "@/components/Atoms";
import { PAGINATION_CONSTANTS } from "@/constants";
import { useId } from "react";

const inactiveClass = `flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`;
const activeClass = `flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700`;

function Pagination({ page, setPage, length }) {
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
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Box>
                {Array(
                    Math.ceil(length / PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE)
                )
                    .fill(null)
                    .map((_, index) => (
                        <Box
                            key={useId()}
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
                        if (page === length - 1) return;
                        setPage(page + 1);
                    }}
                    className="cursor-pointer flex items-center justify-center py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                >
                    <Paragraph className="sr-only">Next</Paragraph>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Box>
            </Box>
        </Box>
    );
}

export default Pagination;
