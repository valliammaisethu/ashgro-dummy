import { XAxisTypes } from "src/enums/charts.enum";
import {
  LeadSourcesData,
  LeadStatusesData,
  MembershipCategoriesData,
  MembershipStatusData,
  StaffDepartmentsData,
} from "src/models/meta.model";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";

export const getChartFilterLabel = (selectedType: XAxisTypes) => {
  switch (selectedType) {
    case XAxisTypes.LEAD_SOURCE:
      return "Lead Source(s)";

    case XAxisTypes.LEAD_STATUS:
      return "Lead Status(es)";

    case XAxisTypes.MEMBERSHIP_CATEGORY:
      return "Membership Category(ies)";

    case XAxisTypes.MEMBERSHIP_STATUS:
      return "Membership Status(es)";

    case XAxisTypes.STAFF_DEPARTMENT:
      return "Staff Department(s)";

    default:
      return "Filters";
  }
};

export const getDynamicLabelOptions = (
  selectedType: XAxisTypes,
  {
    leadSourcesData,
    leadStatusesData,
    membershipCategoriesData,
    membershipStatusesData,
    staffDepartmentsData,
  }: {
    leadSourcesData?: LeadSourcesData;
    leadStatusesData?: LeadStatusesData;
    membershipCategoriesData?: MembershipCategoriesData;
    membershipStatusesData?: MembershipStatusData;
    staffDepartmentsData?: StaffDepartmentsData;
  },
) => {
  switch (selectedType) {
    case XAxisTypes.LEAD_SOURCE:
      return mapToSelectOptionsDynamic(leadSourcesData?.leadSources);

    case XAxisTypes.LEAD_STATUS:
      return mapToSelectOptionsDynamic(leadStatusesData?.leadStatuses);

    case XAxisTypes.MEMBERSHIP_CATEGORY:
      return mapToSelectOptionsDynamic(
        membershipCategoriesData?.membershipCategories,
      );

    case XAxisTypes.MEMBERSHIP_STATUS:
      return mapToSelectOptionsDynamic(
        membershipStatusesData?.membershipStatuses,
      );

    case XAxisTypes.STAFF_DEPARTMENT:
      return mapToSelectOptionsDynamic(staffDepartmentsData?.staffDepartments);

    default:
      return [];
  }
};
