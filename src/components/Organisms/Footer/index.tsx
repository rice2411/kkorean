import { Box, Image, Link, Paragraph } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";

function Footer() {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10">
      <Box className="mx-auto max-w-screen-2xl">
        <Link
          to="#"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900"
        >
          {/* LOGO */}
          <Image
            src={FileHelpers.getLocalFile("logo", "png")}
            className="h-32"
            alt="kkorean logo"
          />
        </Link>
        <Paragraph className="my-6 text-gray-500" align="center">
          Open-source library of over 400+ web components and interactive
          elements built for better web.
        </Paragraph>
        <Box className="flex flex-wrap justify-center items-center mb-6 text-gray-900">
          <Link to="#" className="mr-4 hover:underline md:mr-6 ">
            About
          </Link>
          <Link to="#" className="mr-4 hover:underline md:mr-6">
            Premium
          </Link>
          <Link to="#" className="mr-4 hover:underline md:mr-6 ">
            Campaigns
          </Link>
          <Link to="#" className="mr-4 hover:underline md:mr-6">
            Blog
          </Link>
          <Link to="#" className="mr-4 hover:underline md:mr-6">
            Affiliate Program
          </Link>
          <Link to="#" className="mr-4 hover:underline md:mr-6">
            FAQs
          </Link>
          <Link to="#" className="mr-4 hover:underline md:mr-6">
            Contact
          </Link>
        </Box>
        <Box className="text-sm text-gray-500 sm:text-center">
          Bản quyền thuộc © 2024{" "}
          <Link to="#" className="hover:underline">
            Rice™
          </Link>
        </Box>
      </Box>
    </footer>
  );
}

export default Footer;
