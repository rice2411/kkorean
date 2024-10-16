const ALLOWED_EXTENSIONS = Object.freeze({
    EXCEL: ".xlsx, .xls" as const,
    IMAGE: ".png, .jpg, .jpeg, .heic" as const,
    AUDIO: ".mp3, .wav, .m4a, .aac" as const,
});

const UPLOAD_TYPE = Object.freeze({
    IMAGE: "image" as const,
    AUDIO: "audio" as const,
    EXCEL: "excel" as const,
});

export { ALLOWED_EXTENSIONS, UPLOAD_TYPE };
