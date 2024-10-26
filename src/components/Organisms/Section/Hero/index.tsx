import { Box, Heading, Image, Link, Paragraph } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";

function HeroSection() {
  return (
    <section className="">
      <Box className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-48 lg:px-12">
        <Link className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200">
          <Paragraph className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">
            New
          </Paragraph>
          <Paragraph className="text-sm font-medium">
            Flowbite is out! See what's new
          </Paragraph>
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
        <Heading className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          We invest in the world’s potential
        </Heading>
        <Paragraph className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 text-center">
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </Paragraph>
        <Box className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-400 hover:bg-primary-500 focus:ring-4 focus:ring-primary-300">
            Learn more
            <Image
              className="w-5 h-5 ml-2 -mr-1"
              src={FileHelpers.getLocalFile("arrow-right-white", "svg")}
            />
          </Link>
          <Link className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
            Watch video
          </Link>
        </Box>
      </Box>
    </section>
  );
}

export default HeroSection;
