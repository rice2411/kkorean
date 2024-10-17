import { IGroup, IUser } from "@/interface";

interface ContainerProps {
    users: IUser.DetailedUser[];
}

interface PresenterProps {
    users: IUser.DetailedUser[];
    groups: IGroup.BaseGroup[];
    handleConfirmUpdateAccountStatus: (user: IUser.DetailedUser) => void;
    handleImportantConfirm: (user: IUser.DetailedUser) => void;
    handleOpenModalUser: (type: number, user?: IUser.DetailedUser) => void;
    handleConfirmResetPassword: (user: IUser.DetailedUser) => void;
}

export type { ContainerProps, PresenterProps };
