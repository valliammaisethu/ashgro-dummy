import { serializable } from "serializr";
import { ProfileDetails } from "./profile.model";

export class ClubFormData extends ProfileDetails {
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
  description?: string;
}
