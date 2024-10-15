const ApiUtils = {
    fetchAPI: async (
        url,
        {
            body,
            method = "POST",
            header = {
                "Content-Type": "application/json",
            },
        },
        isFormData = false
    ) => {
        try {
            const response = await fetch(url, {
                method: method,
                header: header,
                body: isFormData ? body : JSON.stringify(body),
            });
            return response;
        } catch (err) {
            return err;
        }
    },
};

export default ApiUtils;
