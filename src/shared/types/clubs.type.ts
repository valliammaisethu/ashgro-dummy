import { ClubProfile } from "src/models/club.model";

export interface AddClubModalProps {
  open: boolean;
  onClose: () => void;
  clubId?: string;
}

export interface ClubListingHeaderProps {
  onAddClub?: () => void;
}

export interface ClubListingTableProps {
  onEditClub: (clubId: string) => void;
}

export interface ClubInfoProps {
  data?: ClubProfile;
}

export interface ClubFormState {
  visible: boolean;
  clubId: string | null;
}
export interface ClubDetailsHeaderProps {
  onChatbotQuestions?: () => void;
}

export interface IconTextProps {
  icon: React.ReactNode;
  text?: string;
  className?: string;
}
