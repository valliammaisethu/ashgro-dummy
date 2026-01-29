import { Member, MembersListingParams } from "src/models/members.model";
import {
  toggleAllSelections as toggleAll,
  toggleSingleSelection as toggleSingle,
  areAllItemsSelected,
  areSomeItemsSelected,
  getAllItems,
  SelectedItem,
} from "src/shared/utils/selectionHelpers";

export type SelectedMember = SelectedItem;

export const getAllMembers = getAllItems<Member>;

export const toggleAllSelections = (
  checked: boolean,
  members: Member[] = [],
  currentSelections: SelectedMember[] = [],
): SelectedMember[] => toggleAll(checked, members, currentSelections);

export const toggleSingleSelection = toggleSingle;

export const areAllMembersSelected = areAllItemsSelected<Member>;

export const areSomeMembersSelected = areSomeItemsSelected<Member>;

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
    Array.isArray(queryParams.membershipCategoryIds) &&
    queryParams.membershipCategoryIds.length > 0;

  const hasLeadSource =
    Array.isArray(queryParams.leadSourceIds) &&
    queryParams.leadSourceIds.length > 0;

  return (
    hasDateRange ||
    hasLeadSource ||
    hasMembershipCategory ||
    hasMembershipStatus
  );
};
