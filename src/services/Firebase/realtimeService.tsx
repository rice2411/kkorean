import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config";

type SetDataFunction<T> = (data: T[]) => void;

const RealTimeService = {
    getSnapshot: async <T,>(
        collectionName: string,
        setDataFunction: SetDataFunction<T>
    ): Promise<void> => {
        try {
            onSnapshot(collection(db, collectionName), (snapshot) => {
                const newData: T[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as T[];
                setDataFunction(newData);
            });
        } catch (err) {
            setDataFunction([]);
        }
    },
};

export default RealTimeService;
