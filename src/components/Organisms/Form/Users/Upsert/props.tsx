import { IBase, IContext, IGroup, IUser } from "@/interface";
import React from "react";

interface ContainerProps {
    groups: IGroup.BaseGroup[];
    modalBlank: IContext.IModalContext.ModalState;
    handleModiferModalSuccess: (
        data: IContext.IModalContext.ModalState
    ) => void;
    handleModiferModalBlank: (data: IContext.IModalContext.ModalState) => void;
}

interface PresenterProps {
    user: IUser.UserRequest;
    modalBlank: IContext.IModalContext.ModalState;
    groupOptions: IBase.BaseOptions[];
    handleSubmit: () => void;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}

export type { ContainerProps, PresenterProps };
