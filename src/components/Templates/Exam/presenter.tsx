import { Box, Button, Heading, Image, Paragraph } from "@/components/Atoms";
import { Badge, FloatButton, ProgressBar } from "@/components/Molecules";
import { EXAM_CONSTANTS } from "@/constants";
import { IExam, IFile, IResult } from "@/interface";
import { DateFNSUtils, ExamUtils } from "@/utils";
import { EExamMode, EExamType } from "@/constants/exam";
import { FileHelpers } from "@/helpers";

interface Props {
  mode: EExamMode;
  exam: IExam.BaseExam;
  result?: IResult.BaseResult;
  loading: boolean;
  questions: string[];
  images: IFile.FileItem[];
  counterAnswer: number;
  correctAnswer: number;
  time: string;
  options: Record<string, string>;
  handleQuitExam: () => void;
  handleSubmit: () => void;
  getColorQuestionList: (item: IFile.FileItem) => void;
  getColorQuestionOption: (publicId: string, answerOption: string) => void;
  setOptions: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const ExamTemplatePresenter: React.FC<Props> = ({
  mode,
  exam,
  result,
  loading,
  questions,
  images,
  counterAnswer,
  correctAnswer,
  time,
  options,
  setOptions,
  handleQuitExam,
  handleSubmit,
  getColorQuestionList,
  getColorQuestionOption,
}) => {
  return (
    <>
      {!loading && (
        <section className="flex flex-col h-max lg:h-screen py-4 px-4 max-w-screen bg-gray-300 overflow-auto">
          <Box className="bg-white p-5 rounded-md">
            <Heading>
              {mode === EExamMode.DOING ? "Chế độ làm bài" : "Xem kết quả"} -{" "}
              {exam.name} -{" "}
              {mode === EExamMode.DOING
                ? time === EXAM_CONSTANTS.TIME_OUT_STRING
                  ? "Hết giờ"
                  : time
                : DateFNSUtils.itTake(
                    result?.time || "",
                    exam.type === EExamType.LISTENING ? 3600 : 4200
                  )}
            </Heading>
            <Box className="flex justify-between items-center">
              <Box>
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
              </Box>
            </Box>
            <ProgressBar
              percentage={Math.round(
                (counterAnswer * 100) / EXAM_CONSTANTS.NUMBER_OF_QUESTION
              )}
              color="bg-gradient-to-l from-yellow-300 via-orange-400 to-red-500"
            />
          </Box>
          <Box className="lg:grid lg:grid-cols-12 gap-4 mt-2 flex-1 lg:overflow-hidden">
            {/* Sidebar with questions */}
            <Box className="lg:col-span-2 text-center bg-white p-5 rounded-md overflow-y-auto scrollbar-hidden">
              <Image
                src={FileHelpers.getLocalFile("logo", "png")}
                className=""
                alt="Kkorean Logo"
              />
              <Heading level={5} className="!font-bold">
                {" "}
                Câu hỏi:
              </Heading>
              <Box className="gap-2 flex items-center justify-center flex-wrap mt-4">
                {images.map((item, index) => (
                  <Box
                    key={item.public_id}
                    onClick={() => {
                      const element = document.getElementById(item.public_id);
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                    className={`${getColorQuestionList(
                      item
                    )} h-8 w-8 text-xs rounded-md flex items-center justify-center border border-primary-400 cursor-pointer`}
                  >
                    {index + 1}
                  </Box>
                ))}
              </Box>
              <Paragraph className="text-center text-xs mt-5">
                {mode === EExamMode.DOING ? "Bạn đã làm " : "Bạn đã làm đúng "}
                {mode === EExamMode.DOING ? counterAnswer : correctAnswer}/{" "}
                {EXAM_CONSTANTS.NUMBER_OF_QUESTION} câu
              </Paragraph>

              {mode === EExamMode.RESULT && (
                <Box className="flex flex-col justify-center items-center mt-10">
                  <Paragraph className="text-sm"> Số điểm của bạn là</Paragraph>
                  <Heading>
                    <Paragraph
                      className={`${
                        correctAnswer * EXAM_CONSTANTS.SCORE < 50
                          ? "text-red-500"
                          : correctAnswer * EXAM_CONSTANTS.SCORE < 70
                          ? "text-primary-400"
                          : "text-green-500"
                      } inline`}
                    >
                      {correctAnswer * EXAM_CONSTANTS.SCORE}
                    </Paragraph>{" "}
                    / {EXAM_CONSTANTS.SCORE * EXAM_CONSTANTS.NUMBER_OF_QUESTION}
                  </Heading>
                </Box>
              )}
              <Box className="flex items-center justify-center h-min mt-4">
                {mode === EExamMode.DOING && (
                  <Button
                    className="mr-2"
                    hover={true}
                    onClick={handleSubmit}
                    disabled={
                      counterAnswer !== EXAM_CONSTANTS.NUMBER_OF_QUESTION &&
                      time !== EXAM_CONSTANTS.TIME_OUT_STRING
                    }
                  >
                    Nộp bài
                  </Button>
                )}
                <Button
                  onClick={handleQuitExam}
                  variant="secondary-outline"
                  hover={true}
                >
                  Quay lại
                </Button>
              </Box>
            </Box>

            {/* Questions display area with independent scroll */}
            <Box className="lg:col-span-10  overflow-y-auto h-full pr-4 bg-white p-5 rounded-md mt-4 lg:mt-0">
              {questions.map((question, index) => (
                <Box className="flex flex-col my-5" key={index}>
                  <Heading level={3}>{question}</Heading>
                  {images
                    .filter((item) =>
                      item.public_id.startsWith(`${exam?.id}_${index + 1}.`)
                    )
                    .map((item, _index) => (
                      <Box
                        id={item.public_id}
                        key={item.url}
                        className="flex flex-col items-center justify-center gap-4"
                      >
                        <Image src={item.url} className="mt-5" />
                        <Box className="flex gap-4">
                          {["A", "B", "C", "D"].map((answerOption) => (
                            <Box
                              key={item.public_id + answerOption}
                              onClick={() => {
                                if (
                                  mode === EExamMode.RESULT ||
                                  time === EXAM_CONSTANTS.TIME_OUT_STRING
                                )
                                  return;
                                const cloneData = {
                                  ...options,
                                };
                                cloneData[item.public_id] = answerOption;
                                setOptions(cloneData);
                              }}
                              className={`${getColorQuestionOption(
                                item.public_id,
                                answerOption
                              )} h-5 cursor-pointer rounded-md flex items-center justify-center border border-stone-300 p-5`}
                            >
                              {answerOption}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ))}
                </Box>
              ))}
            </Box>
          </Box>
          <FloatButton.BackToTopButton />
        </section>
      )}
    </>
  );
};

export default ExamTemplatePresenter;
