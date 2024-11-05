import React from "react";
import GlobalTablePresenter from "./presenter";
import { TableGlobal } from "@/interface/UI";

const GlobalTableContainer = <T,>({ data, columns, page, setPage }: TableGlobal<T>) => {
  const getNestedValue = (obj: T, path: string): unknown => {
    return path.split(".").reduce((acc: unknown, part: string) => {
      if (acc && typeof acc === "object" && part in acc) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, obj);
  };
  return (
    <GlobalTablePresenter
      getNestedValue={getNestedValue}
      data={data}
      columns={columns}
      page={page}
      setPage={setPage}
    ></GlobalTablePresenter>
  );
};

export default GlobalTableContainer;
