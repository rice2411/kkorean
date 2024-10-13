import { Box, Heading, Image } from "@/components/Atoms";
import { Modal } from "@/components/Organisms";
import { useLoading } from "@/hooks";
import useModal from "@/hooks/useModal";
import { CloudinaryService } from "@/services";
import { useEffect, useState } from "react";
import { useRevalidator } from "react-router-dom";

function ExamPreviewerModal({ exam }) {
  const { loading } = useModal();
  const { showLoading, hideLoading } = useLoading();

  const [questions, setQuestions] = useState([]);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    showLoading();
    try {
      const response = await CloudinaryService.searchImageByPublicIdPrefix(
        exam.id
      );
      if (response.data) {
        setImages(response.data);
      }
    } catch (err) {
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
  }, exam);

  return (
    <>
      {!loading && questions.length > 0 && (
        <Modal.BlankModal>
          {questions.map((question, index) => (
            <Box className="flex flex-col" key={question.id}>
              <Heading>{question}</Heading>
              {images
                .filter((item) =>
                  item.public_id.startsWith(`${exam.id}_${index + 1}.`)
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
