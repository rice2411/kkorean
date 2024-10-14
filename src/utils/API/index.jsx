import Response from "../HTTP";

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
        return HttpUtils.Response.success(data);
      }
    } catch (err) {
      return HttpUtils.Response.error(err);
    }
  },
};

export default ApiUtils;
