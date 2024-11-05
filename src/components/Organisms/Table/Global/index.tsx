import React from "react";
import GlobalTableContainer from "./container";
import { TableGlobal } from "@/interface/UI";

const GlobalTable = <T,>({ data, columns, page, setPage }: TableGlobal<T>) => {
  return (
    <GlobalTableContainer
      data={data}
      columns={columns}
      page={page}
      setPage={setPage}
    />
  );
};

export default GlobalTable;
