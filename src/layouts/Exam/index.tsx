import { useDocumentTitle } from "@/hooks";
import AppProvider from "../provider";
import { Outlet } from "react-router-dom";
import { Modal } from "@/components/Organisms";

function ExamLayout() {
  useDocumentTitle("Kiểm tra");
  return (
    <>
      <AppProvider>
        <Outlet />
        <Modal.ConfirmModal />
      </AppProvider>
    </>
  );
}

export default ExamLayout;
