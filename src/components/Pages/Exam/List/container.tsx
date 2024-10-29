import { IContext, IExam } from "@/interface";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IFilterOptions } from "./props";
import ExamListPagePresenter from "./presenter";
import { useModal } from "@/hooks";
import { useNavigate } from "react-router-dom";

function ExamListPageContainer() {
    const navigate = useNavigate();

    const exams = useLoaderData() as unknown as IExam.BaseExam[];
    const { handleModiferModalConfirm } =
        useModal() as unknown as IContext.IModalContext.UseModalReturnType;

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

    const onCloseModalConfirm = () => {
        handleModiferModalConfirm({
            isOpen: false,
        });
    };

    const handleStartExam = (data: IExam.BaseExam) => {
        handleModiferModalConfirm({
            isOpen: true,
            text: `Bạn có muốn bắt đầu làm <b>${data.name}</b> với thời gian <b>60 phút</b>`,
            okButton: {
                text: "Bắt đầu",
                onClick: () => {
                    onCloseModalConfirm();
                    navigate("doing", { state: data });
                },
            },
            cancelButton: {
                text: "Hủy",
                onClick: onCloseModalConfirm,
            },
        });
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
        <ExamListPagePresenter
            filteredExams={filteredExams}
            setSearchContent={setSearchContent}
            handleOnChangeValue={handleOnChangeValue}
            handleStartExam={handleStartExam}
        />
    );
}

export default ExamListPageContainer;
