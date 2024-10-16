import { IGroup } from "@/interface";

interface PresenterProps {
  groups: IGroup.BaseGroup[];
  handleOpenModalModifier: (type: number, data?: IGroup.BaseGroup) => void;
  handleDeleteGroup: (group: IGroup.BaseGroup) => void;
}

export type { PresenterProps };
