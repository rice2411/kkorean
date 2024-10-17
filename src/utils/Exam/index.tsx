import { EXAM_CONSTANTS } from "@/constants";
import { IExam } from "@/interface";

const ExamUtils = {
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
        return "Listening";
      case EXAM_CONSTANTS.EExamType.READING:
        return "Reading";
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
    //  type, level, plan
    if (Object.keys(examInfo).length < 3) return false;

    if (
      examInfo.type === EXAM_CONSTANTS.ERROR ||
      examInfo.level === EXAM_CONSTANTS.ERROR ||
      examInfo.plan === EXAM_CONSTANTS.ERROR
    )
      return false;

    return true;
  },
};

export default ExamUtils;
