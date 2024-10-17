import { Heading } from "@/components/Atoms";
import { Table } from "@/components/Organisms";
import { IUser } from "@/interface";
import React from "react";

interface Props {
    users: IUser.DetailedUser[];
}

const UsersPage: React.FC<Props> = ({ users }) => {
    return (
        <>
            <section className="antialiased mt-4">
                <Heading>Danh sách tài khoản</Heading>
                <Table.TableUsers users={users} />
            </section>
        </>
    );
};

export default UsersPage;
