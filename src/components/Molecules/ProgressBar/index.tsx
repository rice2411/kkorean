import { Box, Paragraph } from "@/components/Atoms";

interface Props {
  percentage: number;
  color?: string;
}

const ProgressBar: React.FC<Props> = ({ percentage, color }) => {
  return (
    <Box className="flex items-center">
      <Box className=" w-full bg-gray-200 rounded-full h-2.5">
        <Box
          className={`bg-blue-600 h-2.5 rounded-full ${color}`}
          style={{ width: percentage + "%" }}
        ></Box>
      </Box>
      <Paragraph className="ml-2 font-bold">{percentage}%</Paragraph>
    </Box>
  );
};

export default ProgressBar;
