import { Heading } from "@/components/Atoms";
import { Table } from "@/components/Organisms";

function UsersPage({ users }) {
    return (
        <>
            <section className="antialiased mt-4">
                <Heading>Danh sách tài khoản</Heading>
                <Table.TableUsers users={users} />
            </section>
        </>
    );
}

export default UsersPage;
