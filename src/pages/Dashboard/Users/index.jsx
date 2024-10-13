import { DashboardPage } from "@/components/Pages/";
import { useLoaderData } from "react-router-dom";

function Users() {
    const users = useLoaderData();
    return (
        <>
            <DashboardPage.UsersPage users={users} />
        </>
    );
}

export default Users;
