import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Toast from "@/utils/Toast";

import { db } from "./config";
import { IAPI } from "@/interface";
import { ApiUtils } from "@/utils";

const FireStoreService = {
  getDocuments: async <T = IAPI.ResponseData,>(
    documentName: string
  ): Promise<IAPI.ApiResponse<T[]> | unknown> => {
    try {
      const querySnapshot = await getDocs(collection(db, documentName));
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
      return ApiUtils.Response.success(docsData);
    } catch (err) {
      return ApiUtils.Response.error(err);
    }
  },

  getDocumentById: async <T = IAPI.ResponseData,>(
    documentName: string,
    id: string
  ): Promise<IAPI.ApiResponse<T[]> | unknown> => {
    try {
      const docRef = doc(db, documentName, id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.exists()
        ? ({ id: docSnap.id, ...docSnap.data() } as T)
        : null;
      return ApiUtils.Response.success(data);
    } catch (err) {
      return ApiUtils.Response.error(err);
    }
  },

  createDocument: async <T = any,>(
    documentName: string,
    data: any,
    id: string | null = null
  ): Promise<IAPI.ApiResponse<T[]> | unknown> => {
    try {
      let responseID = id;
      if (id) {
        await setDoc(doc(db, documentName, id), data);
      } else {
        const ref = await addDoc(collection(db, documentName), data);
        responseID = ref.id;
      }
      return ApiUtils.Response.success({ ...data, id: responseID });
    } catch (err) {
      return ApiUtils.Response.error(err);
    }
  },

  deleteDocument: async <T = IAPI.ResponseData,>(
    documentName: string,
    data: T & { id: string }
  ): Promise<IAPI.ApiResponse<T[]> | unknown> => {
    try {
      const ref = doc(db, documentName, data.id);
      await deleteDoc(ref);
      return ApiUtils.Response.success(data);
    } catch (err) {
      Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
      return ApiUtils.Response.error(err);
    }
  },

  updateDocument: async <T = IAPI.ResponseData,>(
    documentName: string,
    data: T & { id: string }
  ): Promise<IAPI.ApiResponse<T[]> | unknown> => {
    try {
      const ref = doc(db, documentName, data.id);
      await updateDoc(ref, data);
      return ApiUtils.Response.success(data);
    } catch (err) {
      return ApiUtils.Response.error(err);
    }
  },

  updateMultipleDocuments: async <T = IAPI.ResponseData,>(
    collectionName: string,
    data: T[] & { id: string }[]
  ): Promise<IAPI.ApiResponse<T[]> | unknown> => {
    try {
      for (const docData of data) {
        const docRef = doc(db, collectionName, docData.id);
        await updateDoc(docRef, docData);
      }
      return ApiUtils.Response.success(data);
    } catch (error) {
      return ApiUtils.Response.error(error);
    }
  },
};

export default FireStoreService;
