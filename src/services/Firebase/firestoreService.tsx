import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Toast from "@/utils/Toast";

import { db } from "./config";
import { IAPI } from "@/interface";
import { ApiUtils } from "@/utils";

const FireStoreService = {
  getDocuments: async <T = IAPI.ResponseData,>(
    documentName: string,
    orderByFields: { field: string; direction: "asc" | "desc" }[] = []
  ): Promise<IAPI.ApiResponse<T[]> | unknown> => {
    try {
      const collectionRef = collection(db, documentName);

      // Thêm `orderBy` nhiều trường vào truy vấn
      let queryRef: any = collectionRef;
      orderByFields.forEach(({ field, direction }) => {
        queryRef = query(queryRef, orderBy(field, direction));
      });

      const querySnapshot = await getDocs(queryRef);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as T),
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

  countDocuments: async <T = IAPI.ResponseData,>(
    collectionName: string
  ): Promise<IAPI.ApiResponse<T[]> | unknown> => {
    try {
      const coll = collection(db, collectionName);
      const snapshot = await getCountFromServer(coll);
      return ApiUtils.Response.success(snapshot.data().count);
    } catch (error) {
      return ApiUtils.Response.error(error);
    }
  },
};

export default FireStoreService;
