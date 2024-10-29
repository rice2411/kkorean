import { useEffect } from "react";

const useOffline = () => {
  useEffect(() => {
    const handleOffline = () => {
      window.location.href = "./offline.html";
    };

    const handleOnline = () => {
      console.log("Kết nối mạng đã phục hồi!");
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);
};

export default useOffline;
