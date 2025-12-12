import { list, object, serializable } from "serializr";
import { ProfileDetails } from "./profile.model";
import { Pagination } from "./pagination.model";
import { ResponseModel } from "./response.model";

export class ClubGeneralSettings {
  @serializable
  isLeadForms = false;

  @serializable
  isBulkEmail = false;

  @serializable
  noOfEmailTemplatesAllowed?: number;

  @serializable
  noOfCustomChartsAllowed?: number;

  @serializable
  clubId?: string;
}

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
  clubCountryCode?: string = "+1";

  @serializable
  address?: string;

  @serializable
  notes?: string;

  @serializable(object(ProfileDetails))
  adminDetails?: ProfileDetails;

  @serializable
  status?: string;

  @serializable
  knowledgeBaseId?: string;

  @serializable
  knowledgeBaseName?: string;
}

export class ClubProfile extends ClubGeneralSettings {
  @serializable
  id?: string;

  @serializable
  logoUrl?: string;

  @serializable
  name = "";

  @serializable
  email = "";

  @serializable
  contactNumber = "";

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
  attachmentId?: string;

  @serializable
  notes?: string;

  @serializable(object(ProfileDetails))
  adminDetails = new ProfileDetails();

  @serializable
  isClubLocked = false;

  @serializable
  knowledgeBaseId?: string;

  @serializable
  knowledgeBaseName?: string;
}

export class ClubData {
  @serializable(object(ClubProfile))
  club = new ClubProfile();
}

export class ClubListData {
  @serializable
  id?: string;

  @serializable
  logoUrl?: string;

  @serializable
  name?: string;

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
export class ClubStatus {
  @serializable
  chatbotEnabled?: boolean;

  @serializable
  status?: string;

  @serializable
  id?: string;
}

export class ClubStatusResponse extends ResponseModel {
  @serializable(object(ClubProfile))
  data?: ClubProfile;
}

export class ClubKnowledgeBasePayload {
  @serializable
  attachmentId?: string;

  @serializable
  clubId?: string;
}

export class ClubGeneralSettingsResponse extends ResponseModel {
  @serializable(object(ClubProfile))
  data?: ClubProfile;
}
