import { CONFIG_CONSTANTS } from "@/constants";
import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
    useEffect(() => {
        document.title = CONFIG_CONSTANTS.WEB_TITLE + " | " + title;

        return () => {
            document.title = CONFIG_CONSTANTS.WEB_TITLE;
        };
    }, [title]);
};

export default useDocumentTitle;
