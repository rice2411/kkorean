const stringHTML2JSX = (string) => {
  return <div dangerouslySetInnerHTML={{ __html: string }} />;
};

export { stringHTML2JSX };
