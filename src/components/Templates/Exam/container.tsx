import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExamsAPI, FilesAPI, NotificationsAPI, UsersAPI } from "@/apis";
import { EXAM_CONSTANTS, NOTIFICATION_CONSTANTS } from "@/constants";
import { useAuth, useCountdown, useLoading, useModal } from "@/hooks";
import { IContext, IExam, IFile, IResult } from "@/interface";
import { FileItem } from "@/interface/File";
import { DateFNSUtils, ExamUtils, ToastUtils } from "@/utils";
import ResultsAPI from "@/apis/Result";
import { EExamMode, EExamType } from "@/constants/exam";
import UserUtils from "@/utils/User";
import ExamTemplatePresenter from "./presenter";

interface Props {
  mode: EExamMode;
  exam: IExam.BaseExam;
  result?: IResult.BaseResult;
}

const ExamTemplateContainer: React.FC<Props> = ({ mode, exam, result }) => {
  const navigate = useNavigate();
  const { user } =
    useAuth() as unknown as IContext.IAuthContenxt.UseAuthReturnType;
  const { loading, showLoading, hideLoading, setLoadingText } =
    useLoading() as IContext.ILoadingContext.UseLoadingReturnType;
  const { handleModiferModalConfirm } =
    useModal() as unknown as IContext.IModalContext.UseModalReturnType;

  const { time, startCountdown } = useCountdown(
    exam.type === EExamType.LISTENING ? 3600 : 4200
  );

  const [questions, setQuestions] = useState<string[]>([]);
  const [options, setOptions] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<string[]>([]);
  const [images, setImages] = useState<FileItem[]>([]);
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
        const imageFiles = resources.filter(
          (item: IFile.FileItem) =>
            !item.public_id.includes(EXAM_CONSTANTS.AUDIO_KEY)
        );

        if (exam.type === EExamType.LISTENING) {
          const audioFile = resources.find((item: IFile.FileItem) =>
            item.public_id.includes(EXAM_CONSTANTS.AUDIO_KEY)
          ) as IFile.FileItem | undefined;

          if (audioFile) setAudio(audioFile.url || "");
        }

        setOptions(
          imageFiles.reduce((acc, item: IFile.FileItem) => {
            acc[item.public_id] =
              (mode === EExamMode.RESULT &&
                result &&
                result.data[item.public_id].options) ||
              "A";
            return acc;
          }, {} as Record<string, string>)
        );

        setImages(imageFiles.reverse());
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
            navigate("/exam");
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
        const score =
          Object.entries(payload.data).filter(
            (item) => item[1].answers === item[1].options
          ).length * EXAM_CONSTANTS.SCORE;
        if (user) {
          user.completedExams.push({
            examId: exam.id,
            resultId: response[0].id,
            score: score,
          });
          UserUtils.setUser(user);
          await UsersAPI.update(user);
        } else {
          ExamUtils.setCompletedExamLocalStorage(exam.id, response[0].id);
        }

        await NotificationsAPI.createNotification({
          type: NOTIFICATION_CONSTANTS.ENotificationType.SCORING,
          message: `Người dùng <b>${
            user ? user.email : "khách"
          }</b> đã đạt được ${score} điểm ở ${
            exam.name
          }</b> vào vào lúc ${DateFNSUtils.now()}`,
        });
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

  useEffect(() => {
    if (
      exam.type === EExamType.LISTENING &&
      audio &&
      mode === EExamMode.DOING
    ) {
      const track = new Audio(audio);
      track.play();

      return () => {
        track.pause();
        track.currentTime = 0;
      };
    }
  }, [audio]);

  return (
    <ExamTemplatePresenter
      mode={mode}
      exam={exam}
      result={result}
      loading={loading}
      questions={questions}
      images={images}
      time={time}
      options={options}
      counterAnswer={counterAnswer}
      correctAnswer={correctAnswer}
      handleQuitExam={handleQuitExam}
      handleSubmit={handleSubmit}
      getColorQuestionList={getColorQuestionList}
      getColorQuestionOption={getColorQuestionOption}
      setOptions={setOptions}
    />
  );
};

export default ExamTemplateContainer;
