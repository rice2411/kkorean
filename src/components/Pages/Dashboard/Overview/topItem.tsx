import { AvatarName, Box, Paragraph } from "@/components/Atoms";
import { IUser } from "@/interface";

interface Props {
  user: IUser.DetailedUser;
  title: string;
  rank: number;
  calculateTotalScore: (user: IUser.DetailedUser) => string;
}

const TopItem: React.FC<Props> = ({
  user,
  title,
  rank,
  calculateTotalScore,
}) => {
  const getColorRank = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-orange-400";
      case 2:
        return "text-gray-500";
      case 3:
        return "text-yellow-950";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Box className="flex flex-col  items-center justify-center mt-4 md:mt-0">
      <Paragraph
        className={`  getColorRank ${getColorRank(
          rank
        )} text-xl font-bold flex items-center justify-center mb-4`}
      >
        {title}
      </Paragraph>
      {user ? (
        <>
          <AvatarName name={user.fullName} size={14} />
          <p className="text-lg font-bold">{user.fullName}</p>
          <p className="text-md md:block hidden">{user.email}</p>
          <p className="text-gray-600 text-sm">{calculateTotalScore(user)}</p>
        </>
      ) : (
        <>Không có dữ liệu</>
      )}
    </Box>
  );
};

export default TopItem;
