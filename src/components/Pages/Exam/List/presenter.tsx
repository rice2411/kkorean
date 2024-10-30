import { Box, Heading, Image, Input, Paragraph } from "@/components/Atoms";
import { Section } from "@/components/Organisms";
import { ExamCard } from "@/components/Organisms/Card";
import { DropdownCheckbox } from "@/components/Organisms/Dropdown";
import { FileHelpers } from "@/helpers";
import { useAuth } from "@/hooks";
import { IContext, IExam } from "@/interface";
import { ExamUtils } from "@/utils";
import { IFilterOptions } from "./props";
import React from "react";
import { Empty } from "@/components/Molecules";

interface Props {
  filteredExams: IExam.BaseExam[];
  setSearchContent: (value: string) => void;
  handleOnChangeValue: (data: IFilterOptions) => void;
  handleStartExam: (exam: IExam.BaseExam) => void;
}

const ExamListPagePresenter: React.FC<Props> = ({
  filteredExams,
  setSearchContent,
  handleOnChangeValue,
  handleStartExam,
}) => {
  const { user } =
    useAuth() as unknown as IContext.IAuthContenxt.UseAuthReturnType;
  return (
    <section className="py-20 px-4 mx-auto max-w-screen-xl  lg:px-12">
      <Heading level={2}>Chào bạn!</Heading>
      {!user && (
        <Paragraph className="text-xs italic">
          Vui lòng đăng nhập để lưu lại kết quả
        </Paragraph>
      )}
      <Section.Progress.ExamProgress />
      <Box className="mt-4">
        <Box className="flex items-center flex-wrap w-auto">
          <Input
            onChange={(e) => setSearchContent(e.target.value.toLowerCase())}
            icon={FileHelpers.getLocalFile("search", "svg")}
            type="text"
            placeholder="Tìm kiếm đề"
            className="bg-gray-50 border h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block  pl-10"
          />
          <Box className="flex mt-4 gap-2">
            <DropdownCheckbox
              label="Loại đề"
              id="type"
              options={ExamUtils.getListOptionsType()}
              onChangeValue={handleOnChangeValue}
            />
            <DropdownCheckbox
              label="Cấp độ"
              id="level"
              options={ExamUtils.getListOptionsLevel()}
              onChangeValue={handleOnChangeValue}
            />
            <DropdownCheckbox
              label="Hình thức"
              id="plan"
              options={ExamUtils.getListOptionsPlan()}
              onChangeValue={handleOnChangeValue}
            />
          </Box>
        </Box>
        <Box className="mt-4">
          <Box className="flex items-center">
            <Box className="flex items-center text-xs">
              <Image
                className="h-4 w-4 mr-1"
                src={FileHelpers.getLocalFile("book", "svg")}
              />
              {filteredExams.length} bộ đề
            </Box>
            <Box className="flex items-center text-xs ml-2">
              <Image
                className="h-4 w-4 mr-1"
                src={FileHelpers.getLocalFile("clock", "svg")}
              />
              {1.5 * filteredExams.length} giờ
            </Box>
          </Box>
        </Box>
        <Box className="mt-4 border border-stone-300 rounded-md">
          {!filteredExams.length && <Empty />}
          {filteredExams.length > 0 &&
            filteredExams.map((exam) => (
              <ExamCard exam={exam} key={exam.id} onClick={handleStartExam} />
            ))}
        </Box>
      </Box>
    </section>
  );
};

export default ExamListPagePresenter;
