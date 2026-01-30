import { DateFormats } from "src/enums/dateFormats.enum";
import { formatDate } from "src/shared/utils/dateUtils";
import { formatCurrency, fillEmptyData } from "src/shared/utils/helpers";
import { toTitleCase } from "src/shared/utils/parser";

interface DetailItem {
  title: string;
  value: string;
}

export const getLeadDetails = (
  inquiryDate = "",
  leadSource = "",
  membershipCategory = "",
  detailTitles: {
    inquiryDate: string;
    leadSource: string;
    membershipCategory: string;
  },
): DetailItem[] => {
  return [
    {
      title: detailTitles.inquiryDate,
      value: fillEmptyData(formatDate(inquiryDate, DateFormats.MMM_DD__YYYY)),
    },
    {
      title: detailTitles.leadSource,
      value: fillEmptyData(toTitleCase(leadSource)),
    },
    {
      title: detailTitles.membershipCategory,
      value: fillEmptyData(toTitleCase(membershipCategory)),
    },
  ];
};

export const getPhoneNumber = (
  countryCode?: string,
  contactNumber?: string,
) => {
  if (!contactNumber) return "";
  return `${fillEmptyData(countryCode)} ${fillEmptyData(contactNumber)}`.trim();
};

export const getFeesAndDues = (
  monthlyDues: number | string = 0,
  initiationFee: number | string = 0,
  detailTitles: {
    monthlyDues: string;
    initiationFee: string;
  },
): DetailItem[] => {
  return [
    {
      title: detailTitles.monthlyDues,
      value: formatCurrency(monthlyDues),
    },
    {
      title: detailTitles.initiationFee,
      value: formatCurrency(initiationFee),
    },
  ];
};
