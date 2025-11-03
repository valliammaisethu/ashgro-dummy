import { FieldValues } from "react-hook-form";

export interface MemberFiltersProps {
  visible: boolean;
  toggleVisibility: () => void;
  onSubmit: (values: FieldValues) => void;
  defaultValues: FieldValues;
}

export interface MembersHeaderProps {
  onAddMember?: () => void;
  onSearch: (searchTerm: string) => void;
  onFilter: () => void;
  filtersActive: boolean;
  onBulkMail?: () => void;
}
