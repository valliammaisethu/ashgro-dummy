import { Member, MembersListingParams } from "src/models/members.model";

export type SelectedMember = {
  id: string;
  email: string;
  name: string;
};

export const getAllMembers = (members: Member[] = []): SelectedMember[] =>
  members.map((m) => ({
    id: m.id!,
    email: m.email!,
    name: m.firstName!,
  }));

export const toggleAllSelections = (
  checked: boolean,
  members: Member[] = [],
): SelectedMember[] => (checked ? getAllMembers(members) : []);

export const toggleSingleSelection = (
  memberId: string,
  email: string,
  name: string,
  checked: boolean,
  currentSelections: SelectedMember[],
): SelectedMember[] => {
  if (checked) {
    if (!currentSelections.some((m) => m.id === memberId)) {
      return [...currentSelections, { id: memberId, email, name }];
    }
    return currentSelections;
  }
  return currentSelections.filter((m) => m.id !== memberId);
};

export const areAllMembersSelected = (
  members: Member[] = [],
  selectedMembers: SelectedMember[],
): boolean => members.length > 0 && selectedMembers.length === members.length;

export const areSomeMembersSelected = (
  members: Member[] = [],
  selectedMembers: SelectedMember[],
): boolean =>
  selectedMembers.length > 0 &&
  !areAllMembersSelected(members, selectedMembers);

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
