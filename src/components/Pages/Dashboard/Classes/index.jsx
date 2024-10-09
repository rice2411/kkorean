import { Heading } from "@/components/Atoms";
import TableClassses from "./Table";

function Classes({ classes }) {
    return (
        <>
            <section className="antialiased mt-4">
                <Heading>Danh sách lớp</Heading>
                <TableClassses classes={classes} />
            </section>
        </>
    );
}

export default Classes;
