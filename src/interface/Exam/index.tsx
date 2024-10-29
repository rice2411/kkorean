import { EXAM_CONSTANTS } from "@/constants";
import { IBase } from "..";

interface BaseExam extends IBase.BaseData {
  name: string; // Make this required
  questions?: string;
  level: EXAM_CONSTANTS.EExamLevel;
  plan: EXAM_CONSTANTS.EExamPlan;
  type: EXAM_CONSTANTS.EExamType;
  isAudioUploaded?: number;
  isImageUploaded?: number;
  description: string;
  completedUser: string[];
}

type ExamRequest = Omit<BaseExam, "id">;

export type { BaseExam, ExamRequest };
