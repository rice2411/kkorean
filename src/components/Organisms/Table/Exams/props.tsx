import { IExam } from "@/interface";
import React, { RefObject } from "react";

interface PresenterProps {
  exams: IExam.BaseExam[];
  exam: IExam.BaseExam | null;
  uploadRef: RefObject<HTMLInputElement>;
  handleOpenWindowExplorer: (exam: IExam.BaseExam | null, type: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenModalExamPrevier: (exam: IExam.BaseExam | null) => void;
  handleDeleteExam: (data: IExam.BaseExam) => void;
}

export type { PresenterProps };
