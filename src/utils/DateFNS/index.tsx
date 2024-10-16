import { formatDistanceToNow, format } from "date-fns";
import { vi } from "date-fns/locale";

const DateFNSUtils = {
    now: (formatString: string = "HH:mm dd/MM/yyyy"): string => {
        return format(new Date(), formatString);
    },
    fromNow: (time: Date | number): string => {
        return formatDistanceToNow(time, { addSuffix: true, locale: vi });
    },
};

export default DateFNSUtils;
