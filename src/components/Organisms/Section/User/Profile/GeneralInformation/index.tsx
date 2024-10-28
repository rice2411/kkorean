import { Box, Heading } from '@/components/Atoms';
import { IUser } from '@/interface';
import React from 'react';

interface GeneralInfoProps {
  user: IUser.UserProfile;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ user }) => {
  return (
    <Box className="mx-auto bg-white rounded-xl shadow-md p-6">
      <Heading level={2} className="text-2xl font-bold text-gray-900 mb-2">
        General Information
      </Heading>
      <Box className="text-gray-700 mb-6">
        <Heading level={4} className="text-md font-semibold mb-2">
          About me
        </Heading>
        <span
          dangerouslySetInnerHTML={{ __html: user?.aboutMe }}
          className="text-gray-600"
        />
      </Box>
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Box>
          <p className="text-gray-600 text-sm">Education</p>
          <p className="text-gray-800 font-medium">{user?.education}</p>
        </Box>
        <Box>
          <p className="text-gray-600 text-sm">Work History</p>
          <p className="text-gray-800 font-medium">{user?.workHistory.join(', ')}</p>
        </Box>
        <Box>
          <p className="text-gray-600 text-sm">Join Date</p>
          <p className="text-gray-800 font-medium">{user?.joinDate}</p>
        </Box>
        <Box>
          <p className="text-gray-600 text-sm">Languages</p>
          <p className="text-gray-800 font-medium">{user?.languages.join(', ')}</p>
        </Box>
        <Box>
          <p className="text-gray-600 text-sm">Organization</p>
          <p className="text-gray-800 font-medium">{user?.organization}</p>
        </Box>
        <Box>
          <p className="text-gray-600 text-sm">Role</p>
          <p className="text-gray-800 font-medium">{user?.role}</p>
        </Box>
        <Box>
          <p className="text-gray-600 text-sm">Department</p>
          <p className="text-gray-800 font-medium">{user?.department}</p>
        </Box>
        <Box>
          <p className="text-gray-600 text-sm">Birthday</p>
          <p className="text-gray-800 font-medium">{user?.birthday}</p>
        </Box>
      </Box>
    </Box>
  );
};

export default GeneralInfo;
