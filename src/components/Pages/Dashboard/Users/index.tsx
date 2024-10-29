import { Heading } from "@/components/Atoms";
import { Table } from "@/components/Organisms";

import React from "react";

const UsersPage = () => {
    return (
        <>
            <section className="antialiased mt-4">
                <Heading>Danh sách tài khoản</Heading>
                <Table.TableUsers />
            </section>
        </>
    );
};

export default UsersPage;
