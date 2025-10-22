import { ProspectData, ActivityData } from "./types";
import { DETAIL_TITLES, PLACEHOLDER_DATA } from "./constants";

export const mockProspectData: ProspectData = {
  name: "John Durairaj",
  imageUrl: PLACEHOLDER_DATA.imageUrl,
  followUpDate: "12 Aug, 2025",
  contactInfo: {
    email: "test@tm.com",
    phone: "+92 3434434343",
  },
  leadDetails: [
    { title: DETAIL_TITLES.inquiryDate, value: "8 Aug, 2025" },
    { title: DETAIL_TITLES.leadSource, value: "Chatbot" },
    { title: DETAIL_TITLES.membershipCategory, value: "Full Golf" },
  ],
  feesAndDues: [
    { title: DETAIL_TITLES.monthlyDues, value: "$800" },
    { title: DETAIL_TITLES.initiationFee, value: "$200" },
  ],
};

export const mockActivities: ActivityData[] = [
  {
    id: "1",
    title: PLACEHOLDER_DATA.activityTitle,
    content: PLACEHOLDER_DATA.activityContent,
    date: "10:00 AM, 12 Aug 2025",
  },
];
