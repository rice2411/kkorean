import { IBase } from "..";

interface BaseNotification extends IBase.BaseData {
    type: number;
    message: string;
    createdDate: number;
    isRead: boolean;
}
export type { BaseNotification };
