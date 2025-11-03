import { MembersListingParams } from "src/models/members.model";

export const areFiltersActive = (
  queryParams: MembersListingParams,
): boolean => {
  if (!queryParams) return false;

  const hasDateRange =
    !!queryParams.joinedStartDate || !!queryParams.joinedEndDate;

  const hasMembershipStatus =
    Array.isArray(queryParams.membershipStatusIds) &&
    queryParams.membershipStatusIds.length > 0;

  const hasMembershipCategory =
    Array.isArray(queryParams.membershipCategoriesIds) &&
    queryParams.membershipCategoriesIds.length > 0;

  const hasLeadSource =
    Array.isArray(queryParams.leadSourcesIds) &&
    queryParams.leadSourcesIds.length > 0;

  return (
    hasDateRange ||
    hasLeadSource ||
    hasMembershipCategory ||
    hasMembershipStatus
  );
};
