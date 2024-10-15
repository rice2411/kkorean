const DOMHelpers = {
    stringHTML2JSX: (string) => {
        return <div dangerouslySetInnerHTML={{ __html: string }} />;
    },
};
export default DOMHelpers;
