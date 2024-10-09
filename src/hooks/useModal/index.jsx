import { ModalContext } from "@/contexts/Modal";
import { useContext } from "react";

const useModal = () => {
    return useContext(ModalContext);
};

export default useModal;
