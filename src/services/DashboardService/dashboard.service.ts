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
import { DashboardStats } from "src/models/dashboardStats.model";

const { GET_DASHBOARD_CHARTS_KEY, GET_CHART_DETAIL_KEY, GET_DASHBOARD_STATS } =
  QueryKeys;
const { GET_DASHBOARD_CHARTS, GET_DASHBOARD_STATS: GET_DASHBOARD_STATS_PATH } =
  ApiRoutes;

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

  const getDashboardStats = (): UseQueryOptions<
    DashboardStats,
    ResponseModel,
    DashboardStats
  > => ({
    queryKey: [GET_DASHBOARD_STATS, clubId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(GET_DASHBOARD_STATS_PATH);
      return deserialize(DashboardStats, data?.data);
    },
  });

  return {
    getDashboardChartsList,
    getChartDetails,
    getDashboardStats,
  };
};
