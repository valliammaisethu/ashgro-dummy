import { Colors } from "src/enums/colors.enum";

export const CLUB_LABELS = {
  onBoardedDate: "On-Boarded Date",
  primaryContactDetails: "Primary Contact Details",
  notes: "Notes",
  chatbotStatus: "Chatbot Status",
  members: "Members",
};

export const CONTACT_TITLES = {
  name: "Name",
  emailAddress: "Email Address",
  phoneNumber: "Phone Number",
};

export const ClubStatusOptions = [
  { label: "Active", value: "ACTIVE", color: Colors.ACTIVE_GREEN },
  { label: "Inactive", value: "INACTIVE", color: Colors.INACTIVE_GREY },
];

export const headerConstants = {
  chatbotQuestions: "Chatbot Questions",
  unlockClub: "Unlock Club",
};

export const clubStatusField = "clubStatus";

export const unlockClubModalConstants = {
  title: "Unlock Club?",
  description: `Are you sure you want to unlock “%s” club?`,
};

export const chatbotKnowledgeBaseConstants = {
  requiredError: "Chatbot knowledge base is required",
  requiredDescription:
    "Please upload the chatbot knowledge base before enabling chatbot",
  disabledError: "Chatbot knowledge base disabled!",
  disabledDescription: "Chatbot knowledge base will be disabled",
};
