import { Pagination } from "@/components/Molecules";
import { PAGINATION_CONSTANTS } from "@/constants";
import { TableGlobal } from "@/interface/UI";

interface PresenterProps<T> extends TableGlobal<T> {
  getNestedValue: (obj: T, path: string) => unknown;
  page: number;
  setPage: (page: number) => void;
}

const GlobalTablePresenter = <T,>({
  data,
  columns,
  page,
  setPage,
  getNestedValue,
}: PresenterProps<T>) => {
  const pageSize = PAGINATION_CONSTANTS.DEFAULT_PAGE_SIZE;
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex flex-col mt-6 text-gray-500">
      <div className="overflow-x-auto rounded-lg"> {/* Cho phép cuộn ngang */}
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="relative overflow-x-auto sm:rounded-lg"> {/* Cập nhật ở đây */}
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        className="px-6 py-4 border-b bg-gray-50 text-left text-gray-700"
                      >
                        {column.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      {columns.map((column, colIndex) => {
                        const value =
                          typeof column.accessor === "string"
                            ? getNestedValue(item, column.accessor as string)
                            : item[column.accessor as keyof T];

                        return (
                          <td key={colIndex} className="px-6 py-4">
                            {column.render
                              ? column.render(value, item)
                              : value !== undefined
                              ? value?.toString()
                              : ""}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              length={data.length} // Tổng số bản ghi
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalTablePresenter;
