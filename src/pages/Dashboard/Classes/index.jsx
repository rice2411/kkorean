import Classes from "@/components/Pages/Dashboard/Classes";
import { useLoaderData } from "react-router-dom";

function ClassesPage() {
    const classes = useLoaderData();
    return (
        <>
            <Classes classes={classes} />
        </>
    );
}

export default ClassesPage;
