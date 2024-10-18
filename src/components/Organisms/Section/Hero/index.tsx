import { Box, Heading, Image, Link, Paragraph } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";

function HeroSection() {
    return (
        <Box className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <Box className="mr-auto place-self-center lg:col-span-6">
                <Heading className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                    Xin chào, Mình là Kkorean
                </Heading>
                <Paragraph className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                    Thông qua các bài tập, bài giảng kĩ năng Tiếng Hàn của bạn
                    sẽ được cải thiện nhanh chóng
                </Paragraph>
                <Link className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-400 hover:bg-primary-500 focus:ring-4 focus:ring-primary-300 ">
                    Bắt đầu
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
                    Tư vấn
                </a>
            </Box>
            <Box className="hidden lg:mt-0 lg:col-span-6 lg:flex lg:justify-center">
                <Image
                    src={FileHelpers.getLocalFile("illustration", "svg")}
                    alt="mockup"
                />
            </Box>
        </Box>
    );
}

export default HeroSection;
