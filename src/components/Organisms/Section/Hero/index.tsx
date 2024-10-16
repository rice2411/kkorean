import { Box, Heading, Image, Link, Paragraph } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";

function HeroSection() {
    return (
        <section className="bg-white">
            <Box className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <Box className="mr-auto place-self-center lg:col-span-7">
                    <Heading className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                        Payments tool for software companies
                    </Heading>
                    <Paragraph className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                        From checkout to global sales tax compliance, companies
                        around the world use Flowbite to simplify their payment
                        stack.
                    </Paragraph>
                    <Link className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 ">
                        Get started
                        <Image
                            className="w-5 h-5 ml-2 -mr-1"
                            src={FileHelpers.getLocalFile(
                                "arrow-right-white",
                                "svg"
                            )}
                        />
                    </Link>
                    <a
                        href="#"
                        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
                    >
                        Speak to Sales
                    </a>
                </Box>
                <Box className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                        alt="mockup"
                    />
                </Box>
            </Box>
        </section>
    );
}

export default HeroSection;
