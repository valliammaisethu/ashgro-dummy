import { XAxisTypes } from "src/enums/charts.enum";

export const xAxisTypesOptions = [
  { label: "Lead Source", value: XAxisTypes.LEAD_SOURCE },
  { label: "Lead Status", value: XAxisTypes.LEAD_STATUS },
  { label: "Membership Category", value: XAxisTypes.MEMBERSHIP_CATEGORY },
  { label: "Membership Status", value: XAxisTypes.MEMBERSHIP_STATUS },
  { label: "Staff Department", value: XAxisTypes.STAFF_DEPARTMENT },
  { label: "Sales Activity", value: XAxisTypes.SALES_ACTIVITY },
  {
    label: "Tour Booking to Conversion Rate",
    value: XAxisTypes.TOUR_BOOKING_TO_CONVERSION_RATE,
  },
];
