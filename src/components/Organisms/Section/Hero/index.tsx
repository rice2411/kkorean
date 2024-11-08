import {
  BlurryBubble,
  Box,
  Button,
  Heading,
  Image,
  Link,
  Paragraph,
} from "@/components/Atoms";
import { TypingAnimation } from "@/components/Molecules";
import { FileHelpers } from "@/helpers";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="my-auto">
      <Box className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
        <Box className="flex items-center justify-center mb-12">
          <Box className="relative group">
            <Box className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:200" />
            <Link className="relative inline-flex justify-between items-center py-1 px-1 pr-6 text-md text-gray-700 bg-gray-50 rounded-full group-hover:bg-white transition duration-200">
              <Paragraph className="text-sm bg-primary-400 rounded-full text-white px-6 py-1.5 mr-6">
                Go
              </Paragraph>
              <TypingAnimation></TypingAnimation>
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </Box>
        </Box>
        <Box className="relative">
          <Box className="absolute left-[calc(50%-4rem)]">
            <BlurryBubble
              color="#ffc8dd"
              h={"8rem"}
              w={"8rem"}
              position={{ top: 0, left: "-5rem" }}
            />
            <BlurryBubble
              color="#ccdbfd"
              h={"8rem"}
              w={"8rem"}
              position={{ top: 0, left: "5rem" }}
              animationDelay="animation-deplay-2000"
            />
            <BlurryBubble
              color="#c1ff9b"
              h={"8rem"}
              w={"8rem"}
              position={{ top: "5.5rem", left: 0 }}
              animationDelay="animation-deplay-4000"
            />
          </Box>
          <Heading className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
            Học tiếng Hàn cùng Kkorean nhé!
          </Heading>
        </Box>
        <Paragraph className="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 text-center">
          Chúng mình có rất nhiều bộ để để cải thiện kỹ năng nghe và đọc của bạn
          cho các đề thi TOPIK
        </Paragraph>
        <Box className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Button
            className="px-5 py-3"
            hover={true}
            onClick={() => {
              navigate("/exam");
            }}
          >
            Bắt đầu
            <Image
              className="w-5 h-5 ml-2 -mr-1"
              src={FileHelpers.getLocalFile("arrow-right-white", "svg")}
            />
          </Button>
        </Box>
      </Box>
    </section>
  );
}

export default HeroSection;
