import { Box, Link, Image, Paragraph } from "@/components/Atoms";
import { useState } from "react";
import { Dropdown } from "@/components/Organisms";

function DashboardHeader({ setToggleSidebar }) {
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  return (
    <header className="antialiased">
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
        <Box className="flex flex-wrap justify-between items-center">
          <Box className="flex justify-start items-center">
            <Box
              id="toggleSidebar"
              aria-expanded="true"
              aria-controls="sidebar"
              className="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 "
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h14M1 6h14M1 11h7"
                />
              </svg>
            </Box>
            <Box
              onClick={() => {
                setToggleSidebar((state) => !state);
              }}
              type="button"
              aria-expanded="true"
              aria-controls="sidebar"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 "
            >
              <svg
                className="w-[18px] h-[18px]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
              <Paragraph className="sr-only">Toggle sidebar</Paragraph>
            </Box>
            <Link to="https://flowbite.com" className="flex mr-4">
              <Image
                src="https://flowbite.s3.amazonaws.com/logo.svg"
                className="mr-3 h-8"
                alt="FlowBite Logo"
              />
              <Paragraph className="self-center text-2xl font-semibold whitespace-nowrap ">
                Admin KKorean
              </Paragraph>
            </Link>
          </Box>
          <Box className="flex items-center lg:order-2">
            {/* Notification */}
            <Box
              onClick={() => {
                setIsOpenNotification((state) => !state);
                setIsOpenUserMenu(false);
              }}
              className="relative p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
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
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                9+
              </span>
            </Box>

            <Box
              className={`${
                !isOpenNotification && "hidden"
              } absolute overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded  shadow-lg top-7 right-16`}
              id="notification-dropdown"
            >
              <Box className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 ">
                Notifications
              </Box>
              <Box>
                <Link
                  href="#"
                  className="flex py-3 px-4 border-b hover:bg-gray-100 "
                >
                  <Box className="flex-shrink-0">
                    <Image
                      className="w-11 h-11 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                      alt="Bonnie Green avatar"
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
                      New message from
                      <Paragraph className="font-semibold text-gray-900 ">
                        Bonnie Green
                      </Paragraph>
                      : "Hey, what's up? All set for the presentation?"
                    </Box>
                    <Box className="text-xs font-medium text-primary-700 ">
                      a few moments ago
                    </Box>
                  </Box>
                </Link>
                <Link
                  href="#"
                  className="flex py-3 px-4 border-b hover:bg-gray-100 "
                >
                  <Box className="flex-shrink-0">
                    <Image
                      className="w-11 h-11 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                      alt="Jese Leos avatar"
                    />
                    <Box className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white ">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                      </svg>
                    </Box>
                  </Box>
                  <Box className="pl-3 w-full">
                    <Box className="text-gray-500 font-normal text-sm mb-1.5 ">
                      <Paragraph className="font-semibold text-gray-900 ">
                        Jese leos
                      </Paragraph>{" "}
                      and{" "}
                      <Paragraph className="font-medium text-gray-900 ">
                        5 others
                      </Paragraph>{" "}
                      started following you.
                    </Box>
                    <Box className="text-xs font-medium text-primary-700 ">
                      10 minutes ago
                    </Box>
                  </Box>
                </Link>
                <Link
                  href="#"
                  className="flex py-3 px-4 border-b hover:bg-gray-100 "
                >
                  <Box className="flex-shrink-0">
                    <Image
                      className="w-11 h-11 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                      alt="Joseph McFall avatar"
                    />
                    <Box className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white ">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        {" "}
                        <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />{" "}
                      </svg>
                    </Box>
                  </Box>
                  <Box className="pl-3 w-full">
                    <Box className="text-gray-500 font-normal text-sm mb-1.5 ">
                      <Paragraph className="font-semibold text-gray-900 ">
                        Joseph Mcfall
                      </Paragraph>{" "}
                      and{" "}
                      <Paragraph className="font-medium text-gray-900 ">
                        141 others
                      </Paragraph>{" "}
                      love your story. See it and view more stories.
                    </Box>
                    <Box className="text-xs font-medium text-primary-700 ">
                      44 minutes ago
                    </Box>
                  </Box>
                </Link>
                <Link
                  href="#"
                  className="flex py-3 px-4 border-b hover:bg-gray-100 "
                >
                  <Box className="flex-shrink-0">
                    <Image
                      className="w-11 h-11 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                      alt="Roberta Casas image"
                    />
                    <Box className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white ">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                      </svg>
                    </Box>
                  </Box>
                  <Box className="pl-3 w-full">
                    <Box className="text-gray-500 font-normal text-sm mb-1.5 ">
                      <Paragraph className="font-semibold text-gray-900 ">
                        Leslie Livingston
                      </Paragraph>{" "}
                      mentioned you in a comment:{" "}
                      <Paragraph className="font-medium text-primary-700 ">
                        @bonnie.green
                      </Paragraph>{" "}
                      what do you say?
                    </Box>
                    <Box className="text-xs font-medium text-primary-700 ">
                      1 hour ago
                    </Box>
                  </Box>
                </Link>
                <Link href="#" className="flex py-3 px-4 hover:bg-gray-100 ">
                  <Box className="flex-shrink-0">
                    <Image
                      className="w-11 h-11 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png"
                      alt="Robert image"
                    />
                    <Box className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white ">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 14"
                      >
                        <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
                      </svg>
                    </Box>
                  </Box>
                  <Box className="pl-3 w-full">
                    <Box className="text-gray-500 font-normal text-sm mb-1.5 ">
                      <Paragraph className="font-semibold text-gray-900 ">
                        Robert Brown
                      </Paragraph>{" "}
                      posted a new video: Glassmorphism - learn how to implement
                      the new design trend.
                    </Box>
                    <Box className="text-xs font-medium text-primary-700 ">
                      3 hours ago
                    </Box>
                  </Box>
                </Link>
              </Box>
            </Box>

            {/* Userdropdown */}
            <Dropdown.UserDropdown />
          </Box>
        </Box>
      </nav>
    </header>
  );
}

export default DashboardHeader;
