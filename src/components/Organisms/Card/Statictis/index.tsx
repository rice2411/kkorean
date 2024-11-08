import { Box, Heading, Paragraph } from "@/components/Atoms";

interface Props {
  title: string;
  count: number;
}

const StatictisCard: React.FC<Props> = ({ title, count }) => {
  return (
    <Box className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex sm:p-6">
      <Box className="w-full">
        <Heading level={3} className="text-base font-normal text-gray-500">
          {title}
        </Heading>

        <Box className="  text-base font-normal text-gray-500">
          <Paragraph className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl inline">
            {count}
          </Paragraph>{" "}
          dữ liệu
        </Box>
      </Box>
    </Box>
  );
};

export default StatictisCard;
