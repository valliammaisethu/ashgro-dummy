import { ClubFormData, ClubProfile } from "src/models/club.model";

export interface AddClubModalProps {
  open: boolean;
  onClose: () => void;
  clubData?: ClubFormData | null;
}

export interface ClubListingHeaderProps {
  onAddClub?: () => void;
}

export interface ClubListingTableProps {
  onEditClub: (data: ClubFormData) => void;
}

export interface ClubInfoProps {
  data?: ClubProfile;
}

export interface ClubFormState {
  visible: boolean;
  clubData: ClubFormData | null;
}
export interface ClubDetailsHeaderProps {
  onChatbotQuestions?: () => void;
}

export interface IconTextProps {
  icon: React.ReactNode;
  text?: string;
  className?: string;
}
