import { generatePath } from "react-router-dom";
import {
  UseMutationOptions,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";

import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { ChartDetail, ChartItem } from "src/models/dashboard.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { generateChartPaths } from "src/views/Dashboard/utils/chartUtils";
import { CustomChart } from "src/models/chart.model";
import { renderNotification } from "src/shared/utils/renderNotification";
import { ReorderChartsPayload } from "src/shared/types/dashboard.types";
import { MetaOptions } from "src/models/common.model";

const { GET_DASHBOARD_CHARTS_KEY, GET_CHART_DETAIL_KEY, GET_CHART_VALUES_KEY } =
  QueryKeys;
const { CAN_CREATE_CUSTOM_CHART: CAN_CREATE_CUSTOM_CHART_ROUTE } = ApiRoutes;
const {
  ADD_CUSTOM_CHART,
  CAN_CREATE_CUSTOM_CHART,
  REORDER_CHARTS,
  DELETE_CHART,
} = MutationKeys;
const {
  GET_DASHBOARD_CHARTS,
  UPDATE_CHART_ORDER,
  GET_CHART_VALUES,
  GET_CHART_DETAIL,
} = ApiRoutes;

export const DashboardService = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;
  const queryClient = useQueryClient();

  const getDashboardChartsList = (): UseQueryOptions<
    ChartItem[],
    ResponseModel,
    ChartItem[]
  > => ({
    queryKey: [GET_DASHBOARD_CHARTS_KEY, clubId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        generatePath(GET_DASHBOARD_CHARTS, { clubId }),
      );

      const deserializedData = deserialize(
        ChartItem,
        data?.data?.charts,
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
    enabled: !!clubId && !!path,
  });

  const canCreateCustomChart = (): UseMutationOptions<
    ResponseModel,
    ResponseModel
  > => ({
    mutationKey: [CAN_CREATE_CUSTOM_CHART],
    mutationFn: async () => {
      const response = await axiosInstance.get(
        generatePath(CAN_CREATE_CUSTOM_CHART_ROUTE, { id: clubId }),
      );
      return deserialize(ResponseModel, response?.data);
    },
  });

  const addCustomChart = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    CustomChart
  > => ({
    mutationKey: [ADD_CUSTOM_CHART],
    mutationFn: async (payload: CustomChart) => {
      const response = await axiosInstance.post(
        generatePath(GET_DASHBOARD_CHARTS, { clubId }),
        serialize(CustomChart, payload),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
      queryClient.invalidateQueries({
        queryKey: [GET_DASHBOARD_CHARTS_KEY, clubId],
      });
    },
  });

  const editCustomChart = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    CustomChart
  > => ({
    mutationKey: [ADD_CUSTOM_CHART],
    mutationFn: async (payload: CustomChart) => {
      const { id, ...rest } = payload;
      const response = await axiosInstance.put(
        generatePath(GET_CHART_DETAIL, { clubId, chartId: id }),
        rest,
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: (response) => {
      const { title, description } = response;
      renderNotification(title, description);
      queryClient.invalidateQueries({
        queryKey: [GET_DASHBOARD_CHARTS_KEY, clubId],
      });
    },
  });

  const updateChartOrder = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    ReorderChartsPayload
  > => ({
    mutationKey: [REORDER_CHARTS, clubId],
    mutationFn: async (payload) => {
      const response = await axiosInstance.put(
        generatePath(UPDATE_CHART_ORDER, { clubId }),
        payload,
      );
      return deserialize(ResponseModel, response?.data);
    },
  });

  const getChartValues = (
    type?: string,
  ): UseQueryOptions<MetaOptions[], ResponseModel, MetaOptions[]> => ({
    queryKey: [GET_CHART_VALUES_KEY, clubId, type],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        generatePath(GET_CHART_VALUES, { clubId }),
        {
          params: { type },
        },
      );
      return deserialize(
        MetaOptions,
        data?.data?.values,
      ) as unknown as MetaOptions[];
    },
    enabled: !!clubId && !!type,
  });

  const deleteChart = (): UseMutationOptions<
    ResponseModel,
    ResponseModel,
    string
  > => ({
    mutationKey: [DELETE_CHART, clubId],
    mutationFn: async (chartId?: string) => {
      const response = await axiosInstance.delete(
        generatePath(GET_CHART_DETAIL, { clubId, chartId }),
      );
      return deserialize(ResponseModel, response?.data);
    },
    onSuccess: ({ title, description }) => {
      renderNotification(title, description);
      queryClient.invalidateQueries({
        queryKey: [GET_DASHBOARD_CHARTS_KEY, clubId],
      });
    },
  });

  return {
    getDashboardChartsList,
    getChartDetails,
    canCreateCustomChart,
    addCustomChart,
    editCustomChart,
    updateChartOrder,
    getChartValues,
    deleteChart,
  };
};
