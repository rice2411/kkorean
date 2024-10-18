import { NotificationsAPI } from "@/apis";
import { Box, Image, Link, Svg } from "@/components/Atoms";
import { DOMHelpers, FileHelpers } from "@/helpers";
import { useClickOutside, useLoading } from "@/hooks";
import { IContext, INotification } from "@/interface";
import FirebaseService from "@/services/Firebase";
import DateFNSUtils from "@/utils/DateFNS";

import { useEffect, useRef, useState } from "react";

function NotificationDropdown() {
    const { showLoading, hideLoading } =
        useLoading() as IContext.ILoadingContext.UseLoadingReturnType;
    const [isOpenNotification, setIsOpenNotification] =
        useState<boolean>(false);
    const [notifications, setNotifications] = useState<
        INotification.BaseNotification[]
    >([]);
    const [unReadNotifications, setUnReadNotification] = useState<
        INotification.BaseNotification[]
    >([]);
    const [countUnReadNotifications, setCountUnReadNotifications] =
        useState<number>(0);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        showLoading();
        FirebaseService.getSnapshot<INotification.BaseNotification>(
            "notifications",
            (data: INotification.BaseNotification[]) => {
                setNotifications(data);
                const unReadNoti: INotification.BaseNotification[] =
                    data.filter(
                        (item: INotification.BaseNotification) => !item.isRead
                    );
                setUnReadNotification(unReadNoti);
                hideLoading();
            }
        );
        setCountUnReadNotifications(unReadNotifications.length);
    }, []);

    const handleClickOutside = async () => {
        setCountUnReadNotifications(0);
        setIsOpenNotification(false);
        if (isOpenNotification && countUnReadNotifications > 0) {
            const updatedData = unReadNotifications.map((item) => ({
                ...item,
                isRead: true,
            }));
            await NotificationsAPI.updateMultiple(updatedData);
        }
    };

    useClickOutside(parentRef, dropdownRef, handleClickOutside);

    return (
        <>
            <Box
                ref={parentRef}
                onClick={() => {
                    setIsOpenNotification((state) => !state);
                }}
                className="relative select-none p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
            >
                <Svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 14 20"
                    src={FileHelpers.getLocalFile("bell", "path")}
                />
                {/* Notification badge */}
                {countUnReadNotifications > 0 && (
                    <span className="absolute select-none top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {countUnReadNotifications > 9
                            ? "9+"
                            : countUnReadNotifications}
                    </span>
                )}
            </Box>

            <Box
                ref={dropdownRef}
                className={`${
                    !isOpenNotification && "hidden"
                } absolute overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded shadow-lg top-7 right-16`}
                id="notification-dropdown"
            >
                <Box className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50">
                    Thông báo
                </Box>
                <Box className="max-h-[538px] overflow-y-auto">
                    {notifications
                        .sort((a, b) => b.createdDate - a.createdDate)
                        .map((noti, index) => (
                            <Link
                                key={noti.id}
                                className="flex py-3 px-4 border-b hover:bg-gray-100 relative select-none"
                            >
                                <Box className="flex-shrink-0">
                                    <Image
                                        className="w-11 h-11 rounded-full"
                                        src={`https://picsum.photos/200/300?random=${index}`}
                                    />
                                    <Box className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700">
                                        <Svg
                                            className="w-2 h-2 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 18 18"
                                            src={FileHelpers.getLocalFile(
                                                "message",
                                                "path"
                                            )}
                                        ></Svg>
                                    </Box>
                                </Box>
                                <Box className="pl-3 w-full">
                                    <Box className="text-gray-500 font-normal text-sm mb-1.5">
                                        {DOMHelpers.stringHTML2JSX(
                                            noti.message
                                        )}
                                    </Box>
                                    <Box className="text-xs font-medium text-primary-700">
                                        {DateFNSUtils.fromNow(noti.createdDate)}
                                    </Box>
                                </Box>
                                {!noti.isRead && (
                                    <Box className="h-4 w-4 rounded-full px-2 mt-5 ml-2 bg-primary-500"></Box>
                                )}
                            </Link>
                        ))}
                </Box>
            </Box>
        </>
    );
}

export default NotificationDropdown;
