import { Paragraph, Spinner } from "@/components/Atoms";

const LoadingOverlay = ({ loadingText }) => (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-700 bg-opacity-50 z-50">
        <Spinner />
        <br />
        {loadingText && (
            <Paragraph className="text-white">{loadingText}</Paragraph>
        )}
    </div>
);

export default LoadingOverlay;
