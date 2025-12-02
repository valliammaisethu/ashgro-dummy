import { XAxisTypes } from "src/enums/charts.enum";

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
