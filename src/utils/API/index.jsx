import Response from "../HTTP/response";

const ApiUtils = {
  fetchAdminAPI: async (url, payload) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        return Response.success(data);
      }
    } catch (err) {
      return Response.error(err);
    }
  },
};

export default ApiUtils;
