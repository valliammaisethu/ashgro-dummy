import { XAxisTypes, XAxisTypesLabels } from "src/enums/charts.enum";

const {
  LEAD_SOURCE,
  LEAD_STATUS,
  MEMBERSHIP_CATEGORY,
  MEMBERSHIP_STATUS,
  STAFF_DEPARTMENT,
  SALES_ACTIVITY,
} = XAxisTypes;

const {
  LEAD_SOURCE: leadSourceLabel,
  LEAD_STATUS: leadStatusLabel,
  MEMBERSHIP_CATEGORY: membershipCategoryLabel,
  MEMBERSHIP_STATUS: membershipStatusLabel,
  STAFF_DEPARTMENT: staffDepartmentLabel,
  SALES_ACTIVITY: salesActivityLabel,
} = XAxisTypesLabels;

export const xAxisTypesOptions = [
  { label: leadSourceLabel, value: LEAD_SOURCE },
  { label: leadStatusLabel, value: LEAD_STATUS },
  { label: membershipCategoryLabel, value: MEMBERSHIP_CATEGORY },
  { label: membershipStatusLabel, value: MEMBERSHIP_STATUS },
  { label: staffDepartmentLabel, value: STAFF_DEPARTMENT },
  { label: salesActivityLabel, value: SALES_ACTIVITY },
];
