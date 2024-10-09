import { Heading } from "@/components/Atoms";
import TableUsers from "./Table";

function Users({ users }) {
    return (
        <>
            <section className="antialiased mt-4">
                <Heading>Danh sách tài khoản</Heading>
                <TableUsers users={users} />
            </section>
        </>
    );
}

export default Users;
