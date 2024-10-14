import Response from "@/utils/HTTP";
import firebaseService from "../Firebase";

const key = "users";

const UserService = {
  getList: async () => {
    try {
      const response = await firebaseService.getDocuments(key);

      if (response.data) {
        return response.data;
      }
      if (response.err) {
        return response.err;
      }
    } catch (err) {
      return err;
    }
  },
  create: async (data) => {
    try {
      const response = await firebaseService.register(data);
      if (response.data) {
        return response;
      }
      if (response.err) {
        return response.err;
      }
    } catch (err) {
      return err;
    }
  },
  update: async (data) => {
    try {
      const response = await firebaseService.updateDocument(key, data);
      if (response.data) {
        return response;
      }
      if (response.err) {
        return response.err;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  delete: async (data) => {
    try {
      const request = [
        firebaseService.deleteDocument(key, data),
        firebaseService.deleteAccountByEmail(data),
      ];
      const response = await Promise.all(request);
      if (response[0].data && response[1].data) {
        return HttpUtils.Response.success("ok");
      }
      if (response.err) {
        return response.err;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  resetAccountPassword: async (data) => {
    try {
      const response = await firebaseService.resetAccountPassword(data);
      if (response.data) {
        return HttpUtils.Response.success("ok");
      }
      if (response.err) {
        return response.err;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  updateAccountStatus: async (data, disabled) => {
    try {
      const response = await firebaseService.updateAccountStatus(
        data,
        disabled
      );
      if (response.data) {
        return HttpUtils.Response.success("ok");
      }
      if (response.err) {
        return response.err;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
export default UserService;
