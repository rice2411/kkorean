import { ExamsAPI, GroupsAPI, UsersAPI } from "@/apis";
import ResultsAPI from "@/apis/Result";
import { IAPI } from "@/interface";

export const OverviewPageLoader = async () => {
  const response = (await Promise.all([
    UsersAPI.countDocuments(),
    ExamsAPI.countDocuments(),
    GroupsAPI.countDocuments(),
    ResultsAPI.countDocuments(),
  ])) as IAPI.ApiResponse<number>[];
  if (response[0] && response[1] && response[2] && response[3]) {
    return [
      response[0].data,
      response[1].data,
      response[2].data,
      response[3].data,
    ];
  }

  return response || [];
};
