import { IContext } from "@/interface";
import { useState, createContext, ReactNode } from "react";

interface ModalContextType {
    modalSuccess: IContext.IModalContext.ModalState;
    modalImportantConfirm: IContext.IModalContext.ModalState;
    modalConfirm: IContext.IModalContext.ModalState;
    modalBlank: IContext.IModalContext.ModalState;
    handleModiferModalSuccess: (
        modal: IContext.IModalContext.ModalState
    ) => void;
    handleModiferModalImportantConfirm: (
        modal: IContext.IModalContext.ModalState
    ) => void;
    handleModiferModalConfirm: (
        modal: IContext.IModalContext.ModalState
    ) => void;
    handleModiferModalBlank: (modal: IContext.IModalContext.ModalState) => void;
}

const defaultModalState: IContext.IModalContext.ModalState = {
    isOpen: false,
    title: null,
    text: "",
    okButton: {
        text: "",
    },
    cancelButton: {
        text: "",
    },
    confirmData: "",
    type: 0,
    defaultData: null,
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modalSuccess, setModalSuccess] =
        useState<IContext.IModalContext.ModalState>(defaultModalState);
    const [modalImportantConfirm, setModalImportantConfirm] =
        useState<IContext.IModalContext.ModalState>(defaultModalState);
    const [modalConfirm, setModalConfirm] =
        useState<IContext.IModalContext.ModalState>(defaultModalState);
    const [modalBlank, setModalBlank] =
        useState<IContext.IModalContext.ModalState>(defaultModalState);

    const handleModiferModalBlank = (
        modal: IContext.IModalContext.ModalState
    ) => {
        setModalBlank(modal);
    };
    const handleModiferModalSuccess = (
        modal: IContext.IModalContext.ModalState
    ) => {
        setModalSuccess(modal);
    };
    const handleModiferModalImportantConfirm = (
        modal: IContext.IModalContext.ModalState
    ) => {
        setModalImportantConfirm(modal);
    };
    const handleModiferModalConfirm = (
        modal: IContext.IModalContext.ModalState
    ) => {
        setModalConfirm(modal);
    };

    return (
        <ModalContext.Provider
            value={{
                modalSuccess,
                modalImportantConfirm,
                modalConfirm,
                modalBlank,
                handleModiferModalSuccess,
                handleModiferModalImportantConfirm,
                handleModiferModalConfirm,
                handleModiferModalBlank,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export { ModalContext, ModalProvider };
