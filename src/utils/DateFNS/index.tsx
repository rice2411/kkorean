import { formatDistanceToNow, format } from "date-fns";
import { vi } from "date-fns/locale";

const DateFNSUtils = {
  now: (formatString: string = "HH:mm dd/MM/yyyy"): string => {
    return format(new Date(), formatString);
  },
  fromNow: (time: Date | number): string => {
    return formatDistanceToNow(time, { addSuffix: true, locale: vi });
  },
  itTake: (initialTime: string, defaultValue: number) => {
    const [minutes, seconds] = initialTime.split(":").map(Number);

    // Convert the input time to total seconds
    let totalSeconds = minutes * 60 + seconds;

    // Check if total time is less than 60 minutes
    if (totalSeconds < defaultValue) {
      totalSeconds = defaultValue - totalSeconds;
    } else {
      totalSeconds -= defaultValue;
    }

    // Calculate the resulting minutes and seconds
    const resultMinutes = Math.floor(totalSeconds / 60);
    const resultSeconds = totalSeconds % 60;

    // Format the result with leading zeros
    const formattedMinutes = String(resultMinutes).padStart(2, "0");
    const formattedSeconds = String(resultSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  },
};

export default DateFNSUtils;
