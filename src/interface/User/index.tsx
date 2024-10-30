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
  isDeleted?: number;
  isDisabled?: number;
  completedExams: {
    examId: string;
    resultId: string;
    score: number;
  }[];
}

interface UserRequest {
  id?: string;
  fullName: string;
  group: string;
  email: string;
}

interface UserProfile {
  name: string;
  jobTitle: string;
  location: string;
  email: string;
  address: string;
  phone: string;
  imageSrc: string;

   // Additional General Information section
   aboutMe: string;
   education: string;
   workHistory: string[];
   languages: string[];
   organization: string;
   role: string;
   department: string;
   joinDate: string;
   birthday: string;
}

export type { BaseUser, DetailedUser, UserRequest, UserProfile };
