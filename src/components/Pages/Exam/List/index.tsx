import { Box, Heading, Image, Input, Paragraph, Svg } from "@/components/Atoms";
import { Badge, ProgressBar } from "@/components/Molecules";
import { DropdownCheckbox } from "@/components/Organisms/Dropdown";
import { EExamPlan, EExamType } from "@/constants/exam";
import { FileHelpers } from "@/helpers";
import { useAuth } from "@/hooks";
import { IContext, IExam } from "@/interface";
import { ExamUtils } from "@/utils";
import { useLoaderData } from "react-router-dom";

function ExamListPage() {
  const exams = useLoaderData() as unknown as IExam.BaseExam[];
  const { user } =
    useAuth() as unknown as IContext.IAuthContenxt.UseAuthReturnType;
  const handleOnChagneValue = (value: any) => {
    console.log(value);
  };

  const calculatePercentage = (type: EExamType) => {
    const count =
      exams.filter(
        (exam) =>
          JSON.stringify(user?.completedExams)?.includes(exam.id) &&
          exam.type === type
      ).length || 0;
    return Math.round(
      (count * 100) / exams.filter((exam) => exam.type === type).length
    );
  };
  return (
    <>
      <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-12">
        <Heading level={2}>Welcome back!</Heading>
        <Box className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-20 border border-stone-300 rounded-md p-4 mt-8">
          <Box>
            Đề nghe
            <ProgressBar
              percentage={calculatePercentage(EExamType.LISTENING)}
              color="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            />
            0
            <Paragraph className="inline text-xs text-gray-500">
              /
              {exams.filter((exam) => exam.type === EExamType.LISTENING).length}{" "}
              đã hoàn thành
            </Paragraph>
          </Box>
          <Box>
            Đề đọc
            <ProgressBar
              percentage={calculatePercentage(EExamType.READING)}
              color="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
            />
            0
            <Paragraph className="inline text-xs text-gray-500">
              / {exams.filter((exam) => exam.type === EExamType.READING).length}{" "}
              đã hoàn thành
            </Paragraph>
          </Box>
          <Box>
            Khác
            <ProgressBar
              percentage={100}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
            />
            0
            <Paragraph className="inline text-xs text-gray-500">
              /0 đã hoàn thành
            </Paragraph>
          </Box>
        </Box>
        <Box className="mt-4">
          <Box className="flex items-center ">
            <Input
              icon={FileHelpers.getLocalFile("search", "svg")}
              type="text"
              placeholder="Tìm kiếm đề"
              className="bg-gray-50 border h-8   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10"
            />
            <DropdownCheckbox
              label="Loại đề"
              options={ExamUtils.getListOptionsType()}
              onChangeValue={handleOnChagneValue}
            />
            <DropdownCheckbox
              label="Cấp độ"
              options={ExamUtils.getListOptionsLevel()}
              onChangeValue={handleOnChagneValue}
            />
            <DropdownCheckbox
              label="Hình thức"
              options={ExamUtils.getListOptionsPlan()}
              onChangeValue={handleOnChagneValue}
            />
          </Box>
          <Box className="mt-4">
            <Box className="flex items-center">
              <Box className="flex items-center text-xs">
                <Image
                  className="h-4 w-4 mr-1"
                  src={FileHelpers.getLocalFile("book", "svg")}
                />
                {exams.length} bộ đề
              </Box>
              <Box className="flex items-center text-xs ml-2">
                <Image
                  className="h-4 w-4 mr-1"
                  src={FileHelpers.getLocalFile("clock", "svg")}
                />
                {1.5 * exams.length} giờ
              </Box>
            </Box>
          </Box>
          <Box className="mt-4 border border-stone-300 rounded-md">
            {exams.map((exam) => (
              <Box
                key={exam.id}
                className="grid grid-cols-12 gap-4 p-3 border-b border-stone-300 hover:bg-gray-100 cursor-pointer"
              >
                <Box className="col-span-1 flex items-center justify-center">
                  {JSON.stringify(user?.completedExams)?.includes(exam.id) && (
                    <Image
                      className="h-9 w-9 "
                      src={FileHelpers.getLocalFile("complete-green", "svg")}
                    />
                  )}
                  {exam.plan === EExamPlan.PAID && !user ? (
                    <Box className="h-9 w-9 bg-primary-600 rounded-full flex items-center justify-center">
                      <Image
                        className="h-5 w-5"
                        src={FileHelpers.getLocalFile("lock", "svg")}
                      />
                    </Box>
                  ) : JSON.stringify(user?.completedExams)?.includes(
                      exam.id
                    ) ? (
                    <Image
                      className="h-9 w-9 "
                      src={FileHelpers.getLocalFile("complete-green", "svg")}
                    />
                  ) : (
                    <Box className="h-9 w-9 rounded-full bg-gray-200"></Box>
                  )}
                </Box>
                <Box className="col-span-10 ">
                  <Heading level={6}>{exam.name}</Heading>
                  <Paragraph className="text-xs text-gray-500">
                    {exam.description}
                  </Paragraph>
                  <Box className="flex mt-2">
                    <Box className="flex items-center justify-center">
                      <Image
                        className="h-3 w-3 mr-2"
                        src={FileHelpers.getLocalFile("fire", "svg")}
                      />
                      <Paragraph
                        className={`text-xs text-${ExamUtils.getLevelColor(
                          exam.level as number
                        )}-500`}
                      >
                        {ExamUtils.getExamLevel(exam.level as number)}
                      </Paragraph>
                    </Box>
                    <Box className="flex items-center justify-center ml-4">
                      <Badge
                        text={
                          ExamUtils.getExamType(exam.type as number) as string
                        }
                        color={ExamUtils.getTypeColor(exam.type as number)}
                      />
                    </Box>
                    <Box className="flex items-center justify-center ml-4">
                      <Image
                        className="h-3 w-3 mr-2 text-gray-300"
                        src={FileHelpers.getLocalFile("complete", "svg")}
                      />
                      <Paragraph className="text-xs text-gray-500">
                        {exam.completedTime} đã hoàn thành
                      </Paragraph>
                    </Box>
                  </Box>
                </Box>
                <Box className="col-span-1 flex items-center justify-center">
                  <Image
                    className="h-5 w-5 "
                    src={FileHelpers.getLocalFile("arrow-right", "svg")}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </section>
    </>
  );
}

export default ExamListPage;
