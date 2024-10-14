import { useEffect } from "react";

function useClickOutside(parentRef, ref, onClickOutside) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (parentRef.current && parentRef.current.contains(event.target)) {
                return;
            }
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, parentRef, onClickOutside]);
}

export default useClickOutside;
