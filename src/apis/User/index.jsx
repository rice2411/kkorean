import { FirebaseService } from "@/services";

const key = "users";

const UsersAPI = {
  getList: async () => {
    try {
      const response = await FirebaseService.getDocuments(key);

      if (response.data) {
        return response.data;
      }
      if (response.error) {
        return response.error;
      }
    } catch (err) {
      return err;
    }
  },
  create: async (data) => {
    try {
      const response = await FirebaseService.register(data);
      if (response.data) {
        return response;
      }
      if (response.error) {
        return response.error;
      }
    } catch (err) {
      return err;
    }
  },
  update: async (data) => {
    try {
      const response = await FirebaseService.updateDocument(key, data);
      if (response.data) {
        return response;
      }
      if (response.error) {
        return response.error;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  delete: async (data) => {
    try {
      const request = [
        FirebaseService.deleteDocument(key, data),
        FirebaseService.deleteAccountByEmail(data),
      ];
      const response = await Promise.all(request);
      if (response[0].data && response[1].data) {
        return response;
      }
      if (response.error) {
        return response.error;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  resetAccountPassword: async (data) => {
    try {
      const response = await FirebaseService.resetAccountPassword(data);
      if (response.data) {
        return HttpUtils.Response.success("ok");
      }
      if (response.error) {
        return response.error;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  updateAccountStatus: async (data, disabled) => {
    try {
      const response = await FirebaseService.updateAccountStatus(
        data,
        disabled
      );
      if (response.data) {
        return HttpUtils.Response.success("ok");
      }
      if (response.error) {
        return response.error;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
export default UsersAPI;
