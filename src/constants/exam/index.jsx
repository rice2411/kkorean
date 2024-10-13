const EXAM_PLAN = Object.freeze({
    FREE: 11,
    PAID: 13,
});

const EXAM_TYPE = Object.freeze({
    LISTENING: 2001,
    READING: 2002,
    UNKNOW: 999,
});

const EXAM_LEVEL = Object.freeze({
    EASY: 0,
    MEDIUM: 1,
    HARD: 2,
    UNKNOW: 999,
});

const DEFAULT_FORMAT_QUESTION = [
    "1.1",
    "1.2",
    "1.3",
    "2.4",
    "2.5",
    "2.6",
    "2.7",
    "2.8",
    "3.9",
    "3.10",
    "3.11",
    "3.12",
    "4.13",
    "4.14",
    "4.15",
    "4.16",
    "5.17",
    "5.18",
    "5.19",
    "5.20",
    "6.21",
    "6.22",
    "7.23",
    "7.24",
    "8.25",
    "8.26",
    "9.27",
    "9.28",
    "10.29",
    "10.30",
    "11.31",
    "11.32",
    "12.33",
    "12.34",
    "13.35",
    "13.36",
    "14.37",
    "14.38",
    "15.39",
    "15.40",
    "16.41",
    "16.42",
    "17.43",
    "17.44",
    "18.45",
    "18.46",
    "19.47",
    "19.48",
    "20.49",
    "20.50",
];

const NUMBER_OF_QUESTION = 50;

const ERROR = 99999;
export {
    EXAM_TYPE,
    EXAM_LEVEL,
    DEFAULT_FORMAT_QUESTION,
    NUMBER_OF_QUESTION,
    EXAM_PLAN,
    ERROR,
};
