import { ExamService } from "@/services";

export const ExamsPageLoader = async () => {
    const response = await ExamService.getList();
    return response || [];
};
