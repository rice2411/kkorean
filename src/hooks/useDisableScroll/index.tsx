import { useEffect } from "react";

function useDisableScroll(disabled: boolean) {
    useEffect(() => {
        if (disabled) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [disabled]);
}

export default useDisableScroll;
