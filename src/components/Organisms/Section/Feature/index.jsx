import { Box, Heading, Image, Paragraph } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";

function FeatureSection() {
    return (
        <section className="bg-white">
            <Box className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <Box className="max-w-screen-md mb-8 lg:mb-16">
                    <Heading className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                        Designed for business teams like yours
                    </Heading>
                    <Paragraph className="text-gray-500 sm:text-xl">
                        Here at Flowbite we focus on markets where technology,
                        innovation, and capital can unlock long-term value and
                        drive economic growth.
                    </Paragraph>
                </Box>
                <Box className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    <Box>
                        <Box className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
                            <Image
                                src={FileHelpers.getLocalFile("plan", "svg")}
                                className="w-6 h-6"
                            />
                        </Box>
                        <Heading className="mb-2 text-xl font-bold">
                            Marketing
                        </Heading>
                        <Paragraph className="text-gray-500">
                            Plan it, create it, launch it. Collaborate
                            seamlessly with all the organization and hit your
                            marketing goals every month with our marketing plan.
                        </Paragraph>
                    </Box>
                    <Box>
                        <Box className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
                            <Image
                                src={FileHelpers.getLocalFile(
                                    "education",
                                    "svg"
                                )}
                                className="w-6 h-6"
                            />
                        </Box>
                        <Heading className="mb-2 text-xl font-bold">
                            Legal
                        </Heading>
                        <Paragraph className="text-gray-500">
                            Protect your organization, devices and stay
                            compliant with our structured workflows and custom
                            permissions made for you.
                        </Paragraph>
                    </Box>
                    <Box>
                        <Box className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
                            <Image
                                src={FileHelpers.getLocalFile("job", "svg")}
                                className="w-6 h-6"
                            />
                        </Box>
                        <Heading className="mb-2 text-xl font-bold">
                            Business Automation
                        </Heading>
                        <Paragraph className="text-gray-500">
                            Auto-assign tasks, send Slack messages, and much
                            more. Now power up with hundreds of new templates to
                            help you get started.
                        </Paragraph>
                    </Box>
                    <Box>
                        <Box className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
                            <Image
                                src={FileHelpers.getLocalFile("dollar", "svg")}
                                className="w-6 h-6"
                            />
                        </Box>
                        <Heading className="mb-2 text-xl font-bold">
                            Finance
                        </Heading>
                        <Paragraph className="text-gray-500">
                            Audit-proof software built for critical financial
                            operations like month-end close and quarterly
                            budgeting.
                        </Paragraph>
                    </Box>
                    <Box>
                        <Box className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
                            <Image
                                src={FileHelpers.getLocalFile("stack", "svg")}
                                className="w-6 h-6"
                            />
                        </Box>
                        <Heading className="mb-2 text-xl font-bold">
                            Enterprise Design
                        </Heading>
                        <Paragraph className="text-gray-500">
                            Craft beautiful, delightful experiences for both
                            marketing and product with real cross-company
                            collaboration.
                        </Paragraph>
                    </Box>
                    <Box>
                        <Box className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
                            <svg
                                className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Box>
                        <Heading className="mb-2 text-xl font-bold">
                            Operations
                        </Heading>
                        <Paragraph className="text-gray-500">
                            Keep your company’s lights on with customizable,
                            iterative, and structured workflows built for all
                            efficient teams and inBoxidual.
                        </Paragraph>
                    </Box>
                </Box>
            </Box>
        </section>
    );
}

export default FeatureSection;
