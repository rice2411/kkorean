import { Box } from "@/components/Atoms";
import { Card, Section } from "@/components/Organisms";
import { useIsVisible } from "@/hooks";
import { IUser } from "@/interface";
import React, { Suspense, useRef } from "react";

interface Props {
  user: IUser.UserProfile;
}
const UserProfile: React.FC<Props> = ({ user }) => {
  const sections = [
    {
      component: <Card.User.ProfileCard user={user} />,
      key: "profileAboutMe",
      class: "xl:col-span-4 !w-full",
    },
    {
      component: (
        <Section.UserSection.UserProfile.GeneralInformation user={user} />
      ),
      key: "generalInformation",
      class: "xl:col-span-6 !w-full",
    },
  ];

  const refs = sections.map(() => useRef<HTMLDivElement>(null));
  const visibility = refs.map((ref) => useIsVisible(ref));
  return (
    <Box className="w-full h-screen p-10 grid grid-cols-1 xl:grid-cols-10 gap-5">
      {sections.map((section, index) => (
        <Box
          key={section.key}
          ref={refs[index]}
          className={`transition-opacity ease-in duration-1000 ${
            visibility[index] ? "opacity-100" : "opacity-0"
          } ${section?.class}`}
        >
          {visibility[index] && (
            <Suspense fallback={<div>Loading...</div>}>
              {section.component}
            </Suspense>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default UserProfile;
