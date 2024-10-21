import { Box, Input, Label, Button, Svg } from "@/components/Atoms";
import { MODAL_CONSTANTS } from "@/constants";
import { FileHelpers } from "@/helpers";
import { PresenterProps } from "./props";

const GroupsUpsertFormPresenter: React.FC<PresenterProps> = ({
    groupName,
    modalBlank,
    setGroupName,
    handleSubmit,
}) => {
    return (
        <>
            <Box className="grid gap-4 mb-4 sm:grid-cols-2">
                <Box className="sm:col-span-2">
                    <Label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 w-full"
                        text="Tên lớp"
                        required={true}
                    />
                    <Input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Tên lớp"
                        name="name"
                        value={groupName}
                        onChange={(e) => {
                            setGroupName(e.target.value);
                        }}
                    />
                </Box>
            </Box>
            <Button
                onClick={handleSubmit}
                disabled={!groupName}
                className="w-full text-white inline-flex items-center bg-primary-400 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
                {modalBlank.type === MODAL_CONSTANTS.EModalType.CREATE ? (
                    <>
                        <Svg
                            className="mr-1 -ml-1 w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            src={FileHelpers.getLocalFile("add", "path")}
                        ></Svg>
                        Tạo lớp
                    </>
                ) : (
                    "Lưu"
                )}
            </Button>
        </>
    );
};

export default GroupsUpsertFormPresenter;
