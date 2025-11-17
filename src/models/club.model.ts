import { list, object, serializable } from "serializr";
import { ProfileDetails } from "./profile.model";
import { Pagination } from "./pagination.model";

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

export class ClubProfile extends ProfileDetails {
  @serializable
  id?: string;

  @serializable
  logoUrl?: string;

  @serializable
  clubName = "";

  @serializable
  clubAddress = "";

  @serializable
  onboardingDate = "";

  @serializable
  status = "";

  @serializable
  chatbotEnabled = false;

  @serializable
  numberOfMembers = 0;

  @serializable(object(ProfileDetails))
  adminDetails = new ProfileDetails();
}

export class ClubData {
  @serializable(object(ClubProfile))
  club = new ClubProfile();
}

export class ClubListData extends ProfileDetails {
  @serializable
  id?: string;

  @serializable
  logoUrl?: string;

  @serializable
  clubName = "";

  @serializable
  clubAddress = "";

  @serializable
  onboardingDate?: string;

  @serializable
  status?: string;

  @serializable
  chatbotEnabled = false;

  @serializable
  numberOfMembers = 0;
}

export class ClubListReponse {
  @serializable(list(object(ClubListData)))
  clubs?: ClubListData[];

  @serializable(object(Pagination))
  pagination?: Pagination;
}
