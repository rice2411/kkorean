import { IBase } from "..";

interface BaseResult extends IBase.BaseData {
  userId: string;
  examId: string;
  data: {
    [k: string]: {
      options: string;
      answers: string;
    };
  };
  time: string;
  createdAt: Date;
}

type ResultRequest = Omit<BaseResult, "id">;

export type { BaseResult, ResultRequest };
