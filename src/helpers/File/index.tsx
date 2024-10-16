const FileHelpers = {
    getLocalFile: (fileName: string, extension: string): string => {
        return `/${FileHelpers.getPath(
            extension
        )}/${fileName}.${FileHelpers.getExtension(extension)}`;
    },

    getPath: (extension: string): string => {
        switch (extension) {
            case "path":
                return "svgPath";
            case "svg":
                return "svg";
            case "jpg":
            case "png":
                return "images";
            default:
                throw new Error(`Unsupported extension: ${extension}`);
        }
    },

    getExtension: (extension: string): string => {
        switch (extension) {
            case "path":
                return "path.svg";
            default:
                return extension;
        }
    },
};

export default FileHelpers;
