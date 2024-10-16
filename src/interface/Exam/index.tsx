import { IBase } from "..";

interface BaseExam extends IBase.BaseData {
  name: string; // Make this required
  questions?: string;
  email?: string;
  level?: number;
  plan?: number;
  type?: number;
  isAudioUploaded?: number;
  isImageUploaded?: number;
}

type ExamRequest = Omit<BaseExam, "id">;

export type { BaseExam, ExamRequest };
