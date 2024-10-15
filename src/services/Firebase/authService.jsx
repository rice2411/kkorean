import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { HTTP_CONSTANTS } from "@/constants";
import { CONFIG_CONSTANTS } from "@/constants";
import ApiUtils from "@/utils/API";
import HttpUtils from "@/utils/HTTP";
import { auth, route } from "./config";
import { FirebaseService } from "..";

const AuthService = {
    register: async (user) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                user.email,
                CONFIG_CONSTANTS.DEFAULT_PASSWORD
            );
            const newUser = userCredential.user;
            await FirebaseService.createDocument(
                "users",
                {
                    ...user,
                    createdAt: new Date(),
                    isDisaled: 0,
                    role: CONFIG_CONSTANTS.USER_ROLE.USER,
                },
                newUser.uid
            );
            return HttpUtils.Response.success(user);
        } catch (err) {
            return HttpUtils.Response.error(err);
        }
    },

    login: async (data) => {
        try {
            const res = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            const { user } = res;
            const { fullName, role } = await FirebaseService.getDocumentById(
                "users",
                user.uid
            );
            const result = {
                id: user.uid,
                email: user.email,
                role,
                fullName,
            };
            return HttpUtils.Response.success(result, "Đăng nhập thành công");
        } catch (err) {
            return HttpUtils.Response.error(
                err,
                "Lỗi đăng nhập",
                HTTP_CONSTANTS.HTTP_STATUS_CODE.BAD_REQUEST
            );
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
            return HttpUtils.Response.success(res, "Đăng xuất thành công");
        } catch (err) {
            return HttpUtils.Response.error(
                err,
                "Lỗi đăng xuất",
                HTTP_CONSTANTS.HTTP_STATUS_CODE.BAD_REQUEST
            );
        }
    },

    resetAccountPassword: async (user) => {
        const { id } = user;
        try {
            const response = await ApiUtils.fetchAPI(route.adminApi, {
                body: {
                    id,
                    newPassword: CONFIG_CONSTANTS.DEFAULT_PASSWORD,
                    api: "resetAccountPassword",
                },
            });
            const data = response.json();
            if (response.ok) {
                return HttpUtils.Response.success(data);
            }
            return HttpUtils.Response.error(response);
        } catch (error) {
            return HttpUtils.Response.error(error);
        }
    },

    updateAccountStatus: async (user, disabled) => {
        const { id } = user;
        try {
            const response = await ApiUtils.fetchAPI(route.adminApi, {
                body: {
                    id,
                    disabled,
                    api: "updateAccountStatus",
                },
            });
            const data = response.json();
            if (response.ok) {
                return HttpUtils.Response.success(data);
            }
            return HttpUtils.Response.error(response);
        } catch (error) {
            return HttpUtils.Response.error(error);
        }
    },

    deleteAccountByEmail: async (user) => {
        const { email } = user;
        try {
            const response = await ApiUtils.fetchAPI(route.adminApi, {
                body: {
                    email,
                    api: "deleteAccountByEmail",
                },
            });
            const data = response.json();
            if (response.ok) {
                return HttpUtils.Response.success(data);
            }
            return HttpUtils.Response.error(response);
        } catch (error) {
            return HttpUtils.Response.error(error);
        }
    },
};

export default AuthService;
