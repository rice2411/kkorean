import { Box, Heading, Image, Input, Paragraph } from "@/components/Atoms";
import { Badge, ProgressBar } from "@/components/Molecules";
import { DropdownCheckbox } from "@/components/Organisms/Dropdown";
import { FileHelpers } from "@/helpers";
import { ExamUtils } from "@/utils";

function ExamListPage() {
  const handleOnChagneValue = (value: any) => {
    console.log(value);
  };
  return (
    <>
      <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-12">
        <Heading level={2}>Welcome back!</Heading>
        <Box className="grid grid-cols-3 gap-20 border border-stone-300 rounded-md p-4 mt-8">
          <Box>
            Đề nghe
            <ProgressBar
              percentage={30}
              color="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            />
            22
            <Paragraph className="inline text-xs text-gray-500">
              /176 completed
            </Paragraph>
          </Box>
          <Box>
            Đề đọc
            <ProgressBar
              percentage={30}
              color="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
            />
            233
            <Paragraph className="inline text-xs text-gray-500">
              /176 completed
            </Paragraph>
          </Box>
          <Box>
            Khác
            <ProgressBar
              percentage={0}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
            />
            233
            <Paragraph className="inline text-xs text-gray-500">
              /176 completed
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
                89 bộ đề
              </Box>
              <Box className="flex items-center text-xs ml-2">
                <Image
                  className="h-4 w-4 mr-1"
                  src={FileHelpers.getLocalFile("clock", "svg")}
                />
                130 giờ
              </Box>
            </Box>
          </Box>
          <Box className="mt-4 border border-stone-300 rounded-md">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <Box className="grid grid-cols-12 gap-4 p-3 border-b border-stone-300 hover:bg-gray-100 cursor-pointer">
                  <Box className="col-span-1 flex items-center justify-center">
                    {index === 0 && (
                      <Box className="h-9 w-9 rounded-full bg-gray-200"></Box>
                    )}
                    {index === 1 && (
                      <Image
                        className="h-9 w-9 "
                        src={FileHelpers.getLocalFile("complete-green", "svg")}
                      />
                    )}
                    {index >= 2 && (
                      <Box className="h-9 w-9 bg-primary-600 rounded-full flex items-center justify-center">
                        <Image
                          className="h-5 w-5"
                          src={FileHelpers.getLocalFile("lock", "svg")}
                        />
                      </Box>
                    )}
                  </Box>
                  <Box className="col-span-10 ">
                    <Heading level={6}>Bộ đề 1</Heading>
                    <Paragraph className="text-xs text-gray-500">
                      Đề này dễ vl
                    </Paragraph>
                    <Box className="flex mt-2">
                      <Box className="flex items-center justify-center">
                        <Image
                          className="h-3 w-3 mr-2"
                          src={FileHelpers.getLocalFile("fire", "svg")}
                        />
                        <Paragraph className="text-xs text-primary-500">
                          Dễ
                        </Paragraph>
                      </Box>
                      <Box className="flex items-center justify-center ml-4">
                        <Badge text="Nghe" color="green" />
                      </Box>
                      <Box className="flex items-center justify-center ml-4">
                        <Image
                          className="h-3 w-3 mr-2 text-gray-300"
                          src={FileHelpers.getLocalFile("complete", "svg")}
                        />
                        <Paragraph className="text-xs text-gray-500">
                          37100 completed
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
