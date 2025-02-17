import { IContext, IExam } from "@/interface";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IFilterOptions } from "./props";
import ExamListPagePresenter from "./presenter";
import { useAuth, useLoading, useModal } from "@/hooks";
import { useNavigate } from "react-router-dom";
import ResultsAPI from "@/apis/Result";
import { EExamPlan, EExamType } from "@/constants/exam";
import { DateFNSUtils, ExamUtils, ToastUtils } from "@/utils";
import { NotificationsAPI } from "@/apis";
import { NOTIFICATION_CONSTANTS } from "@/constants";

function ExamListPageContainer() {
  const navigate = useNavigate();

  const exams = useLoaderData() as unknown as IExam.BaseExam[];
  const { showLoading, hideLoading, setLoadingText } =
    useLoading() as IContext.ILoadingContext.UseLoadingReturnType;
  const { user } =
    useAuth() as unknown as IContext.IAuthContenxt.UseAuthReturnType;
  const { handleModiferModalConfirm } =
    useModal() as unknown as IContext.IModalContext.UseModalReturnType;

  const [filteredExams, setFilteredExams] = useState<IExam.BaseExam[]>(exams);
  const [searchContent, setSearchContent] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<IFilterOptions[]>([
    { id: "type", data: [] },
    { id: "level", data: [] },
    { id: "plan", data: [] },
  ]);

  const handleOnChangeValue = (data: IFilterOptions) => {
    setFilterOptions((prev) =>
      prev.map((option) => (option.id === data.id ? data : option))
    );
  };

  const onCloseModalConfirm = () => {
    handleModiferModalConfirm({
      isOpen: false,
    });
  };

  const handleCheckResult = async (exam: IExam.BaseExam) => {
    try {
      setLoadingText("Đang lấy kết quả");
      showLoading();
      const resultId = user
        ? user.completedExams.filter((item) => item.examId === exam.id)[0]
            .resultId
        : ExamUtils.getCompletedExamLocalStorage().filter(
            (item: { examId: string }) => item.examId === exam.id
          )[0].resultId;
      const result = await ResultsAPI.get(resultId);
      navigate("result", {
        state: result,
      });
    } catch (err) {
      console.log(err);
    } finally {
      hideLoading();
    }
  };

  const onStartExam = async (exam: IExam.BaseExam) => {
    onCloseModalConfirm();
    await NotificationsAPI.createNotification({
      type: NOTIFICATION_CONSTANTS.ENotificationType.DOING,
      message: `Người dùng <b>${
        user ? user.email : "khách"
      }</b> đã tham bắt đầu làm ${
        exam.name
      }</b> vào vào lúc ${DateFNSUtils.now()}`,
    });
    navigate("doing", { state: exam });
  };
  const handleStartExam = async (exam: IExam.BaseExam) => {
    if (!user && exam.plan === EExamPlan.PAID) {
      ToastUtils.warning("Đề này chỉ dành cho học viên");
      return;
    }
    if (
      !exam.completedUser.includes(user?.id) &&
      ExamUtils.getCompletedExamLocalStorage().filter(
        (item: { examId: string }) => item.examId === exam.id
      ).length === 0
    ) {
      handleModiferModalConfirm({
        isOpen: true,
        text: `Bạn có muốn bắt đầu làm <b>${exam.name}</b> với thời gian <b>60 phút</b>`,
        okButton: {
          text: "Bắt đầu",
          onClick: async () => {
            await onStartExam(exam);
            return;
          },
        },
        cancelButton: {
          text: "Hủy",
          onClick: onCloseModalConfirm,
        },
      });
    } else {
      await handleCheckResult(exam);
    }
  };

  useEffect(() => {
    const filtered = exams.filter((exam) => {
      const isValidExam =
        exam.type === EExamType.LISTENING
          ? exam.isAudioUploaded && exam.isImageUploaded
          : exam.isImageUploaded;
      const matchesSearch = exam.name.toLowerCase().includes(searchContent);
      const matchesType = filterOptions.find((option) => option.id === "type")
        ?.data.length
        ? filterOptions
            .find((option) => option.id === "type")!
            .data.includes(exam.type.toString())
        : true;
      const matchesPlan = filterOptions.find((option) => option.id === "plan")
        ?.data.length
        ? filterOptions
            .find((option) => option.id === "plan")!
            .data.includes(exam.plan.toString())
        : true;
      const matchesLevel = filterOptions.find((option) => option.id === "level")
        ?.data.length
        ? filterOptions
            .find((option) => option.id === "level")!
            .data.includes(exam.level.toString())
        : true;

      return (
        matchesSearch &&
        matchesType &&
        matchesPlan &&
        matchesLevel &&
        isValidExam
      );
    });
    setFilteredExams(filtered);
  }, [searchContent, filterOptions, exams]);

  return (
    <ExamListPagePresenter
      filteredExams={filteredExams}
      setSearchContent={setSearchContent}
      handleOnChangeValue={handleOnChangeValue}
      handleStartExam={handleStartExam}
    />
  );
}

export default ExamListPageContainer;
