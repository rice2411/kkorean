const FileHelpers = {
    getLocalFile: (fileName, extension) => {
        return `/${FileHelpers.getPath(
            extension
        )}/${fileName}.${FileHelpers.getExtension(extension)}`;
    },

    getPath: (extension) => {
        switch (extension) {
            case "path":
                return "svgPath";
            case "svg":
                return "svg";
            case "jpg":
            case "png":
                return "images";
        }
    },

    getExtension: (extension) => {
        switch (extension) {
            case "path":
                return "path.svg";
            default:
                return extension;
        }
    },
};

export default FileHelpers;
