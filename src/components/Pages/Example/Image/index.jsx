import { FileHelpers } from "@/helpers";
import { Image } from "@/components/Atoms";

const ImageExample = () => {
    return (
        <div>
            <div className="p-4 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Image Example</h1>

                <Image
                    src={FileHelpers.getLocalFile("bg-login", "jpg")}
                    alt="Một hình ảnh mẫu"
                    className="my-custom-class"
                    width="200px"
                    height="150px"
                    rounded={true}
                    onClick={() => alert("Hình ảnh được nhấn!")}
                />
            </div>
        </div>
    );
};

export default ImageExample;
