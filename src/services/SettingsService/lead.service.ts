import { UseQueryOptions } from "@tanstack/react-query";
import { deserialize } from "serializr";

import { QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { LeadSources } from "src/models/lead.model";
import { ResponseModel } from "src/models/response.model";
import { UserData } from "src/models/user.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";

const { MEMBERSHIP_STATUS, MEMBERSHIP_TYPE_STATUS } = ApiRoutes;

const { GET_MEMBERSHIP_STATUS, GET_MEMBERSHIP_TYPE_STATUS } = QueryKeys;

export const LeadService = () => {
  const user = localStorageHelper.getItem(LocalStorageKeys.USER) as UserData;
  const clubId = user?.clubId;

  const leadSources = (): UseQueryOptions<
    LeadSources[],
    ResponseModel,
    LeadSources[]
  > => {
    return {
      queryKey: [GET_MEMBERSHIP_STATUS, clubId],
      queryFn: async () => {
        const response = {
          title: "Lead Sources Retrieved",
          description: "Successfully retrieved lead sources for the club",
          data: {
            leadSources: [
              {
                id: "69081b9e3f44ff88ea116c87",
                sourceName: "test1",
              },
              {
                id: "69081ba63f44ff88ea116c91",
                sourceName: "test2",
              },
              {
                id: "69081baa3f44ff88ea116c97",
                sourceName: "test3",
              },
              {
                id: "69081bad3f44ff88ea116c9d",
                sourceName: "test4",
              },
              {
                id: "69081bb03f44ff88ea116ca3",
                sourceName: "test5",
              },
            ],
          },
          success: true,
        };

        return deserialize(LeadSources, response?.data?.leadSources);
      },
      enabled: !!clubId,
    };
  };

  return {
    leadSources,
  };
};
