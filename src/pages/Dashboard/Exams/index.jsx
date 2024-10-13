import { DashboardPage } from "@/components/Pages";
import { useLoaderData } from "react-router-dom";

function Exams() {
    const exams = useLoaderData();
    return (
        <>
            <DashboardPage.ExamsPage exams={exams} />
        </>
    );
}

export default Exams;
