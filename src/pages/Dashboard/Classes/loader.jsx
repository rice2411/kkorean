import { ClassService } from "@/services";

export const ClassesPageLoader = async () => {
    const response = await ClassService.getList();
    return response || [];
};
