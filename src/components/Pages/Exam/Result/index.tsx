import { useLocation } from "react-router-dom";
import { IExam, IResult } from "@/interface";
import { EExamMode } from "@/constants/exam";
import { ExamTemplate } from "@/components/Templates";
import { useEffect, useState } from "react";
import { ExamsAPI } from "@/apis";
import { emit } from "process";

function ExamResultPage() {
  const location = useLocation();
  const result = location.state as IResult.BaseResult;

  const [exam, setExam] = useState<IExam.BaseExam | null>(null);

  const fetchExam = async () => {
    try {
      const response = (await ExamsAPI.get(result.examId)) as IExam.BaseExam;
      if (response.id) {
        setExam(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExam();
  }, []);

  return (
    <>
      {exam && (
        <ExamTemplate
          mode={EExamMode.RESULT}
          exam={exam as IExam.BaseExam}
          result={result}
        />
      )}
    </>
  );
}

export default ExamResultPage;
