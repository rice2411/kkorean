import { IBase } from "..";

interface BaseGroup extends IBase.BaseData {
    name: string;
    members: number;
}

interface GroupRequest {
    name: string;
    members: number;
}


export type { BaseGroup,GroupRequest };
