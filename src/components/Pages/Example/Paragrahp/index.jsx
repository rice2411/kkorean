// ParagraphExample.js
import React from "react";
import { Paragraph } from "@/components/Atoms";

const ParagraphExample = () => {
    return (
        <div className="p-4">
            <Paragraph className="text-blue-600">
                Đây là một đoạn văn mẫu với màu sắc xanh lam.
            </Paragraph>
            <Paragraph className="text-green-600" align="center">
                Đây là một đoạn văn mẫu với màu sắc xanh lá và căn giữa.
            </Paragraph>
            <Paragraph className="text-red-600" align="right">
                Đây là một đoạn văn mẫu với màu sắc đỏ và căn phải.
            </Paragraph>
            <Paragraph className="text-gray-600" align="justify">
                Đây là một đoạn văn mẫu với màu sắc xám và căn đều. Nó có thể
                dài hơn một chút để thể hiện rõ cách căn chỉnh justify.
            </Paragraph>
            <Paragraph className="text-purple-600">
                Đây là một đoạn văn mẫu với màu sắc tím.
            </Paragraph>
            <Paragraph className="text-orange-600" align="left">
                Đây là một đoạn văn mẫu với màu sắc cam và căn trái.
            </Paragraph>
        </div>
    );
};

export default ParagraphExample;
