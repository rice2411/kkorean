import { Box, Image, Heading, Paragraph, Link } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";

function CTASection() {
    return (
        <section className="bg-white">
            <Box className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <Image
                    className="w-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
                    alt="dashboard image"
                />
                <Image
                    className="w-full hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
                    alt="dashboard image"
                />
                <Box className="mt-4 md:mt-0">
                    <Heading className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                        Let's create more tools and ideas that brings us
                        together.
                    </Heading>
                    <Paragraph className="mb-6 font-light text-gray-500 md:text-lg">
                        Flowbite helps you connect with friends and communities
                        of people who share your interests. Connecting with your
                        friends and family as well as discovering new ones is
                        easy with features like Groups.
                    </Paragraph>
                    <Link
                        to="#"
                        className="inline-flex items-center text-white bg-primary-700 bg-primary focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Get started
                        <Image
                            className="h-5 w-5 ml-2"
                            src={FileHelpers.getLocalFile(
                                "arrow-right-white",
                                "svg"
                            )}
                        />
                    </Link>
                </Box>
            </Box>
        </section>
    );
}

export default CTASection;
