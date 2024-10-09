import { Heading } from "@/components/Atoms";
import TableTests from "./Table";

function Tests({ tests }) {
    return (
        <>
            <section className="antialiased mt-4">
                <Heading>Danh sách bộ đề</Heading>
                <TableTests tests={tests} />
            </section>
        </>
    );
}

export default Tests;
