import { GroupService } from "@/services";

export const GroupsPageLoader = async () => {
    const response = await GroupService.getList();
    return response || [];
};
