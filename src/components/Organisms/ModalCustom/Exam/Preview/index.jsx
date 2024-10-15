import { FilesAPI } from "@/apis/";
import {
    Box,
    Heading,
    HorizontalRule,
    Image,
    Paragraph,
} from "@/components/Atoms";
import { Modal } from "@/components/Organisms";
import { EXAM_CONSTANTS } from "@/constants";
import { useLoading } from "@/hooks";
import { useModal } from "@/hooks";
import { ToastUtils } from "@/utils";
import { useEffect, useState } from "react";

function ExamPreviewerModal({ exam }) {
    const { modalBlank } = useModal();
    const { showLoading, hideLoading, loading } = useLoading();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [images, setImages] = useState([]);
    const [audio, setAudio] = useState("");

    const fetchImages = async () => {
        showLoading();
        try {
            const response = await FilesAPI.searchAssetsByPublicIdPrefix(
                exam.id
            );
            if (response.resources) {
                const { resources } = response;
                const audioFile = resources.find((item) =>
                    item.public_id.includes(EXAM_CONSTANTS.AUDIO_KEY)
                );
                setAudio(audioFile.url);
                setImages(
                    response.resources.filter(
                        (item) =>
                            !item.public_id.includes(EXAM_CONSTANTS.AUDIO_KEY)
                    )
                );
            }
        } catch (err) {
            ToastUtils.error("Đã có lỗi xảy ra vui lòng thử lại");
            console.log(err);
        } finally {
            hideLoading();
        }
    };
    useEffect(() => {
        if (modalBlank.isOpen) {
            const rawData = JSON.parse(exam.questions);
            const resultQuestions = [];
            const resultAnswers = [];
            rawData.forEach((item) => {
                resultQuestions.push(item[0]);
                resultAnswers.push(item[1]);
            });
            setQuestions(resultQuestions);
            setAnswers(resultAnswers);
            fetchImages();
        }
    }, [modalBlank.isOpen]);

    return (
        <>
            {!loading && questions.length > 0 && (
                <Modal.BlankModal
                    className="max-w-screen-2xl"
                    classContent="h-[800px]"
                >
                    <Heading level={3} className="font-bold my-3">
                        File nghe
                    </Heading>
                    <HorizontalRule />
                    <audio class="my-4" controls>
                        <source src={audio} type="audio/mpeg" />
                    </audio>
                    <Heading level={3} className="font-bold my-3">
                        Câu hỏi
                    </Heading>
                    <HorizontalRule />
                    {questions.map((question, index) => (
                        <Box className="flex flex-col my-5" key={index}>
                            <Heading level={1}>{question}</Heading>

                            {images
                                .filter((item) =>
                                    item.public_id.startsWith(
                                        `${exam.id}_${index + 1}.`
                                    )
                                )
                                .map((item, subIndex) => (
                                    <>
                                        <Image
                                            key={item.url}
                                            src={item.url}
                                            className="h-auto w-22 m-5"
                                        />
                                        <Heading
                                            level={3}
                                            className="font-bold"
                                        >
                                            Đáp án:{" "}
                                            {answers[index].split("")[subIndex]}
                                        </Heading>
                                    </>
                                ))}
                        </Box>
                    ))}
                </Modal.BlankModal>
            )}
        </>
    );
}

export default ExamPreviewerModal;
