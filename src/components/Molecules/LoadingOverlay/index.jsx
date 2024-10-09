import { Spinner } from "@/components/Atoms";

const LoadingOverlay = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
        <Spinner />
    </div>
);

export default LoadingOverlay;
