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
  name?: string;

  @serializable
  onboardingDate?: string;

  @serializable
  email?: string;

  @serializable
  contactNumber?: string;

  @serializable
  clubCountryCode = "+1";

  @serializable
  address?: string;

  @serializable
  notes?: string;

  @serializable(object(ProfileDetails))
  adminDetails?: ProfileDetails;
}

export class ClubProfile extends ProfileDetails {
  @serializable
  id?: string;

  @serializable
  logoUrl?: string;

  @serializable
  name = "";

  @serializable
  address = "";

  @serializable
  onboardingDate = "";

  @serializable
  status = "";

  @serializable
  chatbotEnabled = false;

  @serializable
  numberOfMembers = 0;

  @serializable
  clubCountryCode = "+1";

  @serializable
  notes?: string;

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
  name = "";

  @serializable
  address = "";

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

export class ClubEmailValidation {
  @serializable
  email?: string;

  @serializable
  clubId?: string;
}

export class ClubEmailValidationResponse extends ResponseModel {
  @serializable
  isValid?: boolean;
}
