import { GroupsAPI } from "@/apis";

export const GroupsPageLoader = async () => {
    const response = await GroupsAPI.getList();
    return response || [];
};
