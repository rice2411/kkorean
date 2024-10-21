import { Box, Heading, Paragraph } from "@/components/Atoms";

function StatictisCard() {
    return (
        <Box className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex sm:p-6">
            <Box className="w-full">
                <Heading
                    level={3}
                    className="text-base font-normal text-gray-500"
                >
                    New products
                </Heading>
                <Paragraph className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                    2,340
                </Paragraph>
                <Box className="flex items-center text-base font-normal text-gray-500">
                    <Paragraph className="flex items-center mr-1.5 text-sm text-green-500">
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
                    </Paragraph>
                    Since last month
                </Box>
            </Box>
        </Box>
    );
}

export default StatictisCard;
