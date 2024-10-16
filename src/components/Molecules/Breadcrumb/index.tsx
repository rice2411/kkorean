import { Box, Link, Svg } from "@/components/Atoms";
import { FileHelpers, StringHelpers } from "@/helpers";
import { useId } from "react";

interface BreadCrumbProps {
    data: string[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ data }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <Box className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <Box className="inline-flex items-center">
                    <Link className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                        <Svg
                            className="w-3 h-3 me-2.5"
                            viewBox="0 0 20 20"
                            src={FileHelpers.getLocalFile("home", "path")}
                        />
                        {StringHelpers.capitalizeFirstChar(data[0])}
                    </Link>
                </Box>
                {data.map((item, index) => {
                    if (index !== 0) {
                        return (
                            <Box key={useId()}>
                                <div className="flex items-center">
                                    <Svg
                                        className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                        src={FileHelpers.getLocalFile(
                                            "left-arrow",
                                            "path"
                                        )}
                                    />
                                    <Link className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">
                                        {StringHelpers.capitalizeFirstChar(
                                            item
                                        )}
                                    </Link>
                                </div>
                            </Box>
                        );
                    }
                    return null; // Thêm return null nếu không có gì được render
                })}
            </Box>
        </nav>
    );
};

export default BreadCrumb;
