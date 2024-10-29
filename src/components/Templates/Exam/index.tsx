import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExamsAPI, FilesAPI, UsersAPI } from "@/apis";
import { Box, Button, Heading, Image, Paragraph } from "@/components/Atoms";
import { Badge, ProgressBar } from "@/components/Molecules";
import { EXAM_CONSTANTS } from "@/constants";
import { useAuth, useCountdown, useLoading, useModal } from "@/hooks";
import { IContext, IExam, IFile, IResult } from "@/interface";
import { FileItem } from "@/interface/File";
import { DateFNSUtils, ExamUtils, ToastUtils } from "@/utils";
import ResultsAPI from "@/apis/Result";
import { EExamMode } from "@/constants/exam";
import UserUtils from "@/utils/User";

interface Props {
  mode: EExamMode;
  exam: IExam.BaseExam;
  result?: IResult.BaseResult;
}

const ExamTemplate: React.FC<Props> = ({ mode, exam, result }) => {
  const navigate = useNavigate();
  const { user } =
    useAuth() as unknown as IContext.IAuthContenxt.UseAuthReturnType;
  const { loading, showLoading, hideLoading, setLoadingText } =
    useLoading() as IContext.ILoadingContext.UseLoadingReturnType;
  const { handleModiferModalConfirm } =
    useModal() as unknown as IContext.IModalContext.UseModalReturnType;

  const { time, startCountdown } = useCountdown(3600);

  const [questions, setQuestions] = useState<string[]>([]);
  const [options, setOptions] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<string[]>([]);
  const [images, setImages] = useState<Array<FileItem>>([]);
  const [audio, setAudio] = useState<string>("");

  const counterAnswer = Object.values(options).filter(
    (item) => item !== ""
  ).length;
  const correctAnswer = Object.entries(result?.data || []).filter(
    (item) => item[1].answers === item[1].options
  ).length;

  const fetchImages = async () => {
    if (!exam) return;

    showLoading();
    setLoadingText("Đề của bạn đang được tải lên, chờ xíu nhé!!!");
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

        setOptions(
          resources.reduce((acc, item: IFile.FileItem) => {
            acc[item.public_id] =
              (mode === EExamMode.RESULT &&
                result &&
                result.data[item.public_id].options) ||
              "A";
            return acc;
          }, {} as Record<string, string>)
        );

        setImages(
          resources
            .filter(
              (item: IFile.FileItem) =>
                !item.public_id.includes(EXAM_CONSTANTS.AUDIO_KEY)
            )
            .reverse()
        );
      }
    } catch (err) {
      ToastUtils.error("Đã có lỗi xảy ra vui lòng thử lại");
      console.error(err);
    } finally {
      if (mode === EExamMode.DOING) {
        startCountdown();
      }
      hideLoading();
      setLoadingText("");
    }
  };

  const onCloseModalConfirm = () => {
    handleModiferModalConfirm({
      isOpen: false,
    });
  };

  const handleQuitExam = () => {
    if (mode === EExamMode.DOING) {
      handleModiferModalConfirm({
        isOpen: true,
        text: `Bạn có muốn thoát khỏi bài làm? Kết quả của bạn sẽ không được lưu lại`,
        okButton: {
          text: "Xác nhận",
          onClick: () => {
            showLoading();
          },
        },
        cancelButton: {
          text: "Hủy",
          onClick: onCloseModalConfirm,
        },
      });
      return;
    }
    navigate("/exam");
    return;
  };

  const onSubmit = async () => {
    setLoadingText("Đang tiến hành ghi nhận đáp án ...");
    showLoading();
    onCloseModalConfirm();
    try {
      const finalResult = Object.fromEntries(
        Object.entries(options)
          .reverse()
          .map((entry, index) => {
            const [key, value] = entry;
            return [key, { options: value, answers: answers[index] }];
          })
      );
      const payload: IResult.ResultRequest = {
        userId: "",
        examId: exam.id,
        time: time,
        createdAt: new Date(),
        data: finalResult,
      };
      exam.completedUser.push(!user ? "guest" : user.id);

      const request = [
        await ResultsAPI.create(payload),
        await ExamsAPI.update(exam),
      ];
      const response = (await Promise.all(request)) as [IResult.BaseResult];
      if (response[0].id) {
        user.completedExams.push({
          examId: exam.id,
          resultId: response[0].id,
        });
        UserUtils.setUser(user);
        await UsersAPI.update(user),
          navigate("/exam/result", {
            state: response[0],
            replace: true,
          });
      }
    } catch (err) {
      console.log(err);
    } finally {
      hideLoading();
    }
  };

  const handleSubmit = () => {
    handleModiferModalConfirm({
      isOpen: true,
      text: `Bạn xác nhận muốn nộp bài?`,
      okButton: {
        text: "Xác nhận",
        onClick: () => {
          onSubmit();
        },
      },
      cancelButton: {
        text: "Hủy",
        onClick: onCloseModalConfirm,
      },
    });
  };

  const getColorQuestionList = (item: FileItem) => {
    if (mode === EExamMode.DOING) {
      if (options[item.public_id]) return "bg-primary-400 text-white";
    } else {
      if (!result) return "";
      if (
        result.data[item.public_id].answers ===
        result.data[item.public_id].options
      )
        return "bg-green-500 !border-green-500 text-white";
      else return "bg-red-500 !border-red-500 text-white";
    }
    return "";
  };
  const getColorQuestionOption = (publicId: string, answerOption: string) => {
    if (mode === EExamMode.DOING) {
      if (options[publicId] === answerOption)
        return "bg-primary-400 text-white";
    } else {
      if (!result) return "";
      let isCorrect = false;
      if (options[publicId] === answerOption) {
        if (options[publicId] === result.data[publicId].answers) {
          isCorrect = true;
          return "bg-green-500 !border-green-500 text-white";
        } else return "bg-red-500 !border-red-500 text-white";
      }
      if (!isCorrect && answerOption === result.data[publicId].answers) {
        return "bg-green-500 !border-green-500 text-white";
      }
    }
    return "hover:bg-gray-100";
  };

  useEffect(() => {
    const rawData: Array<[string, string]> = JSON.parse(exam.questions || "");
    const resultQuestions: string[] = [];
    const resultAnswers: string[] = [];
    rawData.forEach((item) => {
      resultQuestions.push(item[0]);
      item[1].split("").forEach((_item) => resultAnswers.push(_item));
    });
    setQuestions(resultQuestions);
    setAnswers(resultAnswers);
    fetchImages();
  }, []);

  return (
    <>
      {!loading && (
        <section className="flex flex-col h-screen py-4 px-4 max-w-screen bg-gray-300">
          <Box className="bg-white p-5 rounded-md">
            <Heading>
              {mode === EExamMode.DOING ? "Chế độ làm bài" : "Xem kết quả"} -{" "}
              {exam.name} -{" "}
              {mode === EExamMode.DOING
                ? time
                : DateFNSUtils.itTake(result?.time || "")}
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
              <Box className="flex items-center justify-center h-min">
                {mode === EExamMode.DOING && (
                  <Button
                    className="mr-2"
                    hover={true}
                    onClick={handleSubmit}
                    disabled={
                      counterAnswer !== EXAM_CONSTANTS.NUMBER_OF_QUESTION ||
                      false
                    }
                  >
                    Nộp bài
                  </Button>
                )}
                <Button onClick={handleQuitExam} variant="secondary-outline">
                  Quay lại
                </Button>
              </Box>
            </Box>
            <ProgressBar
              percentage={Math.round(
                (counterAnswer * 100) / EXAM_CONSTANTS.NUMBER_OF_QUESTION
              )}
              color="bg-gradient-to-l from-yellow-300 via-orange-400 to-red-500"
            />
          </Box>
          <Box className="grid grid-cols-12 gap-2 mt-2 flex-1 overflow-hidden">
            {/* Sidebar with questions */}
            <Box className="col-span-2 text-center bg-white p-5 rounded-md h-auto overflow-y-auto scrollbar-hidden">
              <Heading level={5}> Câu hỏi:</Heading>
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
            </Box>

            {/* Questions display area with independent scroll */}
            <Box className="col-span-10 max-h-full overflow-y-auto pr-4 bg-white p-5 rounded-md">
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
                                if (mode === EExamMode.RESULT) return;
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
        </section>
      )}
    </>
  );
};

export default ExamTemplate;
