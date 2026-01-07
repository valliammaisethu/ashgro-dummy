import { getFullName } from "src/shared/utils/helpers";
import { ProspectMeetingEventParams } from "./types";

export const PROSPECT_LABELS = {
  followUpDate: "Follow-up Date",
  leadDetails: "Lead Details",
  feesAndDues: "Fees & Dues",
  activity: "Activity",
  additionalComments: "Additional Comments",
};

export const DETAIL_TITLES = {
  inquiryDate: "Inquiry Date",
  leadSource: "Lead Source",
  membershipCategory: "Membership Category",
  monthlyDues: "Monthly Dues",
  initiationFee: "Initiation Fee",
};

export enum DetailSectionType {
  LEAD_DETAILS = "leadDetails",
  FEES_AND_DUES = "feesAndDues",
  ADDITIONAL_COMMENTS = "additionalComments",
}

export const PLACEHOLDER_DATA = {
  imageUrl:
    "https://i.pinimg.com/1200x/94/f6/a0/94f6a0c5f086c51cf042185aac29d555.jpg",
  activityTitle: "Title",
  activityContent:
    "Prospect expressed interest in learning more about golf club membership options during a call. Shared preliminary details about membership plans, benefits, and facilities. Prospect asked relevant questions regarding pricing, amenities, and guest access.",
};

export const headerConstants = {
  convertToMember: "Convert to member",
  sendEmail: "Send Email",
  bookAMeeting: "Book a meeting",
  viewTranscripts: "View Transcripts",
};

export const defaultType = "prospect";

export const getProspectMeetingEvent = ({
  id,
  firstName = "",
  lastName = "",
}: ProspectMeetingEventParams) => ({
  resource: {
    bookedUserType: defaultType,
    bookedUserId: id,
    bookedUserName: getFullName(firstName, lastName),
  },
});
