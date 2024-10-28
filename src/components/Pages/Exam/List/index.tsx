import { Box, Heading, Image, Input } from "@/components/Atoms";
import { Section } from "@/components/Organisms";
import { ExamCard } from "@/components/Organisms/Card";
import { DropdownCheckbox } from "@/components/Organisms/Dropdown";
import { FileHelpers } from "@/helpers";
import { IExam } from "@/interface";
import { ExamUtils } from "@/utils";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

interface IFilterOptions {
    id: string;
    data: string[];
}

function ExamListPage() {
    const exams = useLoaderData() as unknown as IExam.BaseExam[];

    const [filteredExams, setFilteredExams] = useState<IExam.BaseExam[]>(exams);
    const [searchContent, setSearchContent] = useState<string>("");
    const [filterOptions, setFilterOptions] = useState<IFilterOptions[]>([
        { id: "type", data: [] },
        { id: "level", data: [] },
        { id: "plan", data: [] },
    ]);

    const handleOnChangeValue = (data: IFilterOptions) => {
        setFilterOptions((prev) =>
            prev.map((option) => (option.id === data.id ? data : option))
        );
    };

    useEffect(() => {
        const filtered = exams.filter((exam) => {
            const matchesSearch = exam.name
                .toLowerCase()
                .includes(searchContent);
            const matchesType = filterOptions.find(
                (option) => option.id === "type"
            )?.data.length
                ? filterOptions
                      .find((option) => option.id === "type")!
                      .data.includes(exam.type.toString())
                : true;
            const matchesPlan = filterOptions.find(
                (option) => option.id === "plan"
            )?.data.length
                ? filterOptions
                      .find((option) => option.id === "plan")!
                      .data.includes(exam.plan.toString())
                : true;
            const matchesLevel = filterOptions.find(
                (option) => option.id === "level"
            )?.data.length
                ? filterOptions
                      .find((option) => option.id === "level")!
                      .data.includes(exam.level.toString())
                : true;

            return matchesSearch && matchesType && matchesPlan && matchesLevel;
        });
        setFilteredExams(filtered);
    }, [searchContent, filterOptions, exams]);

    return (
        <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-12">
            <Heading level={2}>Welcome back!</Heading>
            <Section.Progress.ExamProgress />
            <Box className="mt-4">
                <Box className="flex items-center">
                    <Input
                        onChange={(e) =>
                            setSearchContent(e.target.value.toLowerCase())
                        }
                        icon={FileHelpers.getLocalFile("search", "svg")}
                        type="text"
                        placeholder="Tìm kiếm đề"
                        className="bg-gray-50 border h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10"
                    />
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
                    {filteredExams.map((exam) => (
                        <ExamCard exam={exam} key={exam.id} />
                    ))}
                </Box>
            </Box>
        </section>
    );
}

export default ExamListPage;
