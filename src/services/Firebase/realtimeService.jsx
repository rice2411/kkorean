import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config";

const RealTimeService = {
    getSnapshot: async (collectionName, setDataFunction) => {
        try {
            onSnapshot(collection(db, collectionName), (snapshot) => {
                const newData = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });
                setDataFunction(newData);
            });
        } catch (err) {
            setDataFunction([]);
        }
    },
};

export default RealTimeService;
