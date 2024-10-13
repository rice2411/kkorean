import { DashboardPage } from "@/components/Pages";
import { useLoaderData } from "react-router-dom";

function Group() {
    const groups = useLoaderData();
    return <DashboardPage.GroupsPage groups={groups} />;
}

export default Group;
