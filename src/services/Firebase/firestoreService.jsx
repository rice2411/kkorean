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
import HttpUtils from "@/utils/HTTP";
import { db } from "./config";

const FireStoreService = {
    getDocuments: async (documentName) => {
        try {
            const querySnapshot = await getDocs(collection(db, documentName));
            const docsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return HttpUtils.Response.success(docsData);
        } catch (err) {
            return HttpUtils.Response.error(err);
        }
    },

    getDocumentById: async (documentName, id) => {
        try {
            const docRef = doc(db, documentName, id);
            const docSnap = await getDoc(docRef);
            const data = docSnap.exists() ? docSnap.data() : null;
            return HttpUtils.Response.success(data);
        } catch (err) {
            return HttpUtils.Response.error(err);
        }
    },

    createDocument: async (documentName, data, id = null) => {
        try {
            if (id) {
                await setDoc(doc(db, documentName, id), data);
            } else {
                await addDoc(collection(db, documentName), data);
            }
            return HttpUtils.Response.success(data);
        } catch (err) {
            return HttpUtils.Response.error(err);
        }
    },

    deleteDocument: async (documentName, data) => {
        try {
            const ref = doc(db, documentName, data.id);
            await deleteDoc(ref);
            return HttpUtils.Response.success(data);
        } catch (err) {
            Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
            return HttpUtils.Response.error(err);
        }
    },

    updateDocument: async (documentName, data) => {
        try {
            const ref = doc(db, documentName, data.id);
            await updateDoc(ref, data);
            return HttpUtils.Response.success(data);
        } catch (err) {
            return HttpUtils.Response.error(err);
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

export default FireStoreService;
