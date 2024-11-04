import { useId, useState } from "react";
import { Box, Paragraph, Image } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";
import { useNavigate } from "react-router-dom";

// Define the type for each link in the links array
interface LinkItem {
  to: string;
  text: string;
}

// Define the props for the HeaderMobile component
interface HeaderMobileProps {
  links: LinkItem[];
}

interface NavLinkProps {
  to?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
const NavLink: React.FC<NavLinkProps> = ({
  to = "#",
  children,
  className = "",
  onClick = null,
}) => {
  const navigate = useNavigate();
  return (
    <Box
      className={`${className} flex items-center border-b-2 border-transparent hover:border-primary-500 text-gray-500 hover:text-gray-700 cursor-pointer transition-all`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
        navigate(to);
      }}
    >
      {children}
    </Box>
  );
};

const HeaderMobile: React.FC<HeaderMobileProps> = ({ links }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Box
        className="cursor-pointer inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2"
        onClick={toggleMobileMenu}
      >
        <Paragraph className="sr-only">Open main menu</Paragraph>
        <Image
          src={FileHelpers.getLocalFile("menu", "svg")}
          className="h-5 w-5"
        />
      </Box>
      <Box
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } absolute top-14 left-0 w-full bg-white lg:hidden`}
      >
        <Box className="flex flex-col font-medium">
          {links.map((link) => (
            <NavLink
              key={useId()}
              to={link.to}
              className="text-secondary hover:text-blue-500 py-2 px-4 border-b"
            >
              {link.text}
            </NavLink>
          ))}
        </Box>
      </Box>
      <Box
        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
        id="mobile-menu-2"
      >
        <Box className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
          {links.map((link) => (
            <NavLink
              key={useId()}
              to={link.to}
              className="text-secondary hover:text-blue-500"
            >
              {link.text}
            </NavLink>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HeaderMobile;
