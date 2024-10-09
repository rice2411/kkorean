import Users from "@/components/Pages/Dashboard/Users";
import { useLoaderData } from "react-router-dom";

function UsersPage() {
    const users = useLoaderData();
    return (
        <>
            <Users users={users} />
        </>
    );
}

export default UsersPage;
