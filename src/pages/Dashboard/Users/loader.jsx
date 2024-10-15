import { UsersAPI } from "@/apis";

export const UsersPageLoader = async () => {
    const response = await UsersAPI.getList();
    return response || [];
};
