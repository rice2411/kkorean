import { Box, Heading, Image, Paragraph } from "@/components/Atoms";
import { Badge } from "@/components/Molecules";
import { EExamPlan } from "@/constants/exam";
import { FileHelpers } from "@/helpers";
import { useAuth } from "@/hooks";
import { IContext, IExam } from "@/interface";
import { ExamUtils } from "@/utils";

interface Props {
    exam: IExam.BaseExam;
    onClick: (data: IExam.BaseExam) => void;
}

const ExamCard: React.FC<Props> = ({ exam, onClick }) => {
    const { user } =
        useAuth() as unknown as IContext.IAuthContenxt.UseAuthReturnType;
    return (
        <Box
            onClick={() => {
                onClick(exam);
            }}
            className="grid grid-cols-12 gap-4 p-3 border-b border-stone-300 hover:bg-gray-100 cursor-pointer"
        >
            <Box className="col-span-1 flex items-center justify-center">
                {JSON.stringify(user?.completedExams)?.includes(exam.id) && (
                    <Image
                        className="h-9 w-9 "
                        src={FileHelpers.getLocalFile("complete-green", "svg")}
                    />
                )}
                {exam.plan === EExamPlan.PAID && !user ? (
                    <Box className="h-9 w-9 bg-primary-600 rounded-full flex items-center justify-center">
                        <Image
                            className="h-5 w-5"
                            src={FileHelpers.getLocalFile("lock", "svg")}
                        />
                    </Box>
                ) : JSON.stringify(user?.completedExams)?.includes(exam.id) ? (
                    <Image
                        className="h-9 w-9 "
                        src={FileHelpers.getLocalFile("complete-green", "svg")}
                    />
                ) : (
                    <Box className="h-9 w-9 rounded-full bg-gray-200"></Box>
                )}
            </Box>
            <Box className="col-span-10 ">
                <Heading level={6}>{exam.name}</Heading>
                <Paragraph className="text-xs text-gray-500">
                    {exam.description}
                </Paragraph>
                <Box className="flex mt-2">
                    <Box className="flex items-center justify-center">
                        <Image
                            className="h-3 w-3 mr-2"
                            src={FileHelpers.getLocalFile("fire", "svg")}
                        />
                        <Paragraph
                            className={`text-xs text-${ExamUtils.getLevelColor(
                                exam.level as number
                            )}-500`}
                        >
                            {ExamUtils.getExamLevel(exam.level as number)}
                        </Paragraph>
                    </Box>
                    <Box className="flex items-center justify-center ml-4">
                        <Badge
                            text={
                                ExamUtils.getExamType(
                                    exam.type as number
                                ) as string
                            }
                            color={ExamUtils.getTypeColor(exam.type as number)}
                        />
                    </Box>
                    <Box className="flex items-center justify-center ml-4">
                        <Image
                            className="h-3 w-3 mr-2 text-gray-300"
                            src={FileHelpers.getLocalFile("complete", "svg")}
                        />
                        <Paragraph className="text-xs text-gray-500">
                            {exam.completedTime} đã hoàn thành
                        </Paragraph>
                    </Box>
                </Box>
            </Box>
            <Box className="col-span-1 flex items-center justify-center">
                <Image
                    className="h-5 w-5 "
                    src={FileHelpers.getLocalFile("arrow-right", "svg")}
                />
            </Box>
        </Box>
    );
};

export default ExamCard;
