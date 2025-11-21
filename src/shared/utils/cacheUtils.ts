import { QueryClient } from "@tanstack/react-query";
import { ClubData, ClubListReponse } from "src/models/club.model";
import { QueryKeys } from "src/enums/cacheEvict.enum";

interface ClubCacheUpdate {
  chatbotEnabled?: boolean;
  status?: string;
}

export const updateClubCache = (
  queryClient: QueryClient,
  clubId: string,
  updates: ClubCacheUpdate,
): void => {
  queryClient.setQueryData(
    [QueryKeys.GET_CLUB_PROFILE, clubId],
    (oldData: ClubData | undefined) => {
      if (!oldData?.club) return oldData;
      return {
        ...oldData,
        club: { ...oldData.club, ...updates },
      };
    },
  );

  queryClient.setQueriesData(
    { queryKey: [QueryKeys.GET_CLUBS] },
    (oldData: ClubListReponse | undefined) => {
      if (!oldData?.clubs) return oldData;
      return {
        ...oldData,
        clubs: oldData.clubs.map((club) =>
          club.id === clubId ? { ...club, ...updates } : club,
        ),
      };
    },
  );
};
