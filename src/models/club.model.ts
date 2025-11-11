import { serializable } from "serializr";

export class ClubFormData {
  @serializable
  profilePicture?: string;

  @serializable
  chatbotSwitch?: boolean;

  @serializable
  clubName?: string;

  @serializable
  onboardingDate?: string;

  @serializable
  clubEmail?: string;

  @serializable
  clubPhoneNumber?: string;

  @serializable
  clubCountryCode?: string;

  @serializable
  clubAddress?: string;

  @serializable
  firstName?: string;

  @serializable
  lastName?: string;

  @serializable
  email?: string;

  @serializable
  phoneNumber?: string;

  @serializable
  countryCode?: string;

  @serializable
  description?: string;
}
