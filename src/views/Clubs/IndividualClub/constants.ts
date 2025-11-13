import { ClubProfile } from "src/models/club.model";

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

export const NOTES_CATEGORIES = {
  signatureHoles: "Signature Holes",
  tournamentsEvents: "Tournaments & Events",
  specialAmenities: "Special Amenities",
  memberExperience: "Member Experience",
  reputationRecognition: "Reputation/Recognition",
  hospitalityCorporateFeatures: "Hospitality & Corporate Features",
};

export const NOTES_PLACEHOLDERS = {
  signatureHoles:
    "Mention any iconic or challenging holes that define the course experience.",
  tournamentsEvents:
    "Record if the club hosts professional tournaments, corporate outings, charity events, or annual member competitions.",
  specialAmenities:
    "Capture details beyond golf — spa, fitness center, swimming pool, tennis courts, fine dining, wine cellar, or private lounges.",
  memberExperience:
    "Add notes on personalized services such as caddie programs, golf instruction by certified professionals, or junior golf academies.",
  reputationRecognition:
    "Awards, rankings in golf magazines, or historic significance.",
  hospitalityCorporateFeatures:
    "Conference/event facilities, business networking opportunities, or private event hosting.",
};

export const ClubStatusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const headerConstants = {
  chatbotQuestions: "Chatbot Questions",
};

export const clubStatusField = "clubStatus";

export const mockClubData: ClubProfile = {
  id: "1",
  attachmentId: "club-image-id",
  clubName: "V Mayfair",
  onBoardedDate: "2025-08-12",
  email: "v.mayfair@example.com",
  contactNumber: "2124567890",
  countryCode: "+1",
  phoneCode: "+1",
  address: "600 14th St NW, Washington, DC 20005, United States",
  chatbotStatus: "active",
  memberCount: 60,
  primaryContact: {
    name: "Jim Halpert",
    email: "admin.mayfair@example.com",
    phoneNumber: "+1-212-456-7890",
  },
  notes: {
    signatureHoles:
      "Mention any iconic or challenging holes that define the course experience.",
    tournamentsEvents:
      "Record if the club hosts professional tournaments, corporate outings, charity events, or annual member competitions.",
    specialAmenities:
      "Capture details beyond golf — spa, fitness center, swimming pool, tennis courts, fine dining, wine cellar, or private lounges.",
    memberExperience:
      "Add notes on personalized services such as caddie programs, golf instruction by certified professionals, or junior golf academies.",
    reputationRecognition:
      "Awards, rankings in golf magazines, or historic significance.",
    hospitalityCorporateFeatures:
      "Conference/event facilities, business networking opportunities, or private event hosting.",
  },
};
