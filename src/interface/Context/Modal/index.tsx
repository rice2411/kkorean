interface UseModalReturnType {
  modalBlank: ModalState;
  modalConfirm: ModalState;
  modalSuccess: ModalState;
  modalImportantConfirm: ModalState;
  handleModiferModalSuccess: (param: ModalState) => void;
  handleModiferModalConfirm: (param: ModalState) => void;
  handleModiferModalBlank: (param: ModalState) => void;
  handleModiferModalImportantConfirm: (param: ModalState) => void;
}
interface Button {
  text: string;
  onClick?: () => void | null | Promise<void>;
}

interface ModalState {
  isOpen?: boolean;
  title?: string | null;
  text?: string;
  okButton?: Button;
  cancelButton?: Button;
  confirmData?: string;
  type?: number;
  defaultData?: any | null;
}

export type { UseModalReturnType, ModalState };
