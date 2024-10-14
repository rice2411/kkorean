import { EXAM_CONSTANTS } from "@/constants";

const ExamUtils = {
  getExamPlan: (plan) => {
    switch (plan) {
      case EXAM_CONSTANTS.EXAM_PLAN.FREE:
        return "Miễn phí";
      case EXAM_CONSTANTS.EXAM_PLAN.PAID:
        return "Học viên";
      default:
        return EXAM_CONSTANTS.ERROR;
    }
  },

  getExamPlanString: (plan) => {
    switch (plan.toLowerCase()) {
      case "free":
        return EXAM_CONSTANTS.EXAM_PLAN.FREE;
      case "paid":
        return EXAM_CONSTANTS.EXAM_PLAN.PAID;
      default:
        return EXAM_CONSTANTS.ERROR;
    }
  },

  getExamType: (type) => {
    switch (type) {
      case EXAM_CONSTANTS.EXAM_TYPE.LISTENING:
        return "Listening";
      case EXAM_CONSTANTS.EXAM_TYPE.READING:
        return "Reading";
      default:
        return EXAM_CONSTANTS.ERROR;
    }
  },

  getExamLevel: (level) => {
    switch (level) {
      case EXAM_CONSTANTS.EXAM_LEVEL.EASY:
        return "Dễ";
      case EXAM_CONSTANTS.EXAM_LEVEL.MEDIUM:
        return "Trung bình";
      case EXAM_CONSTANTS.EXAM_LEVEL.HARD:
        return "Khó";
      default:
        return EXAM_CONSTANTS.ERROR;
    }
  },

  getExamTypeString: (type) => {
    switch (type.toLowerCase()) {
      case "nghe":
        return EXAM_CONSTANTS.EXAM_TYPE.LISTENING;
      case "đọc":
        return EXAM_CONSTANTS.EXAM_TYPE.READING;
      default:
        return EXAM_CONSTANTS.ERROR;
    }
  },
  getExamLevelString: (level) => {
    switch (level.toLowerCase()) {
      case "dễ":
        return EXAM_CONSTANTS.EXAM_LEVEL.EASY;
      case "trung bình":
        return EXAM_CONSTANTS.EXAM_LEVEL.MEDIUM;
      case "khó":
        return EXAM_CONSTANTS.EXAM_LEVEL.HARD;
      default:
        return EXAM_CONSTANTS.ERROR;
    }
  },

  handleValidateExamInfo: (examInfo) => {
    //  type,level,plan
    if (examInfo.length < 3) return false;

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
