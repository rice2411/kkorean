import { DashboardPage } from "@/components/Pages/";
import { IUser } from "@/interface";
import { useLoaderData } from "react-router-dom";

function Users() {
    const users = useLoaderData() as unknown as IUser.DetailedUser[];
    return (
        <>
            <DashboardPage.UsersPage users={users} />
        </>
    );
}

export default Users;
