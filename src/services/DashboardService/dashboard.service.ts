import { generatePath } from "react-router-dom";
import { UseQueryOptions } from "@tanstack/react-query";
import { deserialize } from "serializr";

import { QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { ChartDetail, ChartItem } from "src/models/dashboard.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { generateChartPaths } from "src/views/Dashboard/utils/chartUtils";

const { GET_DASHBOARD_CHARTS_KEY, GET_CHART_DETAIL_KEY } = QueryKeys;
const { GET_DASHBOARD_CHARTS } = ApiRoutes;

export const DashboardService = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const getDashboardChartsList = (): UseQueryOptions<
    ChartItem[],
    ResponseModel,
    ChartItem[]
  > => ({
    queryKey: [GET_DASHBOARD_CHARTS_KEY, clubId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        generatePath(GET_DASHBOARD_CHARTS, { clubId }),
      );

      const deserializedData = deserialize(
        ChartItem,
        response?.data?.charts,
      ) as unknown as ChartItem[];

      return generateChartPaths(deserializedData);
    },
  });

  const getChartDetails = (
    path: string,
  ): UseQueryOptions<ChartDetail, ResponseModel, ChartDetail> => ({
    queryKey: [GET_CHART_DETAIL_KEY, clubId, path],
    queryFn: async () => {
      const response = await axiosInstance.get(path);

      return deserialize(ChartDetail, response?.data?.data?.chart);
    },
    enabled: !!clubId,
  });

  return {
    getDashboardChartsList,
    getChartDetails,
  };
};
