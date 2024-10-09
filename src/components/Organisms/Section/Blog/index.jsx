import { Box, Heading, Image, Link, Paragraph } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";

function BlogSection() {
    return (
        <section className="bg-white">
            <Box className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <Box className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <Heading className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">
                        Our Blog
                    </Heading>
                    <Paragraph className="font-light text-gray-500 sm:text-xl">
                        We use an agile approach to test assumptions and connect
                        with the needs of your audience early and often.
                    </Paragraph>
                </Box>
                <Box className="grid gap-8 lg:grid-cols-2">
                    <Box className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                        <Box className="flex justify-between items-center mb-5 text-gray-500">
                            <Paragraph className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                                <Image
                                    src={FileHelpers.getLocalFile(
                                        "recording",
                                        "svg"
                                    )}
                                    className="mr-1 w-3 h-3"
                                />
                                Tutorial
                            </Paragraph>
                            <Paragraph className="text-sm">
                                14 days ago
                            </Paragraph>
                        </Box>
                        <Heading className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                            How to quickly deploy a static website
                        </Heading>
                        <Paragraph className="mb-5 font-light text-gray-500">
                            Static websites are now used to bootstrap lots of
                            websites and are becoming the basis for a variety of
                            tools that even influence both web designers and
                            developers.
                        </Paragraph>
                        <Box className="flex justify-between items-center">
                            <Box className="flex items-center space-x-4">
                                <Image
                                    className="w-7 h-7 rounded-full"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                    alt="Jese Leos avatar"
                                />
                                <Paragraph className="font-medium">
                                    Jese Leos
                                </Paragraph>
                            </Box>
                            <Link
                                to="#"
                                className="inline-flex items-center font-medium text-primary-600 hover:underline"
                            >
                                Read more
                                <Image
                                    className="w-4 h-4 ml-2"
                                    src={FileHelpers.getLocalFile(
                                        "arrow-right-blue",
                                        "svg"
                                    )}
                                />
                            </Link>
                        </Box>
                    </Box>
                    <Box className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                        <Box className="flex justify-between items-center mb-5 text-gray-500">
                            <Paragraph className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                                <Image
                                    className="mr-1 w-3 h-3"
                                    src={FileHelpers.getLocalFile(
                                        "newspaper",
                                        "svg"
                                    )}
                                />
                                Article
                            </Paragraph>
                            <Paragraph className="text-sm">
                                14 days ago
                            </Paragraph>
                        </Box>
                        <Heading className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                            Our first project with React
                        </Heading>
                        <Paragraph className="mb-5 font-light text-gray-500">
                            Static websites are now used to bootstrap lots of
                            websites and are becoming the basis for a variety of
                            tools that even influence both web designers and
                            developers.
                        </Paragraph>
                        <Box className="flex justify-between items-center">
                            <Box className="flex items-center space-x-4">
                                <Image
                                    className="w-7 h-7 rounded-full"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                    alt="Bonnie Green avatar"
                                />
                                <Paragraph className="font-medium">
                                    Bonnie Green
                                </Paragraph>
                            </Box>
                            <Link
                                to="#"
                                className="inline-flex items-center font-medium text-primary-600 hover:underline"
                            >
                                Read more
                                <Image
                                    className="w-4 h-4 ml-2"
                                    src={FileHelpers.getLocalFile(
                                        "arrow-right-blue",
                                        "svg"
                                    )}
                                />
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    );
}

export default BlogSection;
