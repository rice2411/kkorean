import { EXAM_CONSTANTS } from "@/constants";
import { IExam } from "@/interface";

const ExamUtils = {
  setCompletedExamLocalStorage: (examId: string, resultId: string) => {
    const completedExams = JSON.parse(
      localStorage.getItem("completedExams") || "[]"
    );
    completedExams.push({ examId, resultId });
    localStorage.setItem(`completedExams`, JSON.stringify(completedExams));
  },
  getCompletedExamLocalStorage: (): { examId: string; resultId: string }[] => {
    const completedExams = JSON.parse(
      localStorage.getItem("completedExams") || "[]"
    );
    return completedExams;
  },
  getListOptions: (
    enumObject: object,
    errorValue: number,
    labelFunction: (value: number) => string | number
  ): { value: number; label: string }[] => {
    return Object.values(enumObject)
      .filter(
        (value): value is number =>
          typeof value === "number" && value !== errorValue
      )
      .map((value) => ({
        value,
        label: labelFunction(value) as string,
      }));
  },

  getListOptionsType: () =>
    ExamUtils.getListOptions(
      EXAM_CONSTANTS.EExamType,
      EXAM_CONSTANTS.ERROR,
      ExamUtils.getExamType
    ),
  getListOptionsPlan: () =>
    ExamUtils.getListOptions(
      EXAM_CONSTANTS.EExamPlan,
      EXAM_CONSTANTS.ERROR,
      ExamUtils.getExamPlan
    ),
  getListOptionsLevel: () =>
    ExamUtils.getListOptions(
      EXAM_CONSTANTS.EExamLevel,
      EXAM_CONSTANTS.ERROR,
      ExamUtils.getExamLevel
    ),

  getLevelColor: (level: number) => {
    switch (level) {
      case EXAM_CONSTANTS.EExamLevel.EASY:
        return "green";
      case EXAM_CONSTANTS.EExamLevel.MEDIUM:
        return "primary";
      case EXAM_CONSTANTS.EExamLevel.HARD:
      default:
        return "red";
    }
  },

  getTypeColor: (type: number) => {
    switch (type) {
      case EXAM_CONSTANTS.EExamType.LISTENING:
        return "red";
      case EXAM_CONSTANTS.EExamType.READING:
      default:
        return "primary";
    }
  },

  getPlanColor: (plan: number) => {
    switch (plan) {
      case EXAM_CONSTANTS.EExamPlan.FREE:
        return "green";
      case EXAM_CONSTANTS.EExamPlan.PAID:
      default:
        return "blue";
    }
  },

  getExamPlan: (plan: number): string | number => {
    switch (plan) {
      case EXAM_CONSTANTS.EExamPlan.FREE:
        return "Miễn phí";
      case EXAM_CONSTANTS.EExamPlan.PAID:
        return "Học viên";
      default:
        return EXAM_CONSTANTS.ERROR;
    }
  },

  getExamPlanString: (plan: string): number => {
    switch (plan.toLowerCase()) {
      case "free":
        return EXAM_CONSTANTS.EExamPlan.FREE;
      case "paid":
        return EXAM_CONSTANTS.EExamPlan.PAID;
      default:
        return EXAM_CONSTANTS.ERROR;
    }
  },

  getExamType: (type: number): string | number => {
    switch (type) {
      case EXAM_CONSTANTS.EExamType.LISTENING:
        return "Nghe";
      case EXAM_CONSTANTS.EExamType.READING:
        return "Đọc";
      default:
        return EXAM_CONSTANTS.ERROR;
    }
  },

  getExamLevel: (level: number): string | number => {
    switch (level) {
      case EXAM_CONSTANTS.EExamLevel.EASY:
        return "Dễ";
      case EXAM_CONSTANTS.EExamLevel.MEDIUM:
        return "Trung bình";
      case EXAM_CONSTANTS.EExamLevel.HARD:
        return "Khó";
      default:
        return EXAM_CONSTANTS.ERROR;
    }
  },

  getExamTypeString: (type: string): number => {
    switch (type.toLowerCase()) {
      case "nghe":
        return EXAM_CONSTANTS.EExamType.LISTENING;
      case "đọc":
        return EXAM_CONSTANTS.EExamType.READING;
      default:
        return EXAM_CONSTANTS.ERROR;
    }
  },

  getExamLevelString: (level: string): number => {
    switch (level.toLowerCase()) {
      case "dễ":
        return EXAM_CONSTANTS.EExamLevel.EASY;
      case "trung bình":
        return EXAM_CONSTANTS.EExamLevel.MEDIUM;
      case "khó":
        return EXAM_CONSTANTS.EExamLevel.HARD;
      default:
        return EXAM_CONSTANTS.ERROR;
    }
  },

  handleValidateExamInfo: (examInfo: IExam.ExamRequest): boolean => {
    if (Object.keys(examInfo).length < 3) return false;
    return ![examInfo.type, examInfo.level, examInfo.plan].includes(
      EXAM_CONSTANTS.ERROR
    );
  },
};

export default ExamUtils;
