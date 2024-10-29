import { useEffect, useState } from "react";

function useCountdown(initialSeconds: number) {
    const [seconds, setSeconds] = useState<number>(initialSeconds);
    const [isActive, setIsActive] = useState<boolean>(false);

    // Hàm định dạng thời gian sang mm:ss
    const formatTime = (totalSeconds: number): string => {
        const minutes = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(2, "0");
        const remainingSeconds = (totalSeconds % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${remainingSeconds}`;
    };

    const startCountdown = (): void => setIsActive(true);
    const stopCountdown = (): void => setIsActive(false);
    const resetCountdown = (): void => {
        setIsActive(false);
        setSeconds(initialSeconds);
    };

    useEffect(() => {
        let countdownInterval: NodeJS.Timeout | undefined;

        if (isActive && seconds > 0) {
            countdownInterval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            setIsActive(false); // Dừng lại khi hết thời gian
            // Có thể thêm hành động khi đếm ngược kết thúc, như khởi động lại đếm hoặc thông báo
        }

        // Dọn dẹp interval khi component unmount hoặc isActive/seconds thay đổi
        return () => {
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        };
    }, [isActive, seconds]);

    return {
        time: formatTime(seconds),
        isActive,
        startCountdown,
        stopCountdown,
        resetCountdown,
    };
}

export default useCountdown;
