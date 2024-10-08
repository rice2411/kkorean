import { Box, Heading, Input, Label, Paragraph } from "@/components/Atoms";
import { Empty } from "@/components/Molecules";
import Pagination from "@/components/Molecules/Pagination";
import { DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { TEST_LEVEL, TEST_TYPE } from "@/constants/tests";
import { TestHelpers } from "@/helpers";
import { useId, useRef, useState } from "react";

function TableTests({ tests }) {
    const fileInputRef = useRef();
    const [page, setPage] = useState(1);

    const handleOpenUpload = () => {
        fileInputRef.current.click(); //
    };

    return (
        <>
            <input
                className="hidden"
                type="file"
                ref={fileInputRef}
                accept=".xlsx, .xls"
                // onChange={handleFileChange}
            />
            <Box className="bg-white relative  overflow-hidden mt-4">
                <Box className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t ">
                    <Box className="w-full md:w-1/2">
                        <Box className="flex items-center">
                            <Label htmlFor="simple-search" className="sr-only">
                                Search
                            </Label>
                            <Box className="relative w-full">
                                <Box className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></Box>
                                <Input
                                    type="text"
                                    id="simple-search"
                                    placeholder="Search for products"
                                    required=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2  "
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <Box
                            onClick={handleOpenUpload}
                            type="Box"
                            id="createProductBox"
                            data-modal-toggle="createProductModal"
                            className="flex items-center justify-center cursor-pointer text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none "
                        >
                            <svg
                                className="h-3.5 w-3.5 mr-1.5 -ml-1"
                                classname="h-3.5 w-3.5 mr-1.5 -ml-1"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#ffffff"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <g id="SVGRepo_iconCarrier">
                                    {"{"}" "{"}"}
                                    <title />
                                    {"{"}" "{"}"}
                                    <g id="Complete">
                                        {"{"}" "{"}"}
                                        <g id="upload">
                                            {"{"}" "{"}"}
                                            <g>
                                                {"{"}" "{"}"}
                                                <path
                                                    d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7"
                                                    fill="none"
                                                    stroke="#ffffff"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                />
                                                {"{"}" "{"}"}
                                                <g>
                                                    {"{"}" "{"}"}
                                                    <polyline
                                                        data-name="Right"
                                                        fill="none"
                                                        id="Right-2"
                                                        points="7.9 6.7 12 2.7 16.1 6.7"
                                                        stroke="#ffffff"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                    />
                                                    {"{"}" "{"}"}
                                                    <line
                                                        fill="none"
                                                        stroke="#ffffff"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        x1={12}
                                                        x2={12}
                                                        y1="16.3"
                                                        y2="4.8"
                                                    />
                                                    {"{"}" "{"}"}
                                                </g>
                                                {"{"}" "{"}"}
                                            </g>
                                            {"{"}" "{"}"}
                                        </g>
                                        {"{"}" "{"}"}
                                    </g>
                                    {"{"}" "{"}"}
                                </g>
                            </svg>
                            Tải lên bộ đề
                        </Box>
                    </Box>
                </Box>
                <Box className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                            <tr>
                                <th scope="col" className="p-4">
                                    STT
                                </th>
                                <th scope="col" className="p-4">
                                    Tên bộ đề
                                </th>
                                <th scope="col" className="p-4">
                                    Loại đề
                                </th>
                                <th scope="col" className="p-4">
                                    Độ khó
                                </th>
                                <th scope="col" className="p-4">
                                    Rating
                                </th>
                                <th scope="col" className="p-4">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        {tests.length === 0 && (
                            <tbody>
                                <tr>
                                    <td colSpan={6}>
                                        <Empty />
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        {tests && tests.length > 0 && (
                            <tbody>
                                {tests.map((test, index) => (
                                    <tr
                                        key={useId()}
                                        className="border-b  hover:bg-gray-100 "
                                    >
                                        <td className="p-4 w-4">
                                            {DEFAULT_PAGE_SIZE * (page - 1) +
                                                index +
                                                1}
                                        </td>
                                        <th
                                            scope="row"
                                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            <Box className="flex items-center mr-3">
                                                <svg
                                                    className="h-8 w-auto mr-3"
                                                    viewBox="0 0 64 64"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#ffffff"
                                                >
                                                    <g
                                                        id="SVGRepo_bgCarrier"
                                                        strokeWidth={0}
                                                    />
                                                    <g
                                                        id="SVGRepo_tracerCarrier"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <g id="SVGRepo_iconCarrier">
                                                        {" "}
                                                        <g
                                                            data-name="19_Test"
                                                            id="_19_Test"
                                                        >
                                                            {" "}
                                                            <path
                                                                d="M53,62H7a1,1,0,0,1-1-1V3A1,1,0,0,1,7,2H53a1,1,0,0,1,1,1V61A1,1,0,0,1,53,62Z"
                                                                style={{
                                                                    fill: "#fdfeff",
                                                                }}
                                                            />{" "}
                                                            <path
                                                                d="M17,35H11a1,1,0,0,1-1-1V28a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,17,35Z"
                                                                style={{
                                                                    fill: "#febc00",
                                                                }}
                                                            />{" "}
                                                            <path
                                                                d="M13,33a1,1,0,0,1-1-1V27H11a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V33Z"
                                                                style={{
                                                                    fill: "#edaa03",
                                                                }}
                                                            />{" "}
                                                            <path
                                                                d="M17,45H11a1,1,0,0,1-1-1V38a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,17,45Z"
                                                                style={{
                                                                    fill: "#febc00",
                                                                }}
                                                            />{" "}
                                                            <path
                                                                d="M17,55H11a1,1,0,0,1-1-1V48a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,17,55Z"
                                                                style={{
                                                                    fill: "#febc00",
                                                                }}
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={15}
                                                                x={21}
                                                                y={30}
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={10}
                                                                x={21}
                                                                y={40}
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={14}
                                                                x={21}
                                                                y={50}
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#f74e0c",
                                                                }}
                                                                transform="translate(-15.32 20.015) rotate(-45)"
                                                                width="9.899"
                                                                x="11.55"
                                                                y="27.5"
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#f74e0c",
                                                                }}
                                                                transform="translate(-22.391 22.944) rotate(-45)"
                                                                width="9.899"
                                                                x="11.55"
                                                                y="37.5"
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#f74e0c",
                                                                }}
                                                                transform="translate(-29.462 25.873) rotate(-45)"
                                                                width="9.899"
                                                                x="11.55"
                                                                y="47.5"
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={6}
                                                                x={14}
                                                                y={11}
                                                            />{" "}
                                                            <rect
                                                                height={7}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={2}
                                                                x={16}
                                                                y={12}
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={6}
                                                                x={36}
                                                                y={11}
                                                            />{" "}
                                                            <rect
                                                                height={7}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={2}
                                                                x={38}
                                                                y={12}
                                                            />{" "}
                                                            <rect
                                                                height={6}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={2}
                                                                x={22}
                                                                y={12}
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={5}
                                                                x={22}
                                                                y={11}
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={5}
                                                                x={22}
                                                                y={17}
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={5}
                                                                x={22}
                                                                y={14}
                                                            />{" "}
                                                            <path
                                                                d="M33,19H29V17h3V16H30a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1h4v2H31v1h2a1,1,0,0,1,1,1v3A1,1,0,0,1,33,19Z"
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={2}
                                                                x={37}
                                                                y={50}
                                                            />{" "}
                                                            <rect
                                                                height={2}
                                                                style={{
                                                                    fill: "#0455bf",
                                                                }}
                                                                width={2}
                                                                x={41}
                                                                y={50}
                                                            />{" "}
                                                            <path
                                                                d="M13,43a1,1,0,0,1-1-1V37H11a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V43Z"
                                                                style={{
                                                                    fill: "#edaa03",
                                                                }}
                                                            />{" "}
                                                            <path
                                                                d="M13,53a1,1,0,0,1-1-1V47H11a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V53Z"
                                                                style={{
                                                                    fill: "#edaa03",
                                                                }}
                                                            />{" "}
                                                            <polygon
                                                                points="52.981 21.192 50.839 23.335 34.414 39.759 32.986 44.044 32 46.459 34.414 45.472 38.699 44.044 54 28.743 54 20.174 52.981 21.192"
                                                                style={{
                                                                    fill: "#dfeaef",
                                                                }}
                                                            />{" "}
                                                            <rect
                                                                height="6.059"
                                                                style={{
                                                                    fill: "#f74e0c",
                                                                }}
                                                                transform="translate(-8.472 40.927) rotate(-45)"
                                                                width="23.228"
                                                                x="33.553"
                                                                y="27.66"
                                                            />{" "}
                                                            <rect
                                                                height="2.02"
                                                                style={{
                                                                    fill: "#febc00",
                                                                }}
                                                                transform="translate(-8.472 40.927) rotate(-45)"
                                                                width="23.228"
                                                                x="33.553"
                                                                y="29.68"
                                                            />{" "}
                                                            <rect
                                                                height="6.059"
                                                                style={{
                                                                    fill: "#fdfeff",
                                                                }}
                                                                transform="translate(0.812 44.772) rotate(-45)"
                                                                width="3.03"
                                                                x="52.936"
                                                                y="18.376"
                                                            />{" "}
                                                            <rect
                                                                height="2.02"
                                                                style={{
                                                                    fill: "#dfeaef",
                                                                }}
                                                                transform="translate(1.403 43.344) rotate(-45)"
                                                                width="3.03"
                                                                x="51.508"
                                                                y="18.968"
                                                            />{" "}
                                                            <path
                                                                d="M57.664,22.477l-4.285-4.285,2.143-2.142a2.019,2.019,0,0,1,2.856,0l1.428,1.428a2.02,2.02,0,0,1,0,2.857Z"
                                                                style={{
                                                                    fill: "#f74e0c",
                                                                }}
                                                            />{" "}
                                                            <path
                                                                d="M59.806,17.478,58.378,16.05a2.019,2.019,0,0,0-2.856,0l-2.143,2.142,1.429,1.429,2.142-2.143A2.021,2.021,0,0,1,59.806,17.478Z"
                                                                style={{
                                                                    fill: "#cc2600",
                                                                }}
                                                            />{" "}
                                                            <polygon
                                                                points="34.813 42.472 33.384 41.044 34.813 36.759 39.097 41.044 34.813 42.472"
                                                                style={{
                                                                    fill: "#f7d694",
                                                                }}
                                                            />{" "}
                                                            <polygon
                                                                points="33.384 41.044 32.398 43.459 34.813 42.472 33.384 41.044"
                                                                style={{
                                                                    fill: "#f74e0c",
                                                                }}
                                                            />{" "}
                                                        </g>{" "}
                                                    </g>
                                                </svg>
                                                {test.name}
                                            </Box>
                                        </th>
                                        <td className="px-4 py-3">
                                            <Paragraph
                                                className={`${
                                                    test.type ===
                                                    TEST_TYPE.LISTENING
                                                        ? " bg-primary-100 text-primary-800"
                                                        : "bg-green-100 text-green-800"
                                                } text-xs font-medium px-2 py-0.5 rounded w-max`}
                                            >
                                                {TestHelpers.getTestType(
                                                    test.type
                                                )}
                                            </Paragraph>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
                                            <Box className="flex items-center">
                                                <Box
                                                    className={`${
                                                        test.level ===
                                                        TEST_LEVEL.EASY
                                                            ? "bg-green-500"
                                                            : test.level ===
                                                              TEST_LEVEL.MEDIUM
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                                    } h-4 w-4 rounded-full inline-block mr-2 `}
                                                />
                                                {TestHelpers.getTestLevel(
                                                    test.level
                                                )}
                                            </Box>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
                                            <Box className="flex items-center">
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5 text-yellow-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5 text-yellow-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5 text-yellow-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5 text-yellow-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5 text-yellow-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <Paragraph className="text-gray-500  ml-1">
                                                    5.0
                                                </Paragraph>
                                            </Box>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
                                            <Box className="flex items-center space-x-4">
                                                <Box
                                                    type="Box"
                                                    data-drawer-target="drawer-update-product"
                                                    data-drawer-show="drawer-update-product"
                                                    aria-controls="drawer-update-product"
                                                    className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mr-2 -ml-0.5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Edit
                                                </Box>
                                                <Box
                                                    type="Box"
                                                    data-drawer-target="drawer-read-product-advanced"
                                                    data-drawer-show="drawer-read-product-advanced"
                                                    aria-controls="drawer-read-product-advanced"
                                                    className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="w-4 h-4 mr-2 -ml-0.5"
                                                    >
                                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                                        />
                                                    </svg>
                                                    Preview
                                                </Box>
                                                <Box
                                                    type="Box"
                                                    data-modal-target="delete-modal"
                                                    data-modal-toggle="delete-modal"
                                                    className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center "
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
                                                    Delete
                                                </Box>
                                            </Box>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </Box>
                <Pagination />
            </Box>
        </>
    );
}

export default TableTests;
