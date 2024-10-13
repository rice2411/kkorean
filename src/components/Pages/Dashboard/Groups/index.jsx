import { Heading } from "@/components/Atoms";
import { Table } from "@/components/Organisms";

function GroupsPage({ groups }) {
    return (
        <>
            <section className="antialiased mt-4">
                <Heading>Danh sách lớp</Heading>
                <Table.TableGroups groups={groups} />
            </section>
        </>
    );
}

export default GroupsPage;
