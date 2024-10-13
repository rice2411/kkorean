import { UserService } from "@/services";

export const UsersPageLoader = async () => {
    const response = await UserService.getList();
    return response || [];
};
