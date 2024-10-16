import { ExamsAPI } from "@/apis";

export const ExamsPageLoader = async () => {
    const response = await ExamsAPI.getList();
    return response || [];
};
