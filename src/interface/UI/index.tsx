interface SidebarItem {
  href: string;
  icon: JSX.Element;
  text: string;
  isActive?: boolean;
}

interface Column<T> {
  header: string;
  accessor: keyof T | string;
  render?: (value: unknown | string | number | Date, row: T) => JSX.Element;
};
interface TableGlobal<T> {
  data: T[];
  columns: Column<T>[];
  page: number,
  setPage: (value: number) => void
}

export type { SidebarItem, TableGlobal, Column }