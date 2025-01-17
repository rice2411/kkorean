import { FilesAPI } from "@/apis";
import { Box, Heading, HorizontalRule, Image } from "@/components/Atoms";
import { Modal } from "@/components/Organisms";
import { EXAM_CONSTANTS } from "@/constants";
import { useLoading } from "@/hooks";
import { useModal } from "@/hooks";
import { IContext, IExam, IFile } from "@/interface";
import { FileItem } from "@/interface/File";
import { ToastUtils } from "@/utils";
import { useEffect, useState } from "react";

interface ExamPreviewerModalProps {
  exam: IExam.BaseExam | null;
}

const ExamPreviewerModal: React.FC<ExamPreviewerModalProps> = ({ exam }) => {
  const { modalBlank } =
    useModal() as unknown as IContext.IModalContext.UseModalReturnType;
  const { showLoading, hideLoading, loading } =
    useLoading() as unknown as IContext.ILoadingContext.UseLoadingReturnType;

  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [images, setImages] = useState<Array<FileItem>>([]);
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
            .sort((a: IFile.FileItem, b: IFile.FileItem) => {
              const nameA = a.public_id.toUpperCase();
              const nameB = b.public_id.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              return 0;
            })
            .filter(
              (item: IFile.FileItem) =>
                !item.public_id.includes(EXAM_CONSTANTS.AUDIO_KEY)
            )
        );
      }
    } catch (err) {
      ToastUtils.error("Đã có lỗi xảy ra vui lòng thử lại");
      console.error(err);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (modalBlank.isOpen && exam) {
      const rawData: Array<[string, string]> = JSON.parse(exam.questions || "");
      const resultQuestions: string[] = [];
      const resultAnswers: string[] = [];
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
        <Modal.BlankModal className="max-w-screen-2xl" classContent="h-[800px]">
          <>
            {exam?.type === EXAM_CONSTANTS.EExamType.LISTENING && (
              <>
                <Heading level={3} className="font-bold my-3">
                  File nghe
                </Heading>
                <HorizontalRule />
                <audio className="my-4" controls>
                  <source src={audio} type="audio/mpeg" />
                </audio>
              </>
            )}
            <Heading level={3} className="font-bold my-3">
              Câu hỏi
            </Heading>
            <HorizontalRule />
            {questions.map((question, index) => (
              <Box className="flex flex-col my-5" key={index}>
                <Heading level={1}>{question}</Heading>
                {images
                  .filter((item) =>
                    item.public_id.startsWith(`${exam?.id}_${index + 1}.`)
                  )
                  .sort((a, b) => {
                    const numA = parseFloat(a.public_id.split('.')[1]);
                    const numB = parseFloat(b.public_id.split('.')[1]);
                    return numA - numB;
                  })
                  .map((item, subIndex) => (
                    <Box key={item.url} className="flex flex-col">
                      <Image src={item.url} className="h-auto w-22 m-5" />
                      <Heading level={3} className="font-bold">
                        Đáp án: {answers[index]?.[subIndex] || ""}
                      </Heading>
                    </Box>
                  ))}
              </Box>
            ))}
          </>
        </Modal.BlankModal>
      )}
    </>
  );
};

export default ExamPreviewerModal;
