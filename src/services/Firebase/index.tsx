import AuthService from "./authService";
import FireStoreService from "./firestoreService";
import RealTimeService from "./realtimeService";

const FirebaseService = {
    ...AuthService,
    ...FireStoreService,
    ...RealTimeService,
};

export default FirebaseService;
