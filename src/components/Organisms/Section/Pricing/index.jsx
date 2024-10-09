import { Box, Heading, Image, Link, Paragraph } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";

function PricingSection() {
    return (
        <section className="bg-white">
            <Box className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <Box className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <Heading className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                        Designed for business teams like yours
                    </Heading>
                    <Paragraph className="mb-5 font-light text-gray-500 sm:text-xl ">
                        Here at Flowbite we focus on markets where technology,
                        innovation, and capital can unlock long-term value and
                        drive economic growth.
                    </Paragraph>
                </Box>
                <Box className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {/* Pricing Card */}
                    <Box className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow ">
                        <Heading className="mb-4 text-2xl font-semibold">
                            Starter
                        </Heading>
                        <Paragraph className="font-light text-gray-500 sm:text-lg ">
                            Best option for personal use &amp; for your next
                            project.
                        </Paragraph>
                        <Box className="flex justify-center items-baseline my-8">
                            <Paragraph className="mr-2 text-5xl font-extrabold">
                                $29
                            </Paragraph>
                            <Paragraph className="text-gray-500 ">
                                /month
                            </Paragraph>
                        </Box>
                        {/* List */}
                        <Box role="list" className="mb-8 space-y-4 text-left">
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Paragraph>InBoxidual configuration</Paragraph>
                            </Box>
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Paragraph>No setup, or hidden fees</Paragraph>
                            </Box>
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Box>
                                    Team size:{" "}
                                    <Paragraph className="font-semibold inline">
                                        1 developer
                                    </Paragraph>
                                </Box>
                            </Box>
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Box>
                                    Premium support:{" "}
                                    <Paragraph className="font-semibold inline">
                                        6 months
                                    </Paragraph>
                                </Box>
                            </Box>
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Box>
                                    Free updates:{" "}
                                    <Paragraph className="font-semibold inline">
                                        6 months
                                    </Paragraph>
                                </Box>
                            </Box>
                        </Box>
                        <Link
                            to="#"
                            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                            Get started
                        </Link>
                    </Box>
                    {/* Pricing Card */}
                    <Box className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow ">
                        <Heading className="mb-4 text-2xl font-semibold">
                            Company
                        </Heading>
                        <p className="font-light text-gray-500 sm:text-lg ">
                            Relevant for multiple users, extended &amp; premium
                            support.
                        </p>
                        <Box className="flex justify-center items-baseline my-8">
                            <Paragraph className="mr-2 text-5xl font-extrabold">
                                $99
                            </Paragraph>
                            <Paragraph className="text-gray-500 ">
                                /month
                            </Paragraph>
                        </Box>
                        {/* List */}
                        <Box role="list" className="mb-8 space-y-4 text-left">
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Paragraph>InBoxidual configuration</Paragraph>
                            </Box>
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Paragraph>No setup, or hidden fees</Paragraph>
                            </Box>
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Box>
                                    Team size:{" "}
                                    <Paragraph className="font-semibold inline">
                                        10 developers
                                    </Paragraph>
                                </Box>
                            </Box>
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Box>
                                    Premium support:{" "}
                                    <Paragraph className="font-semibold inline">
                                        24 months
                                    </Paragraph>
                                </Box>
                            </Box>
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Box>
                                    Free updates:{" "}
                                    <Paragraph className="font-semibold inline">
                                        24 months
                                    </Paragraph>
                                </Box>
                            </Box>
                        </Box>
                        <Link
                            to="#"
                            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                            Get started
                        </Link>
                    </Box>
                    {/* Pricing Card */}
                    <Box className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow ">
                        <Heading className="mb-4 text-2xl font-semibold">
                            Enterprise
                        </Heading>
                        <Paragraph className="font-light text-gray-500 sm:text-lg text-center">
                            Best for large scale uses and extended
                            redistribution rights.
                        </Paragraph>
                        <Box className="flex justify-center items-baseline my-8">
                            <Paragraph className="mr-2 text-5xl font-extrabold">
                                $499
                            </Paragraph>
                            <Paragraph className="text-gray-500 ">
                                /month
                            </Paragraph>
                        </Box>
                        {/* List */}
                        <Box role="list" className="mb-8 space-y-4 text-left">
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Paragraph>InBoxidual configuration</Paragraph>
                            </Box>
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Paragraph>No setup, or hidden fees</Paragraph>
                            </Box>
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Box>
                                    Team size:{" "}
                                    <Paragraph className="font-semibold inline">
                                        100+ developers
                                    </Paragraph>
                                </Box>
                            </Box>
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Box>
                                    Premium support:{" "}
                                    <Paragraph className="font-semibold inline">
                                        36 months
                                    </Paragraph>
                                </Box>
                            </Box>
                            <Box className="flex items-center space-x-3">
                                {/* Icon */}
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "tick",
                                        "svg"
                                    )}
                                    className="h-5 w-5"
                                />
                                <Box>
                                    Free updates:{" "}
                                    <Paragraph className="font-semibold inline">
                                        36 months
                                    </Paragraph>
                                </Box>
                            </Box>
                        </Box>
                        <Link
                            to="#"
                            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                            Get started
                        </Link>
                    </Box>
                </Box>
            </Box>
        </section>
    );
}

export default PricingSection;
