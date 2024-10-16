import { Box, Input, Label, Select, Button, Svg } from "@/components/Atoms";
import { MODAL_CONSTANTS } from "@/constants";
import { FileHelpers } from "@/helpers";

interface User {
    fullName: string;
    email: string;
    group: string;
}

interface GroupOption {
    label: string;
    value: string;
}

interface UsersUpsertFormPresenterProps {
    user: User;
    modalBlank: {
        type: string;
    };
    groupOption: GroupOption[];
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    handleSubmit: () => Promise<void>; // Assuming handleSubmit returns a promise
}

function UsersUpsertFormPresenter({
    user,
    modalBlank,
    groupOption,
    handleChange,
    handleSubmit,
}: UsersUpsertFormPresenterProps) {
    return (
        <>
            <Box className="grid gap-4 mb-4 sm:grid-cols-2">
                <Box className="sm:col-span-2">
                    <Label htmlFor="fullName" text="Họ và tên" required />
                    <Input
                        type="text"
                        name="fullName"
                        placeholder="Họ và tên"
                        value={user.fullName}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                    />
                </Box>
                <Box className="sm:col-span-2">
                    <Label htmlFor="email" text="Tài khoản" required />
                    <Input
                        disabled={
                            modalBlank.type ===
                            MODAL_CONSTANTS.MODAL_TYPE.UPDATE
                        }
                        type="text"
                        name="email"
                        placeholder="Tài khoản"
                        value={user.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                    />
                </Box>
                <Box className="sm:col-span-2">
                    <Label htmlFor="group" text="Lớp" required />
                    <Select
                        name="group"
                        value={user.group}
                        onChange={handleChange}
                        options={groupOption}
                        placeholder={"Vui lòng chọn"}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                    />
                </Box>
            </Box>
            <Button
                onClick={handleSubmit}
                disabled={
                    !user.email || !user.fullName || user.group === "default"
                }
                className="w-full text-white bg-primary-700 hover:bg-primary-800 rounded-lg text-sm px-5 py-2.5"
            >
                {modalBlank.type === MODAL_CONSTANTS.MODAL_TYPE.CREATE ? (
                    <>
                        <Svg
                            className="mr-1 -ml-1 w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            src={FileHelpers.getLocalFile("add", "path")}
                        />
                        Tạo tài khoản
                    </>
                ) : (
                    "Lưu"
                )}
            </Button>
        </>
    );
}

export default UsersUpsertFormPresenter;
