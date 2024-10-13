import {
    ButtonExample,
    InputExample,
    SelectExample,
    CheckboxExample,
    RadioExample,
    ToggleExample,
    FormExample,
    HeadingExample,
    LinkExample,
    LoadingExample,
    ParagraphExample,
    ImageExample,
    HorizontalRuleExample,
    TooltipExample,
} from "@/components/Pages/Example";
import { DocumentUILayout } from "@/layouts";
import { Navigate } from "react-router-dom";

const DocumentUIRouter = {
    element: <DocumentUILayout />,
    path: "/DocumentUI",
    children: [
        {
            path: "",
            element: <Navigate to="Button" replace />,
        },
        {
            path: "Button",
            element: <ButtonExample />,
        },
        {
            path: "Input",
            element: <InputExample />,
        },
        {
            path: "Select",
            element: <SelectExample />,
        },
        {
            path: "Checkbox",
            element: <CheckboxExample />,
        },
        {
            path: "Radio",
            element: <RadioExample />,
        },
        {
            path: "Toggle",
            element: <ToggleExample />,
        },
        {
            path: "Form",
            element: <FormExample />,
        },
        {
            path: "Heading",
            element: <HeadingExample />,
        },
        {
            path: "Link",
            element: <LinkExample />,
        },
        {
            path: "Loading",
            element: <LoadingExample />,
        },
        {
            path: "Paragrahp",
            element: <ParagraphExample />,
        },
        {
            path: "Image",
            element: <ImageExample />,
        },
        {
            path: "HorizontalRule",
            element: <HorizontalRuleExample />,
        },
        {
            path: "Tooltip",
            element: <TooltipExample />,
        },
    ],
};

export default DocumentUIRouter;
