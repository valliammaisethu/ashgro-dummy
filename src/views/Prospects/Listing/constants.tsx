import { ProspectData } from "src/shared/types/sharedComponents.type";

export interface LeadStatusOption {
  label: string;
  value: string;
}

export const TABLE_HEADERS = {
  PROSPECTS: "Prospects",
  FOLLOW_UP_DATE: "Follow-up Date",
  LEAD_SOURCE: "Lead Source",
  LEAD_STATUS: "Lead Status",
} as const;

export const mockProspects: ProspectData[] = [
  {
    id: "1",
    name: "Oliver White",
    email: "oliver.white@example.com",
    phone: "+1-212-456-7890",
    avatar: "https://i.pravatar.cc/150?img=1",
    followUpDate: "12 Aug, 2025",
    leadSource: "Chatbot",
    leadStatus: {
      label: "New lead",
      color: "blue",
    },
  },
  {
    id: "2",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1-213-567-8901",
    avatar: "https://i.pravatar.cc/150?img=2",
    followUpDate: "15 Aug, 2025",
    leadSource: "Website",
    leadStatus: {
      label: "Unqualified",
      color: "default",
    },
  },
  {
    id: "3",
    name: "Liam Smith",
    email: "liam.smith@example.com",
    phone: "+1-214-678-9012",
    avatar: "https://i.pravatar.cc/150?img=3",
    followUpDate: "18 Aug, 2025",
    leadSource: "Referral",
    leadStatus: {
      label: "Hot",
      color: "red",
    },
  },
  {
    id: "4",
    name: "Sophia Brown",
    email: "sophia.brown@example.com",
    phone: "+1-215-789-0123",
    avatar: "https://i.pravatar.cc/150?img=4",
    followUpDate: "20 Aug, 2025",
    leadSource: "Webinar",
    leadStatus: {
      label: "Closed Won",
      color: "green",
    },
  },
  {
    id: "5",
    name: "Noah Williams",
    email: "noah.williams@example.com",
    phone: "+1-216-890-1234",
    avatar: "https://i.pravatar.cc/150?img=5",
    followUpDate: "22 Aug, 2025",
    leadSource: "Social Media",
    leadStatus: {
      label: "Warm",
      color: "orange",
    },
  },
  {
    id: "6",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1-315-654-7890",
    avatar: "https://i.pravatar.cc/150?img=6",
    followUpDate: "10 Sep, 2025",
    leadSource: "Referral",
    leadStatus: {
      label: "Closed Lost",
      color: "red",
    },
  },
];
