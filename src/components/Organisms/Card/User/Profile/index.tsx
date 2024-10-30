import { Box, Heading, Image } from '@/components/Atoms';
import { UserProfile } from '@/interface/User';
import React from 'react';

interface ProfileCardProps {
  user: UserProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <Box className="mx-auto bg-white rounded-xl shadow-md overflow-hidden h-full xl:h-fit">
      <Box className="flex items-center p-6">
        <Image
          src={user?.imageSrc}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover mr-6"
        />
        <Box>
          <Heading level={2} className="text-xl font-bold text-gray-900">{user?.name}</Heading>
          <p className="text-gray-700">{user?.jobTitle}</p>
          <p className="flex items-center text-gray-500">
            <span className="material-icons-outlined text-sm mr-1">location_on</span>
            {user?.location}
          </p>
        </Box>
      </Box>
      <Box className="px-6 pb-6">
        <Box className="mt-4">
          <p className="text-gray-600 text-sm">Email address</p>
          <p className="text-gray-800 font-medium">{user?.email}</p>
        </Box>
        <Box className="mt-4">
          <p className="text-gray-600 text-sm">Home address</p>
          <p className="text-gray-800 font-medium">{user?.address}</p>
        </Box>
        <Box className="mt-4">
          <p className="text-gray-600 text-sm">Phone number</p>
          <p className="text-gray-800 font-medium">{user?.phone}</p>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCard;
