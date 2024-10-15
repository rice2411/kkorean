import { Box, Image, Input, Paragraph, Svg } from "@/components/Atoms";
import { Empty } from "@/components/Molecules";
import Pagination from "@/components/Molecules/Pagination";
import { FILE_CONSTANTS, PAGINATION_CONSTANTS } from "@/constants";
import { EXAM_CONSTANTS } from "@/constants";
import { ExamUtils } from "@/utils";
import { ModalCustom } from "@/components/Organisms/";
import { useState } from "react";
import { FileHelpers } from "@/helpers";

function TableExamsPresenter({
    exams,
    exam,
    uploadRef,
    handleFileChange,
    handleOpenWindowExplorer,
    handleOpenModalExamPrevier,
    handleDeleteExam,
}) {
    const [page, setPage] = useState(1);
    const [searchContent, setSearchContent] = useState("");
    return (
        <>
            <Input
                ref={uploadRef}
                className="hidden"
                type="file"
                onChange={handleFileChange}
            />

            <Box className="bg-white relative  overflow-hidden mt-4">
                <Box className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t ">
                    <Box className="w-full md:w-1/2">
                        <Box className="flex items-center">
                            <Box className="relative w-full">
                                <Box className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></Box>
                                <Input
                                    type="text"
                                    placeholder="Tìm kiếm đề"
                                    onChange={(e) => {
                                        setSearchContent(
                                            e.target.value.toLowerCase()
                                        );
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2  "
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <Box
                            onClick={() => {
                                handleOpenWindowExplorer(
                                    exam,
                                    FILE_CONSTANTS.UPLOAD_TYPE.EXCEL
                                );
                            }}
                            type="Box"
                            id="createProductBox"
                            data-modal-toggle="createProductModal"
                            className="flex items-center justify-center cursor-pointer text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none "
                        >
                            <Svg
                                className="h-3.5 w-3.5 mr-1.5 -ml-1"
                                viewBox="0 0 24 24"
                                fill="#ffffff"
                                src={FileHelpers.getLocalFile("upload", "path")}
                            ></Svg>
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
                                    Hình thức
                                </th>
                                <th scope="col" className="p-4">
                                    Tình trạng
                                </th>
                                <th scope="col" className="p-4">
                                    Độ khó
                                </th>
                                <th scope="col" className="p-4">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        {exams.length === 0 && (
                            <tbody>
                                <tr>
                                    <td colSpan={6}>
                                        <Empty />
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        {exams && exams.length > 0 && (
                            <tbody>
                                {exams
                                    .slice(
                                        !searchContent
                                            ? PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE *
                                                  (page - 1)
                                            : 0,
                                        !searchContent
                                            ? PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE *
                                                  page
                                            : exams.length
                                    )
                                    .filter((exam) =>
                                        exam.name
                                            .toLowerCase()
                                            .includes(searchContent)
                                    )
                                    .map((exam, index) => (
                                        <tr
                                            key={exam.id}
                                            className="border-b  hover:bg-gray-100 "
                                        >
                                            <td className="p-4 w-4">
                                                {PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE *
                                                    (page - 1) +
                                                    index +
                                                    1}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
                                                <Box className="flex items-center mr-3">
                                                    <Image
                                                        className="h-8 w-auto mr-3"
                                                        src={FileHelpers.getLocalFile(
                                                            "exam",
                                                            "svg"
                                                        )}
                                                    />
                                                    {exam.name}
                                                </Box>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Paragraph
                                                    className={`${
                                                        exam.type ===
                                                        EXAM_CONSTANTS.EXAM_TYPE
                                                            .LISTENING
                                                            ? " bg-red-100 text-red-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                    } text-xs font-medium px-2 py-0.5 rounded w-max`}
                                                >
                                                    {ExamUtils.getExamType(
                                                        exam.type
                                                    )}
                                                </Paragraph>
                                            </td>

                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
                                                <Paragraph
                                                    className={`${
                                                        exam.plan ===
                                                        EXAM_CONSTANTS.EXAM_PLAN
                                                            .FREE
                                                            ? " bg-green-100 text-green-800"
                                                            : "bg-primary-100 text-primary-800"
                                                    } text-xs font-medium px-2 py-0.5 rounded w-max`}
                                                >
                                                    {ExamUtils.getExamPlan(
                                                        exam.plan
                                                    )}
                                                </Paragraph>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Paragraph
                                                    className={`${
                                                        !exam.isImageUploaded
                                                            ? " bg-purple-100 text-purple-800"
                                                            : "bg-cyan-100 text-cyan-800"
                                                    } text-xs font-medium px-2 py-0.5 rounded w-max`}
                                                >
                                                    {exam.isImageUploaded
                                                        ? "Đã cập nhật hình ảnh"
                                                        : "Chưa cập nhật hình ảnh"}
                                                </Paragraph>
                                                {exam.type ===
                                                    EXAM_CONSTANTS.EXAM_TYPE
                                                        .LISTENING && (
                                                    <Paragraph
                                                        className={`${
                                                            !exam.isAudioUploaded
                                                                ? " bg-purple-100 text-purple-800"
                                                                : "bg-cyan-100 text-cyan-800"
                                                        } text-xs font-medium px-2 py-0.5 rounded w-max mt-2`}
                                                    >
                                                        {exam.isAudioUploaded
                                                            ? "Đã cập nhật file nghe"
                                                            : "Chưa cập nhật file nghe"}
                                                    </Paragraph>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
                                                <Box className="flex items-center">
                                                    <Box
                                                        className={`${
                                                            exam.level ===
                                                            EXAM_CONSTANTS
                                                                .EXAM_LEVEL.EASY
                                                                ? "bg-green-500"
                                                                : exam.level ===
                                                                  EXAM_CONSTANTS
                                                                      .EXAM_LEVEL
                                                                      .MEDIUM
                                                                ? "bg-yellow-500"
                                                                : "bg-red-500"
                                                        } h-4 w-4 rounded-full inline-block mr-2 `}
                                                    />
                                                    {ExamUtils.getExamLevel(
                                                        exam.level
                                                    )}
                                                </Box>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
                                                <Box className="flex items-center space-x-4">
                                                    <Box
                                                        onClick={() => {
                                                            handleOpenWindowExplorer(
                                                                exam,
                                                                FILE_CONSTANTS
                                                                    .UPLOAD_TYPE
                                                                    .IMAGE
                                                            );
                                                        }}
                                                        className="cursor-pointer py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
                                                    >
                                                        <Svg
                                                            className="h-3.5 w-3.5 mr-1.5 -ml-1"
                                                            viewBox="0 0 24 24"
                                                            fill="#ffffff"
                                                            src={FileHelpers.getLocalFile(
                                                                "upload",
                                                                "path"
                                                            )}
                                                        ></Svg>
                                                        Tải ảnh lên
                                                    </Box>
                                                    {exam.type ===
                                                        EXAM_CONSTANTS.EXAM_TYPE
                                                            .LISTENING && (
                                                        <Box
                                                            type="button"
                                                            onClick={() => {
                                                                handleOpenWindowExplorer(
                                                                    exam,
                                                                    FILE_CONSTANTS
                                                                        .UPLOAD_TYPE
                                                                        .AUDIO
                                                                );
                                                            }}
                                                            className="cursor-pointer py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 "
                                                        >
                                                            <Svg
                                                                className="h-3.5 w-3.5 mr-1.5 -ml-1"
                                                                viewBox="0 0 24 24"
                                                                fill="#ffffff"
                                                                src={FileHelpers.getLocalFile(
                                                                    "upload",
                                                                    "path"
                                                                )}
                                                            ></Svg>
                                                            Tải file nghe
                                                        </Box>
                                                    )}
                                                    <Box
                                                        onClick={() => {
                                                            handleOpenModalExamPrevier(
                                                                exam
                                                            );
                                                        }}
                                                        className="cursor-pointer py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                                                    >
                                                        <Image
                                                            className="w-4 h-4 mr-2 -ml-0.5"
                                                            src={FileHelpers.getLocalFile(
                                                                "open-eye",
                                                                "svg"
                                                            )}
                                                        />
                                                        Xem trước
                                                    </Box>
                                                    <Box
                                                        type="button"
                                                        onClick={() => {
                                                            handleDeleteExam(
                                                                exam
                                                            );
                                                        }}
                                                        className="flex items-center cursor-pointer text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center "
                                                    >
                                                        <Svg
                                                            className="h-4 w-4 mr-2 -ml-0.5"
                                                            viewBox="0 0 20 20"
                                                            src={FileHelpers.getLocalFile(
                                                                "trash",
                                                                "path"
                                                            )}
                                                        ></Svg>
                                                        Xóa
                                                    </Box>
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
                    length={(exams && exams.length) || 0}
                />
            </Box>
            <ModalCustom.ExamModalCustom.ExamPreviewerModal exam={exam} />
        </>
    );
}

export default TableExamsPresenter;
