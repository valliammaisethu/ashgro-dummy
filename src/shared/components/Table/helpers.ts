import { defaultCountryCode } from "src/constants/common";

export const formatTablePhoneNumber = (phone?: string) => {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10
    ? `${defaultCountryCode}-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
    : phone;
};
