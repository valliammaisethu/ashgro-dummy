import { UseQueryOptions } from "@tanstack/react-query";
import { deserialize, serialize } from "serializr";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { ClubListReponse } from "src/models/club.model";
import { QueryParams } from "src/models/queryParams.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";

const { GET_CLUBS } = QueryKeys;
const { GET_CLUBS: GET_CLUBS_ROUTE } = ApiRoutes;

export const ClubService = () => {
  const getClubs = (
    params = new QueryParams(),
  ): UseQueryOptions<ClubListReponse, ResponseModel, ClubListReponse> => ({
    queryKey: [GET_CLUBS],
    queryFn: async () => {
      const { data } = await axiosInstance.get(GET_CLUBS_ROUTE, {
        params: serialize(QueryParams, params),
        baseURL:
          "https://c97ccb40-3ccb-4972-a64a-26b54febfe28.mock.pstmn.io/api/v1",
      });

      return deserialize(ClubListReponse, data?.data);
    },
  });
  return {
    getClubs,
  };
};
