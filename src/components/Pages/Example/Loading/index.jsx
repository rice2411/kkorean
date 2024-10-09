import React from "react";
import { Spinner } from "@/components/Atoms";

const LoadingExample = () => {
    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Loading Example</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Spinner</h2>
                <Spinner />
            </div>
        </div>
    );
};

export default LoadingExample;
