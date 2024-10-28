import { Box, Paragraph } from "@/components/Atoms";
import { ProgressBar } from "@/components/Molecules";
import { EExamType } from "@/constants/exam";
import { useAuth } from "@/hooks";
import { IContext, IExam } from "@/interface";
import { useLoaderData } from "react-router-dom";

const ExamProgress = () => {
    const exams = useLoaderData() as unknown as IExam.BaseExam[];
    const { user } =
        useAuth() as unknown as IContext.IAuthContenxt.UseAuthReturnType;
    const calculatePercentage = (type: EExamType) => {
        const count =
            exams.filter(
                (exam) =>
                    JSON.stringify(user?.completedExams)?.includes(exam.id) &&
                    exam.type === type
            ).length || 0;
        return Math.round(
            (count * 100) / exams.filter((exam) => exam.type === type).length
        );
    };
    return (
        <Box className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-20 border border-stone-300 rounded-md p-4 mt-8">
            <Box>
                Đề nghe
                <ProgressBar
                    percentage={calculatePercentage(EExamType.LISTENING)}
                    color="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                />
                0
                <Paragraph className="inline text-xs text-gray-500">
                    /
                    {
                        exams.filter(
                            (exam) => exam.type === EExamType.LISTENING
                        ).length
                    }{" "}
                    đã hoàn thành
                </Paragraph>
            </Box>
            <Box>
                Đề đọc
                <ProgressBar
                    percentage={calculatePercentage(EExamType.READING)}
                    color="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
                />
                0
                <Paragraph className="inline text-xs text-gray-500">
                    /{" "}
                    {
                        exams.filter((exam) => exam.type === EExamType.READING)
                            .length
                    }{" "}
                    đã hoàn thành
                </Paragraph>
            </Box>
            <Box>
                Khác
                <ProgressBar
                    percentage={100}
                    color="bg-gradient-to-r from-cyan-500 to-blue-500"
                />
                0
                <Paragraph className="inline text-xs text-gray-500">
                    /0 đã hoàn thành
                </Paragraph>
            </Box>
        </Box>
    );
};

export default ExamProgress;
