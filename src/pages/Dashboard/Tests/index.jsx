import Tests from "@/components/Pages/Dashboard/Tests";
import { useLoaderData } from "react-router-dom";

function TestsPage() {
    const tests = useLoaderData();
    return (
        <>
            <Tests tests={tests} />
        </>
    );
}

export default TestsPage;
