import TestService from "@/services/Test";

export const TestsPageLoader = async () => {
    const response = await TestService.getList();
    return response || [];
};
