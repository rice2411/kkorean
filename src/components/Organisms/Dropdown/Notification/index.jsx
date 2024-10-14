import { Box, Image, Link } from "@/components/Atoms";
import { DOMHelpers } from "@/helpers";
import { useClickOutside, useLoading } from "@/hooks";
import { NotificationService } from "@/services";
import firebaseService from "@/services/Firebase";
import DateFNSUtils from "@/utils/DateFNS";

import { useEffect, useRef, useState } from "react";

function NotificationDropdown() {
    const { showLoading, hideLoading } = useLoading();
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unReadNotifications, setUnReadNotification] = useState([]);
    const [countUnReadNotifications, setCountUnReadNotifications] = useState(0);
    const dropdownRef = useRef();
    const parentRef = useRef();

    useEffect(() => {
        showLoading();
        firebaseService.getSnapshot("notifications", (data) => {
            setNotifications(data);
            const unReadNoti = data.filter((item) => !item.isRead);
            setUnReadNotification(unReadNoti);
            setCountUnReadNotifications(unReadNoti.length);
            hideLoading();
        });
    }, []);

    const handleClickOutside = async () => {
        setCountUnReadNotifications(0);
        setIsOpenNotification(false);
        if (isOpenNotification && countUnReadNotifications > 0) {
            const updatedData = unReadNotifications.map((item) => ({
                ...item,
                isRead: true,
            }));
            await NotificationService.updateMultiple(updatedData);
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
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 14 20"
                >
                    <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                </svg>
                {/* Notification badge */}
                {countUnReadNotifications > 0 && (
                    <span className="absolute select-none top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {countUnReadNotifications}
                    </span>
                )}
            </Box>

            <Box
                ref={dropdownRef}
                className={`${
                    !isOpenNotification && "hidden"
                } absolute overflow-hidden z-50 my-4 max-w-sm text-base  list-none bg-white rounded  shadow-lg top-7 right-16`}
                id="notification-dropdown"
            >
                <Box className="block  py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 ">
                    Thông báo
                </Box>
                <Box className="max-h-[538px] overflow-y-auto">
                    {notifications
                        .sort((a, b) => b.createdDate - a.createdDate)
                        .map((noti, index) => (
                            <Link
                                key={noti.id}
                                href="#"
                                className="flex py-3 px-4 border-b hover:bg-gray-100 relative select-none"
                            >
                                <Box className="flex-shrink-0">
                                    <Image
                                        className="w-11 h-11 rounded-full"
                                        src={`https://picsum.photos/200/300?random=${index}`}
                                    />
                                    <Box className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 ">
                                        <svg
                                            className="w-2 h-2 text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 18 18"
                                        >
                                            <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                                            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                                        </svg>
                                    </Box>
                                </Box>
                                <Box className="pl-3 w-full">
                                    <Box className="text-gray-500 font-normal text-sm mb-1.5 ">
                                        {DOMHelpers.stringHTML2JSX(
                                            noti.message
                                        )}
                                    </Box>
                                    <Box className="text-xs font-medium text-primary-700 ">
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
