import { ExamsAPI, GroupsAPI, UsersAPI } from "@/apis";
import { AvatarName, Box, Heading, Paragraph } from "@/components/Atoms";
import { Card } from "@/components/Organisms";
import { DropdownCheckbox } from "@/components/Organisms/Dropdown";
import { Activitytable } from "@/components/Organisms/Table";
import { useLoading } from "@/hooks";
import { IContext, IExam, IGroup, IUser } from "@/interface";
import { useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";
import { IFilterOptions } from "../../Exam/List/props";
import { Empty } from "@/components/Molecules";
import TopItem from "./topItem";

const OverviewPage = () => {
  const counter = useLoaderData() as unknown as number[];
  const { showLoading, hideLoading } =
    useLoading() as unknown as IContext.ILoadingContext.UseLoadingReturnType;

  const [exams, setExams] = useState<IExam.BaseExam[]>([]);
  const [groups, setGroups] = useState<IGroup.BaseGroup[]>([]);
  const [users, setUsers] = useState<IUser.DetailedUser[]>([]);
  const [filterOptions, setFilterOptions] = useState<IFilterOptions[]>([
    { id: "exam", data: [] },
    { id: "group", data: [] },
  ]);

  const fetchFilterData = async () => {
    showLoading();
    const response = await Promise.all([
      ExamsAPI.getList(),
      GroupsAPI.getList(),
      UsersAPI.getList(),
    ]);
    if (response[0] && response[1] && response[2]) {
      setExams(response[0] as IExam.BaseExam[]);
      setGroups(response[1] as IGroup.BaseGroup[]);
      setUsers(
        (response[2] as IUser.DetailedUser[]).sort((a, b) => {
          return (
            b?.completedExams?.length || 0 - a?.completedExams?.length || 0
          );
        })
      );
    }
    try {
    } catch (err) {
      console.log(err);
    } finally {
      hideLoading();
    }
  };

  const handleOnChangeValue = (data: IFilterOptions) => {
    setFilterOptions((prev) =>
      prev.map((option) => (option.id === data.id ? data : option))
    );
  };

  useEffect(() => {
    fetchFilterData();
  }, []);

  const calculateTotalScore = (user: IUser.DetailedUser): string => {
    if (filterOptions[0].data.length > 0) {
      return `${user.completedExams
        .filter((exam) => filterOptions[0].data.includes(exam.examId))
        .reduce((total, exam) => total + exam.score, 0)}  điểm/ ${
        user.completedExams.filter((exam) =>
          filterOptions[0].data.includes(exam.examId)
        ).length
      } đề`;
    }

    return `${
      user.completedExams?.reduce((total, exam) => total + exam.score, 0) || 0
    }  điểm/ ${user.completedExams?.length || 0} đề`;
  };

  const filteredUsers = users.filter((user) => {
    const isGroup =
      filterOptions[1].data.length > 0
        ? filterOptions[1].data.filter((item) => item === user.group).length > 0
        : true;
    const isExam =
      filterOptions[0].data.length > 0
        ? user.completedExams?.filter((exam) =>
            filterOptions[0].data.includes(exam.examId)
          ).length > 0
        : true;
    return isGroup && isExam;
  });

  return (
    <>
      <Box className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-4 mb-4">
        <Card.StatictisCard title="Học viên" count={counter[0]} />
        <Card.StatictisCard title="Bộ đề" count={counter[1]} />
        <Card.StatictisCard title="Lớp" count={counter[2]} />
        <Card.StatictisCard title="Kết quả" count={counter[3]} />
      </Box>
      <Activitytable />
      <Box className="grid grid-cols-12 mt-4">
        <Box className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-6 w-full col-span-12">
          <Box className="flex items-center ">
            <Heading className="mb-2 text-xl font-bold text-gray-900 ">
              Bảng xếp hạng
            </Heading>
            <Box className="flex justify-between ml-4">
              <DropdownCheckbox
                label="Lớp"
                id="group"
                options={groups.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                onChangeValue={handleOnChangeValue}
              />
              <DropdownCheckbox
                label="Đề"
                id="exam"
                options={exams.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                onChangeValue={handleOnChangeValue}
                className="ml-2"
              />
            </Box>
          </Box>
          <Box className="flex flex-col md:flex-row justify-between lg:justify-around mt-4 ">
            <TopItem
              user={filteredUsers[0]}
              calculateTotalScore={calculateTotalScore}
              title="Top 1"
              rank={1}
            />
            <TopItem
              user={filteredUsers[1]}
              calculateTotalScore={calculateTotalScore}
              title="Top 2"
              rank={2}
            />
            <TopItem
              user={filteredUsers[2]}
              calculateTotalScore={calculateTotalScore}
              title="Top 3"
              rank={3}
            />
          </Box>
          <Box className="p-4 bg-white  rounded-lg shadow-sm sm:p-6">
            <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
              Các vị trí khác
            </h3>
            <Box className="pt-4">
              <ul role="list" className="divide-y divide-gray-200">
                {filteredUsers.slice(3).length > 0 ? (
                  filteredUsers.slice(3).map((user, index) => (
                    <li className="py-3 sm:py-4">
                      <Box className="flex items-center justify-between">
                        <Box className="flex items-center min-w-1">
                          <Paragraph className="mr-2">{index + 4}</Paragraph>
                          <AvatarName name={user.fullName} size={10} />
                          <Box className="ml-3">
                            <Paragraph className=" text-gray-900 truncate font-bold">
                              {user.fullName}
                            </Paragraph>
                            <Box className="flex items-center justify-end flex-1 text-sm ">
                              {user.email}
                            </Box>
                          </Box>
                        </Box>
                        <Box className="inline-flex items-center text-base font-semibold text-gray-900">
                          {calculateTotalScore(user)}
                        </Box>
                      </Box>
                    </li>
                  ))
                ) : (
                  <Empty />
                )}
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OverviewPage;
