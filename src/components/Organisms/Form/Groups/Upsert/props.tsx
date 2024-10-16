import { IContext } from "@/interface";

interface PresenterProps {
  groupName: string;
  modalBlank: IContext.IModalContext.ModalState;
  setGroupName: (name: string) => void;
  handleSubmit: () => void;
}

interface Props {
  handleModiferModalSuccess: (modal: IContext.IModalContext.ModalState) => void;
  handleModiferModalBlank: (modal: IContext.IModalContext.ModalState) => void;
  modalBlank: IContext.IModalContext.ModalState;
}

export type { Props, PresenterProps };
