import { EXAM_CONSTANTS } from "@/constants";

function getExamPlan(plan) {
    switch (plan) {
        case EXAM_CONSTANTS.EXAM_PLAN.FREE:
            return "Miễn phí";
        case EXAM_CONSTANTS.EXAM_PLAN.PAID:
            return "Học viên";
        default:
            return EXAM_CONSTANTS.ERROR;
    }
}

function getExamPlanString(plan) {
    switch (plan.toLowerCase()) {
        case "free":
            return EXAM_CONSTANTS.EXAM_PLAN.FREE;
        case "paid":
            return EXAM_CONSTANTS.EXAM_PLAN.PAID;
        default:
            return EXAM_CONSTANTS.ERROR;
    }
}

function getExamType(type) {
    switch (type) {
        case EXAM_CONSTANTS.EXAM_TYPE.LISTENING:
            return "Listening";
        case EXAM_CONSTANTS.EXAM_TYPE.READING:
            return "Reading";
        default:
            return EXAM_CONSTANTS.ERROR;
    }
}

function getExamLevel(level) {
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
}

function getExamTypeString(type) {
    switch (type.toLowerCase()) {
        case "nghe":
            return EXAM_CONSTANTS.EXAM_TYPE.LISTENING;
        case "đọc":
            return EXAM_CONSTANTS.EXAM_TYPE.READING;
        default:
            return EXAM_CONSTANTS.ERROR;
    }
}
function getExamLevelString(level) {
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
}

export {
    getExamType,
    getExamLevel,
    getExamTypeString,
    getExamLevelString,
    getExamPlanString,
    getExamPlan,
};
