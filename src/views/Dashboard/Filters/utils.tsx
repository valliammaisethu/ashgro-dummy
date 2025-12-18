import { XAxisTypes } from "src/enums/charts.enum";
import {
  ActivityTypesData,
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
    salesActivityData,
  }: {
    leadSourcesData?: LeadSourcesData;
    leadStatusesData?: LeadStatusesData;
    membershipCategoriesData?: MembershipCategoriesData;
    membershipStatusesData?: MembershipStatusData;
    staffDepartmentsData?: StaffDepartmentsData;
    salesActivityData?: ActivityTypesData;
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

    case XAxisTypes.SALES_ACTIVITY:
      return mapToSelectOptionsDynamic(salesActivityData?.activityTypes);

    default:
      return [];
  }
};

interface Status {
  loading: boolean;
  success: boolean;
}
type StatusMap = Record<string, Status>;

export const getActiveQueryStatus = (
  selectedType: XAxisTypes,
  statusBundle: StatusMap,
) => {
  const {
    leadSources,
    leadStatuses,
    membershipCategories,
    membershipStatuses,
    staffDepartments,
    salesActivity,
  } = statusBundle;
  const statusMap = {
    [XAxisTypes.LEAD_SOURCE]: leadSources,
    [XAxisTypes.LEAD_STATUS]: leadStatuses,
    [XAxisTypes.MEMBERSHIP_CATEGORY]: membershipCategories,
    [XAxisTypes.MEMBERSHIP_STATUS]: membershipStatuses,
    [XAxisTypes.STAFF_DEPARTMENT]: staffDepartments,
    [XAxisTypes.SALES_ACTIVITY]: salesActivity,
  };

  return (
    statusMap[selectedType as keyof typeof statusMap] ?? {
      loading: false,
      success: false,
    }
  );
};
