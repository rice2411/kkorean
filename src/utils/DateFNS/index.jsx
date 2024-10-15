import { formatDistanceToNow, format } from "date-fns";
import { vi } from "date-fns/locale";

const DateFNSUtils = {
  now: (formatString = "HH:mm dd/MM/yyyy") => {
    return format(new Date(), formatString);
  },
  fromNow: (time) => {
    return formatDistanceToNow(time, { addSuffix: true, locale: vi });
  },
};

export default DateFNSUtils;
