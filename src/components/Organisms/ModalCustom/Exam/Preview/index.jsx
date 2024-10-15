import { FilesAPI } from "@/apis/";
import { Box, Heading, Image } from "@/components/Atoms";
import { Modal } from "@/components/Organisms";
import { useLoading } from "@/hooks";
import { useModal } from "@/hooks";
import { ToastUtils } from "@/utils";
import { useEffect, useState } from "react";

function ExamPreviewerModal({ exam }) {
    const { loading } = useModal();
    const { showLoading, hideLoading } = useLoading();

    const [questions, setQuestions] = useState([]);
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        showLoading();
        try {
            const response = await FilesAPI.searchImageByPublicIdPrefix(
                exam.id
            );
            if (response.resources) {
                setImages(response.resources);
            }
        } catch (err) {
            ToastUtils.error("Đã có lỗi xảy ra vui lòng thử lại");
            console.log(err);
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        if (exam) {
            const rawData = JSON.parse(exam.question);
            const result = [];
            rawData.forEach((item) => {
                result.push(item[0]);
            });
            setQuestions(result);
            fetchImages();
        }
    }, [exam]);

    return (
        <>
            {!loading && questions.length > 0 && (
                <Modal.BlankModal>
                    {questions.map((question, index) => (
                        <Box className="flex flex-col" key={index}>
                            <Heading>{question}</Heading>
                            {images
                                .filter((item) =>
                                    item.public_id.startsWith(
                                        `${exam.id}_${index + 1}.`
                                    )
                                )
                                .map((item) => (
                                    <Image key={item.url} src={item.url} />
                                ))}
                        </Box>
                    ))}
                </Modal.BlankModal>
            )}
        </>
    );
}

export default ExamPreviewerModal;
