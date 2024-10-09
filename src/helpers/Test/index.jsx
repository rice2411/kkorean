import { TEST_LEVEL, TEST_TYPE } from "@/constants/tests";

function getTestType(type) {
    switch (type) {
        case TEST_TYPE.LISTENING:
            return "Listening";
        case TEST_TYPE.READING:
            return "Reading";
        default:
            return "Loại bài kiểm tra không xác định";
    }
}
function getTestLevel(level) {
    switch (level) {
        case TEST_LEVEL.EASY:
            return "Dễ";
        case TEST_LEVEL.MEDIUM:
            return "Trung bình";
        case TEST_LEVEL.HARD:
            return "Khó";
    }
}

export { getTestType, getTestLevel };
