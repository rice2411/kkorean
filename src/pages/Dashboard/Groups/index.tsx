import { DashboardPage } from "@/components/Pages";
import { IGroup } from "@/interface";
import { useLoaderData } from "react-router-dom";

function Group() {
  const groups = useLoaderData() as IGroup.BaseGroup[];
  return <DashboardPage.GroupsPage groups={groups} />;
}

export default Group;
