import { useEffect } from "react";

function useClickOutside(
    parentRef: React.RefObject<HTMLElement>,
    ref: React.RefObject<HTMLElement>,
    onClickOutside: () => void
) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Check if the parentRef contains the clicked target
            if (
                parentRef.current &&
                parentRef.current.contains(event.target as Node)
            ) {
                return;
            }
            // Check if the ref does not contain the clicked target
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside();
            }
        }

        // Add the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup function to remove the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [parentRef, ref, onClickOutside, "mousedown"]); // Dependencies
}

export default useClickOutside;
