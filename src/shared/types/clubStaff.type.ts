import { StaffMembersListingParams } from "src/models/staffMember.model";

export interface ClubStaffHeaderProps {
  onStaffAdd: () => void;
  onSearch: (searchTerm: string) => void;
  onFilter: (filters: Partial<StaffMembersListingParams>) => void;
}
