import { ExamsAPI } from "@/apis";
import { IExam } from "@/interface";

export const ExamListPageLoader = async () => {
  const response = (await ExamsAPI.getList()) as unknown as IExam.BaseExam[];
  return response || [];
};
