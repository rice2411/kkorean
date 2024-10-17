import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { HTTP_CONSTANTS } from "@/constants";
import { CONFIG_CONSTANTS } from "@/constants";
import { auth, route } from "./config";
import { FirebaseService } from "..";
import { IAPI, IFirebase, IUser } from "@/interface";
import { ApiUtils } from "@/utils";

// Define the AuthService
const AuthService = {
  register: async (
    user: IUser.UserRequest
  ): Promise<IAPI.ApiResponse<IUser.DetailedUser | unknown>> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        CONFIG_CONSTANTS.DEFAULT_PASSWORD
      );
      const newUser = userCredential.user;
      const result = {
        ...user,
        createdAt: new Date(),
        isDisabled: 0,
        role: CONFIG_CONSTANTS.EUserRole.USER,
      };
      await FirebaseService.createDocument("users", result, newUser.uid);

      return ApiUtils.Response.success({ ...result, id: newUser.uid });
    } catch (err) {
      return ApiUtils.Response.error(err);
    }
  },

  login: async (
    data: IFirebase.LoginPayload
  ): Promise<IAPI.ApiResponse<IUser.BaseUser | unknown>> => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const { user } = res;
      const userDoc = (await FirebaseService.getDocumentById<IUser.BaseUser>(
        "users",
        user.uid
      )) as IAPI.ApiResponse<IUser.BaseUser>;

      const result: IUser.BaseUser = {
        id: user.uid,
        email: user.email || "",
        role: userDoc?.data?.role || 0,
        fullName: userDoc?.data?.fullName || "",
      };
      return ApiUtils.Response.success(result, "Đăng nhập thành công");
    } catch (err) {
      return ApiUtils.Response.error(
        err,
        "Lỗi đăng nhập",
        HTTP_CONSTANTS.EHttpStatusCode.BAD_REQUEST
      );
    }
  },

  logout: async (): Promise<IAPI.ApiResponse<unknown>> => {
    try {
      const res = await signOut(auth);
      return ApiUtils.Response.success(res, "Đăng xuất thành công");
    } catch (err) {
      return ApiUtils.Response.error(
        err,
        "Lỗi đăng xuất",
        HTTP_CONSTANTS.EHttpStatusCode.BAD_REQUEST
      );
    }
  },

  resetAccountPassword: async (user: {
    id: string;
  }): Promise<IAPI.ApiResponse> => {
    const { id } = user;
    try {
      const response = (await ApiUtils.fetchAPI(route.adminApi, {
        body: {
          id,
          newPassword: CONFIG_CONSTANTS.DEFAULT_PASSWORD,
          api: "resetAccountPassword",
        },
      })) as Response;

      if (response.ok) {
        const data = await response.json();
        return ApiUtils.Response.success(data);
      }
      return ApiUtils.Response.error(response);
    } catch (error) {
      return ApiUtils.Response.error(error);
    }
  },

  updateAccountStatus: async (
    user: IUser.BaseUser,
    disabled: boolean
  ): Promise<IAPI.ApiResponse> => {
    const { id } = user;
    try {
      const response = (await ApiUtils.fetchAPI(route.adminApi, {
        body: {
          id,
          disabled,
          api: "updateAccountStatus",
        },
      })) as Response;
      if (response.ok) {
        const data = await response.json();

        return ApiUtils.Response.success(data);
      }
      return ApiUtils.Response.error(response);
    } catch (error) {
      return ApiUtils.Response.error(error);
    }
  },

  deleteAccountByEmail: async (user: {
    email: string;
  }): Promise<IAPI.ApiResponse> => {
    const { email } = user;
    try {
      const response = (await ApiUtils.fetchAPI(route.adminApi, {
        body: {
          email,
          api: "deleteAccountByEmail",
        },
      })) as Response;
      if (response.ok) {
        const data = await response.json();
        return ApiUtils.Response.success(data);
      }
      return ApiUtils.Response.error(response);
    } catch (error) {
      return ApiUtils.Response.error(error);
    }
  },
};

export default AuthService;
