import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FilesAPI } from "@/apis";
import { Box, Button, Heading, Image, Paragraph } from "@/components/Atoms";
import { Badge, ProgressBar } from "@/components/Molecules";
import { EXAM_CONSTANTS } from "@/constants";
import { useCountdown, useDisableScroll, useLoading } from "@/hooks";
import { IContext, IExam, IFile } from "@/interface";
import { FileItem } from "@/interface/File";
import { ExamUtils, ToastUtils } from "@/utils";

function ExamDoingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { showLoading, hideLoading } =
        useLoading() as IContext.ILoadingContext.UseLoadingReturnType;
    const exam = location.state as IExam.BaseExam;

    const { time, startCountdown } = useCountdown(3600);

    const [questions, setQuestions] = useState<string[]>([]);
    //@ts-ignore
    const [answers, setAnswers] = useState<string[]>([]);
    const [images, setImages] = useState<Array<FileItem>>([]);
    //@ts-ignore
    const [audio, setAudio] = useState<string>("");

    const fetchImages = async () => {
        if (!exam) return;

        showLoading();
        try {
            const response = (await FilesAPI.searchAssetsByPublicIdPrefix(
                exam.id
            )) as IFile.FileResponse;
            if (response.resources) {
                const { resources } = response;
                const audioFile = resources.find((item: IFile.FileItem) =>
                    item.public_id.includes(EXAM_CONSTANTS.AUDIO_KEY)
                ) as IFile.FileItem | undefined;

                if (audioFile) setAudio(audioFile.url || "");

                setImages(
                    resources
                        .filter(
                            (item: IFile.FileItem) =>
                                !item.public_id.includes(
                                    EXAM_CONSTANTS.AUDIO_KEY
                                )
                        )
                        .reverse()
                );
            }
        } catch (err) {
            ToastUtils.error("Đã có lỗi xảy ra vui lòng thử lại");
            console.error(err);
        } finally {
            startCountdown();
            hideLoading();
        }
    };

    useEffect(() => {
        const rawData: Array<[string, string]> = JSON.parse(
            exam.questions || ""
        );
        const resultQuestions: string[] = [];
        const resultAnswers: string[] = [];
        rawData.forEach((item) => {
            resultQuestions.push(item[0]);
            resultAnswers.push(item[1]);
        });
        setQuestions(resultQuestions);
        setAnswers(resultAnswers);
        fetchImages();
    }, []);

    useDisableScroll(true);

    return (
        <section className="flex flex-col h-screen py-8 px-4 max-w-screen">
            <Heading>
                Chế độ làm bài - {exam.name} - {time}{" "}
            </Heading>
            <Paragraph className="text-xs text-gray-500 mt-2">
                {exam.description} - Thời gian 60 phút
            </Paragraph>
            <Box className="flex mt-2 gap-2 mb-4">
                <Badge
                    text={ExamUtils.getExamType(exam.type) as string}
                    color={ExamUtils.getTypeColor(exam.type)}
                />
                <Badge
                    text={ExamUtils.getExamLevel(exam.level) as string}
                    color={ExamUtils.getLevelColor(exam.level)}
                />
                <Badge
                    text={ExamUtils.getExamPlan(exam.plan) as string}
                    color={ExamUtils.getPlanColor(exam.plan)}
                />
            </Box>
            <ProgressBar
                percentage={100}
                color="bg-gradient-to-l from-yellow-300 via-orange-400 to-red-500"
            />
            <Box className="grid grid-cols-12 gap-5 mt-4 flex-1 overflow-hidden">
                {/* Sidebar with questions */}
                <Box className="col-span-2 rounded-md p-2 text-center border border-primary-200 h-min">
                    <Heading level={5}> Câu hỏi:</Heading>
                    <Box className="gap-2 flex items-center justify-center flex-wrap">
                        {images.map((item, index) => (
                            <Box
                                key={item.public_id}
                                onClick={() => {
                                    const element = document.getElementById(
                                        item.public_id
                                    );
                                    if (element) {
                                        element.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        });
                                    }
                                }}
                                className="h-10 w-10 text-sm flex items-center justify-center border border-primary-400 cursor-pointer"
                            >
                                {index + 1}
                            </Box>
                        ))}
                    </Box>
                    <Box className="mt-4 flex items-center justify-center">
                        <Button className="mr-2" hover={true}>
                            Nộp bài
                        </Button>
                        <Button
                            onClick={() => {
                                navigate("/exam");
                            }}
                            variant="secondary-outline"
                        >
                            Quay lại
                        </Button>
                    </Box>
                </Box>

                {/* Questions display area with independent scroll */}
                <Box className="col-span-10 max-h-full overflow-y-auto pr-4">
                    {questions.map((question, index) => (
                        <Box className="flex flex-col my-5" key={index}>
                            <Heading level={3}>{question}</Heading>
                            {images
                                .filter((item) =>
                                    item.public_id.startsWith(
                                        `${exam?.id}_${index + 1}.`
                                    )
                                )
                                .map((item) => (
                                    <Box
                                        id={item.public_id}
                                        key={item.url}
                                        className="flex flex-col"
                                    >
                                        <Image src={item.url} />
                                    </Box>
                                ))}
                        </Box>
                    ))}
                </Box>
            </Box>
        </section>
    );
}

export default ExamDoingPage;
