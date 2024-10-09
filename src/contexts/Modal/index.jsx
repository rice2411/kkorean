import { useState, createContext } from "react";

const ModalContext = createContext({});

const ModalProvider = ({ children }) => {
    const defaultValue = {
        isOpen: false,
        title: null,
        text: "",
        okButton: {
            text: "",
            onClick: null,
        },
        cancelButton: {
            text: "",
            onClick: null,
        },
        confirmData: "",
        type: "",
        defaultData: null,
    };

    const [modalSuccess, setModalSuccess] = useState(defaultValue);
    const [modalImportantConfirm, setModalImportantConfirm] =
        useState(defaultValue);
    const [modalConfirm, setModalConfirm] = useState(defaultValue);
    const [modalBlank, setModalBlank] = useState(defaultValue);

    function handleModiferModalBlank(modalSuccess) {
        setModalBlank(modalSuccess);
    }
    function handleModiferModalSuccess(modalSuccess) {
        setModalSuccess(modalSuccess);
    }

    function handleModiferModalImportantConfirm(modalImportantConfirm) {
        setModalImportantConfirm(modalImportantConfirm);
    }

    function handleModiferModalConfirm(modalConfirm) {
        setModalConfirm(modalConfirm);
    }
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
