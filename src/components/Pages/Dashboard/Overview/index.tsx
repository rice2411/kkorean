import { Box } from "@/components/Atoms";
import { Card, Table } from "@/components/Organisms";
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
        <span className="whitespace-nowrap">{getBadgeLabel(value as ENotificationType)}</span>
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
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6 ">
        {/* Card header */}
        <div className="items-center justify-between lg:flex mb-2">
          <div className="mb-4 lg:mb-0">
            <h3 className="mb-2 text-xl font-bold text-gray-900 ">
                Thông tin gần đây
            </h3>
          </div>
        </div>
        {/* Table */}
        <Table.GlobalTable
          columns={columns}
          data={notifications}
          page={page}
          setPage={setPage}
        ></Table.GlobalTable>
      </div>
    </>
  );
};

export default OverviewPage;
