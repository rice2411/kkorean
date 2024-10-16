import { IBase } from "..";

interface BaseNotification extends IBase.BaseData {
    type: string;
    message: string;
    createdDate: number;
    isRead: boolean;
}
export type { BaseNotification };
