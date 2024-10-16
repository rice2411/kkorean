const DOMHelpers = {
    stringHTML2JSX: (htmlString: string): JSX.Element => {
        return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
    },
};

export default DOMHelpers;
