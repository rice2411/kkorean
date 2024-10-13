import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Response from "@/utils/HTTP/response";
import HTTP_STATUS_CODE from "@/utils/HTTP/statusCode";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import { FileHelpers } from "@/helpers";
import Toast from "@/utils/Toast";
import { CONFIG_CONSTANTS } from "@/constants";
import ApiUtils from "@/utils/API";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

const route = {
  adminApi: "/api/firebase",
};

const firebaseService = {
  isLoggedIn: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id || null;
  },

  deleteAccountByEmail: async (user) => {
    const { email } = user;
    try {
      const response = await ApiUtils.fetchAdminAPI(route.adminApi, {
        email,
        api: "deleteAccountByEmail",
      });
      return Response.success(response.data);
    } catch (err) {
      console.log(err);
      return Response.error(err);
    }
  },

  register: async (user) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        CONFIG_CONSTANTS.DEFAULT_PASSWORD
      );
      const newUser = userCredential.user;
      await firebaseService.createDocument(
        "users",
        {
          ...user,
          createdAt: new Date(),
          isDisaled: 0,
          role: CONFIG_CONSTANTS.USER_ROLE.USER,
        },
        newUser.uid
      );
      return Response.success(user);
    } catch (err) {
      return Response.error(err);
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
      const { name, role } = await firebaseService.getDocumentById(
        "users",
        user.uid
      );
      const result = {
        id: user.uid,
        email: user.email,
        role,
        name,
      };
      return Response.success(result, "Đăng nhập thành công");
    } catch (err) {
      return Response.error(err, "Lỗi đăng nhập", HTTP_STATUS_CODE.BAD_REQUEST);
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      return Response.success(res, "Đăng xuất thành công");
    } catch (err) {
      return Response.error(err, "Lỗi đăng xuất", HTTP_STATUS_CODE.BAD_REQUEST);
    }
  },

  resetAccountPassword: async (user) => {
    const { id } = user;
    try {
      const response = await ApiUtils.fetchAdminAPI(route.adminApi, {
        id,
        newPassword: CONFIG_CONSTANTS.DEFAULT_PASSWORD,
        api: "resetAccountPassword",
      });
      return Response.success(response.data);
    } catch (err) {
      return Response.error(err);
    }
  },

  updateAccountStatus: async (user, disabled) => {
    const { id } = user;
    try {
      const response = await ApiUtils.fetchAdminAPI(route.adminApi, {
        id,
        disabled,
        api: "updateAccountStatus",
      });
      return Response.success(response.data);
    } catch (err) {
      return Response.error(err);
    }
  },

  getDocuments: async (documentName) => {
    try {
      if (!firebaseService.isLoggedIn()) {
        return;
      }
      const querySnapshot = await getDocs(collection(db, documentName));
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return Response.success(docsData, "ok", HTTP_STATUS_CODE.OK);
    } catch (err) {
      console.log(err);
      return Response.error(
        err,
        "okn't",
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }
  },

  getDocumentById: async (documentName, id) => {
    const docRef = doc(db, documentName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  },

  createDocument: async (documentName, data, id = null) => {
    if (!firebaseService.isLoggedIn()) {
      return;
    }
    if (id) {
      await setDoc(doc(db, documentName, id), data);
    } else {
      await addDoc(collection(db, documentName), data);
    }
    return Response.success(data, "ok", HTTP_STATUS_CODE.OK);
  },

  deleteDocument: async (documentName, data) => {
    try {
      if (!firebaseService.isLoggedIn()) {
        return;
      }
      const ref = doc(db, documentName, data.id);
      await deleteDoc(ref);
      return Response.success(data, "ok", HTTP_STATUS_CODE.OK);
    } catch (err) {
      Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
      return Response.error(
        err,
        "okn't",
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }
  },

  // Các phương thức khác không cần kiểm tra xác thực
  updateDocument: async (documentName, data) => {
    try {
      if (!firebaseService.isLoggedIn()) {
        return;
      }
      const ref = doc(db, documentName, data.id);
      await updateDoc(ref, data);
      return Response.success(data, "ok", HTTP_STATUS_CODE.OK);
    } catch (err) {
      Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
      return Response.error(
        err,
        "okn't",
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }
  },

  getFile: async (fileName, extension) => {
    const fileRef = ref(
      storage,
      `${FileHelpers.getPath(extension)}/${fileName}.${extension}`
    );
    try {
      const url = await getDownloadURL(fileRef);
      console.log(url);
      return url;
    } catch (error) {
      return null;
    }
  },
};
export default firebaseService;
