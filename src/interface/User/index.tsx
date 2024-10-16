import { IBase } from "..";

interface BaseUser extends IBase.BaseData {
    fullName: string;
    role: number;
    email: string;
}

interface DetailedUser extends BaseUser {
    group: string;
    isDeleted: number;
    isDisabled: number;
    isFirstTimeLogin: boolean;
}

export type { BaseUser, DetailedUser };
