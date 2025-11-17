import { list, object, serializable } from "serializr";
import { ProfileDetails } from "./profile.model";
import { Pagination } from "./pagination.model";
import { ResponseModel } from "./response.model";

export class ClubFormData {
  @serializable
  attachmentId?: string;

  @serializable
  chatbotEnabled?: boolean;

  @serializable
  clubName?: string;

  @serializable
  onboardingDate?: string;

  @serializable
  email?: string;

  @serializable
  contactNumber?: string;

  @serializable
  clubCountryCode = "";

  @serializable
  clubAddress?: string;

  @serializable(object(ProfileDetails))
  adminDetails?: ProfileDetails;

  @serializable
  status?: string;
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

  @serializable
  clubCountryCode = "";

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
  name?: string;

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

export class ClubChatbotStatus {
  @serializable
  chatbotEnabled?: boolean;
}

export class ClubChatbotStatusResponse extends ResponseModel {
  @serializable(object(ClubProfile))
  data?: ClubProfile;
}
