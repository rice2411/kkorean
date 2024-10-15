import { Box, Svg } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";

function Empty() {
    return (
        <Box className="flex items-center justify-center w-full h-full mt-5">
            <div className="grid gap-4 w-60">
                <Svg
                    className="mx-auto"
                    width="154"
                    height="161"
                    viewBox="0 0 154 161"
                    fill="none"
                    src={FileHelpers.getLocalFile("empty", "path")}
                ></Svg>
                <div>
                    <h2 className="text-center text-black text-base font-semibold leading-relaxed pb-1">
                        Không có dữ liệu
                    </h2>
                    <p className="text-center text-black text-sm font-normal leading-snug pb-4">
                        Hãy thử lại
                    </p>
                </div>
            </div>
        </Box>
    );
}

export default Empty;
