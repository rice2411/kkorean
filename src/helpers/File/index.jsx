import firebaseService from "@/services/Firebase";

const getLocalFile = async (fileName, extension) => {
    return `/${getPath(extension)}/${fileName}.${extension}`;
};

const getCloudFile = async (fileName, extension) => {
    if (import.meta.env.MODE === "production") {
        const url = await firebaseService.getFile(fileName, extension);
        return url;
    }
    return null;
};

const getPath = (extension) => {
    switch (extension) {
        case "svg":
            return "svg";
        case "jpg":
        case "png":
            return "images";
    }
};

export { getLocalFile, getPath };
