import { CONFIG_CONSTANTS } from "@/constants";
import { IBase } from "..";

interface BaseUser extends IBase.BaseData {
  fullName: string;
  role: CONFIG_CONSTANTS.EUserRole;
  email: string;
  isFirstTimeLogin: boolean;
}

interface DetailedUser extends BaseUser {
  group: string;
  isDeleted: number;
  isDisabled: number;
  isFirstTimeLogin: boolean;
}

interface UserRequest {
  id?: string;
  fullName: string;
  group: string;
  email: string;
}

export type { BaseUser, DetailedUser, UserRequest };
