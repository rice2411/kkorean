import TableUsersContainer from "./container";
import React from "react";
import { ContainerProps } from "./props";

const TableUsers: React.FC<ContainerProps> = ({ users }) => {
    return <TableUsersContainer users={users} />;
};

export default TableUsers;
