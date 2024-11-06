import { Box, Heading } from "@/components/Atoms";
import { Card, Table } from "@/components/Organisms";
import { DropdownCheckbox } from "@/components/Organisms/Dropdown";
import { ENotificationType } from "@/constants/notification";
import { INotification } from "@/interface";
import { Column } from "@/interface/UI";
import { FirebaseService } from "@/services";
import { DateFNSUtils } from "@/utils";
import { useEffect, useState } from "react";

type Props = unknown;

// Column definitions
const columns: Column<INotification.BaseNotification>[] = [
  {
    header: "Thông tin",
    accessor: "message",
    render: (value: unknown) => (
      <span dangerouslySetInnerHTML={{ __html: String(value) }} />
    ),
  },
  {
    header: "Status",
    accessor: "type",
    render: (value: unknown) => (
      <div className="flex items-center flex-nowrap">
        <span
          className={`min-w-2 min-h-2 rounded-full mr-2 ${getBadgeColor(
            value as ENotificationType
          )}`}
        ></span>
        <span className="whitespace-nowrap">
          {getBadgeLabel(value as ENotificationType)}
        </span>
      </div>
    ),
  },
  {
    header: "Thời gian",
    accessor: "createdDate",
    render: (value: unknown) => (
      <span className="whitespace-nowrap">
        {DateFNSUtils.fromNow(new Date(value as number))}
      </span>
    ),
  },
];

// Hàm xác định màu của badge dựa trên loại thông báo (dùng arrow function)
const getBadgeColor = (type: ENotificationType): string => {
  switch (type) {
    case ENotificationType.LOGIN:
      return "bg-green-500 text-white"; // Màu xanh cho đăng nhập
    case ENotificationType.LOGOUT:
      return "bg-red-500 text-white"; // Màu đỏ cho đăng xuất
    case ENotificationType.DOING:
      return "bg-blue-500 text-white"; // Màu xanh da trời cho trạng thái đang thực hiện
    case ENotificationType.SCORING:
      return "bg-yellow-500 text-black"; // Màu vàng cho trạng thái chấm điểm
    default:
      return "bg-gray-500 text-white"; // Mặc định màu xám cho các trạng thái khác
  }
};

// Hàm xác định nhãn của badge dựa trên loại thông báo (dùng arrow function)
const getBadgeLabel = (type: ENotificationType): string => {
  switch (type) {
    case ENotificationType.LOGIN:
      return "Đăng nhập";
    case ENotificationType.LOGOUT:
      return "Đăng xuất";
    case ENotificationType.DOING:
      return "Đang làm";
    case ENotificationType.SCORING:
      return "Chấm điểm";
    default:
      return "Không xác định";
  }
};

const OverviewPage: React.FC<Props> = () => {
  const [notifications, setNotifications] = useState<
    INotification.BaseNotification[]
  >([]);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    FirebaseService.getSnapshot<INotification.BaseNotification>(
      "notifications",
      (data: INotification.BaseNotification[]) => {
        setNotifications(data);
      }
    );
  }, []);
  return (
    <>
      <Box className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-4 mb-4">
        <Card.StatictisCard />
        <Card.StatictisCard />
        <Card.StatictisCard />
        <Card.StatictisCard />
      </Box>
      <Box className="grid grid-cols-12">
        <Box className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6 w-full col-span-12">
          <Box className="flex items-center justify-between">
            <Heading className="mb-2 text-xl font-bold text-gray-900 ">
              Bảng xếp hạng
            </Heading>
            <Box className="flex justify-between">
              <DropdownCheckbox
                label="Lớp"
                id="type"
                options={[{ label: "test", value: 123 }]}
                onChangeValue={() => {}}
              />
              <DropdownCheckbox
                label="Đề"
                id="type"
                options={[{ label: "test", value: 123 }]}
                onChangeValue={() => {}}
                className="ml-2"
              />
            </Box>
          </Box>
          <div className="flex justify-around mt-4 px-10">
            <div className="flex flex-col  items-center justify-center">
              <p
                className={`  text-white h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center mb-4`}
              >
                1
              </p>
              <img
                src="https://picsum.photos/200/300"
                className="w-24 h-24 rounded-full"
              />
              <p className="text-lg font-bold">Test</p>
              <p className="text-gray-600 text-sm">100 điểm</p>
            </div>
            <div className="flex flex-col  items-center justify-center">
              <p
                className={`  text-white h-10 w-10 bg-primary-400 rounded-full flex items-center justify-center mb-4`}
              >
                1
              </p>
              <img
                src="https://picsum.photos/200/300"
                className="w-28 h-28 rounded-full"
              />
              <p className="text-lg font-bold">Test</p>
              <p className="text-gray-600 text-sm">100 điểm</p>
            </div>
            <div className="flex flex-col  items-center justify-center">
              <p
                className={`  text-white h-10 w-10 bg-primary-950 rounded-full flex items-center justify-center mb-4`}
              >
                1
              </p>
              <img
                src="https://picsum.photos/200/300"
                className="w-20 h-20 rounded-full"
              />
              <p className="text-lg font-bold">Test</p>
              <p className="text-gray-600 text-sm">100 điểm</p>
            </div>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">
            <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
              Statistics this month
            </h3>
            <div
              className="pt-4"
              id="faq"
              role="tabpanel"
              aria-labelledby="faq-tab"
            >
              <ul role="list" className="divide-y divide-gray-200">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                      <img
                        className="flex-shrink-0 w-10 h-10"
                        src="https://flowbite-admin-dashboard.vercel.app/images/products/iphone.png"
                        alt="imac image"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900 truncate">
                          iPhone 14 Pro
                        </p>
                        <div className="flex items-center justify-end flex-1 text-sm text-green-500">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              clipRule="evenodd"
                              fillRule="evenodd"
                              d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                            />
                          </svg>
                          2.5%
                          <span className="ml-2 text-gray-500">
                            vs last month
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      $445,467
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                      <img
                        className="flex-shrink-0 w-10 h-10"
                        src="https://flowbite-admin-dashboard.vercel.app/images/products/imac.png"
                        alt="imac image"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900 truncate">
                          Apple iMac 27"
                        </p>
                        <div className="flex items-center justify-end flex-1 text-sm text-green-500">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              clipRule="evenodd"
                              fillRule="evenodd"
                              d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                            />
                          </svg>
                          12.5%
                          <span className="ml-2 text-gray-500">
                            vs last month
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      $245,467
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Box>
      </Box>
      <Box className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6 mt-4">
        {/* Card header */}
        <Box className="items-center justify-between lg:flex mb-2">
          <Box className="mb-4 lg:mb-0">
            <Heading className="mb-2 text-xl font-bold text-gray-900 ">
              Thông tin gần đây
            </Heading>
          </Box>
        </Box>
        {/* Table */}
        <Table.GlobalTable
          columns={columns}
          data={notifications}
          page={page}
          setPage={setPage}
        ></Table.GlobalTable>
      </Box>
    </>
  );
};

export default OverviewPage;
