import React from "react";
import {
  Label,
  Input,
  Button,
  Box,
} from "@/components/Atoms";
import { Modal } from "@/components/Organisms/";

// Định nghĩa kiểu cho props của LoginFormPresenter
interface IProps {
    data: {
        newPassword: string;
        confirmPassword: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
}

// Định nghĩa component LoginFormPresenter
const UpdatePasswordFormPresenter: React.FC<IProps> = ({
    data,
    handleChange,
    handleSubmit
}) => {
  return (
    <>
      <Box className="space-y-5">
        <Box className="sm:col-span-2">
          <Label htmlFor="new-password" text="Mật khẩu mới" required />
          <Input
            type="password"
            name="newPassword"
            placeholder="********"
            value={data?.newPassword}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
          />
        </Box>
        <Box className="sm:col-span-2">
          <Label htmlFor="fullName" text="Nhập lại mật khẩu" required />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={data.confirmPassword}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            status={data?.newPassword !== data?.confirmPassword && !!data?.confirmPassword && !!data.newPassword ? "error" : "default"}
            helperText={data?.newPassword !== data?.confirmPassword && !!data?.confirmPassword && !!data.newPassword ? "Mật khẩu nhập lại không chính xác!" : ""}
          />
        </Box>
        <Button
          onClick={handleSubmit}
          disabled={!data.newPassword || !data.confirmPassword || data?.newPassword !== data?.confirmPassword}
          className="w-full text-white bg-primary-700 hover:bg-primary-800 rounded-lg text-sm px-5 py-2.5"
        >
          Lưu
        </Button>
      </Box>
    </>
  );
};

export default UpdatePasswordFormPresenter;
