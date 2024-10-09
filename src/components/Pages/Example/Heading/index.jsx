// Example.js
import React from "react";
import { Heading } from "@/components/Atoms";

const HeadingExample = () => {
    return (
        <div className="p-4">
            <Heading level={1} className="text-blue-600">
                Tiêu đề Cấp 1
            </Heading>
            <Heading level={2} className="text-green-600">
                Tiêu đề Cấp 2
            </Heading>
            <Heading level={3} className="text-red-600">
                Tiêu đề Cấp 3
            </Heading>
            <Heading level={4} className="text-gray-600">
                Tiêu đề Cấp 4
            </Heading>
            <Heading level={5} className="text-purple-600">
                Tiêu đề Cấp 5
            </Heading>
            <Heading level={6} className="text-orange-600">
                Tiêu đề Cấp 6
            </Heading>
        </div>
    );
};

export default HeadingExample;
