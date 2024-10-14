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
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Response from "@/utils/HTTP";
import { HTTP_CONSTANTS } from "@/constants";
import Toast from "@/utils/Toast";
import { CONFIG_CONSTANTS } from "@/constants";
import ApiUtils from "@/utils/API";
import HttpUtils from "@/utils/HTTP";

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

const route = {
  adminApi: "/api/firebase",
};

const firebaseService = {
  // REAL TIME
  getSnapshot: async (collectionName, setDataFunction) => {
    onSnapshot(collection(db, collectionName), (snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setDataFunction(newData);
    });
  },

  // AUTHENTICATION
  deleteAccountByEmail: async (user) => {
    const { email } = user;
    try {
      const response = await ApiUtils.fetchAdminAPI(route.adminApi, {
        email,
        api: "deleteAccountByEmail",
      });
      return HttpUtils.Response.success(response.data);
    } catch (err) {
      console.log(err);
      return HttpUtils.Response.error(err);
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
      const { fullName, role } = await firebaseService.getDocumentById(
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
      const response = await ApiUtils.fetchAdminAPI(route.adminApi, {
        id,
        newPassword: CONFIG_CONSTANTS.DEFAULT_PASSWORD,
        api: "resetAccountPassword",
      });
      return HttpUtils.Response.success(response.data);
    } catch (err) {
      return HttpUtils.Response.error(err);
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
      return HttpUtils.Response.success(response.data);
    } catch (err) {
      return HttpUtils.Response.error(err);
    }
  },

  // CRUD DOCUMENT
  getDocuments: async (documentName) => {
    try {
      const querySnapshot = await getDocs(collection(db, documentName));
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return HttpUtils.Response.success(
        docsData,
        "ok",
        HTTP_CONSTANTS.HTTP_STATUS_CODE.OK
      );
    } catch (err) {
      console.log(err);
      return HttpUtils.Response.error(
        err,
        "okn't",
        HTTP_CONSTANTS.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
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
    if (id) {
      await setDoc(doc(db, documentName, id), data);
    } else {
      await addDoc(collection(db, documentName), data);
    }
    return HttpUtils.Response.success(
      data,
      "ok",
      HTTP_CONSTANTS.HTTP_STATUS_CODE.OK
    );
  },

  deleteDocument: async (documentName, data) => {
    try {
      const ref = doc(db, documentName, data.id);
      await deleteDoc(ref);
      return HttpUtils.Response.success(
        data,
        "ok",
        HTTP_CONSTANTS.HTTP_STATUS_CODE.OK
      );
    } catch (err) {
      Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
      return HttpUtils.Response.error(
        err,
        "okn't",
        HTTP_CONSTANTS.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }
  },

  updateDocument: async (documentName, data) => {
    try {
      const ref = doc(db, documentName, data.id);
      await updateDoc(ref, data);
      return HttpUtils.Response.success(
        data,
        "ok",
        HTTP_CONSTANTS.HTTP_STATUS_CODE.OK
      );
    } catch (err) {
      Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
      return HttpUtils.Response.error(
        err,
        "okn't",
        HTTP_CONSTANTS.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }
  },

  updateMutilpleDocument: async (collectionName, data) => {
    try {
      for (const docData of data) {
        const docRef = doc(db, collectionName, docData.id);
        await updateDoc(docRef, docData);
      }
      return HttpUtils.Response.success(data);
    } catch (error) {
      return HttpUtils.Response.error(error);
    }
  },
};

export default firebaseService;
