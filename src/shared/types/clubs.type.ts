import { ClubSettingsTypes } from "src/enums/clubSettingsTypes.enum";
import { Dispatch, SetStateAction } from "react";
import { ClubProfile } from "src/models/club.model";
import { QueryParams } from "src/models/queryParams.model";

export interface ClubFormProps {
  open: boolean;
  onClose: () => void;
  clubId: string;
}

export interface ClubListingHeaderProps {
  onAddClub?: () => void;
  onSearch: (searchTerm: string) => void;
}

export interface ClubListingTableProps {
  onEditClub: (clubId: string) => void;
  queryParams: QueryParams;
  setQueryParams: Dispatch<SetStateAction<QueryParams>>;
}

export interface ClubInfoProps {
  data?: ClubProfile;
}

export interface ClubFormState {
  visible: boolean;
  clubId: string | null;
}
export interface ClubDetailsHeaderProps {
  isFetching?: boolean;
  onChatbotQuestions?: () => void;
  onSettings?: () => void;
}

export interface IconTextProps {
  icon: React.ReactNode;
  text?: string;
  className?: string;
}

export interface GeneralSettingsData {
  webFormsEnabled: boolean;
  bulkEmailEnabled: boolean;
  emailTemplatesAllowed: number;
  customChartsAllowed: number;
  clubId: string;
}

export interface GeneralSettingsDrawerProps {
  open: boolean;
  onClose: () => void;
  clubId: string;
  webFormsEnabled?: boolean;
  bulkEmailEnabled?: boolean;
  emailTemplatesAllowed?: number;
  customChartsAllowed?: number;
  onSave: (data: GeneralSettingsData, clubId: string) => void;
  isLoading?: boolean;
}

export interface WarningModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  isLoading?: boolean;
  type: ClubSettingsTypes;
}

export interface ClubSettingsState {
  settingsOpen: boolean;
  modalOpen: boolean;
}
