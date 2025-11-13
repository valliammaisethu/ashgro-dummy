import { list, object, serializable } from "serializr";
import { ResponseModel } from "./response.model";
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

export class PrimaryContact {
  @serializable
  name = "";

  @serializable
  email = "";

  @serializable
  phoneNumber = "";
}

export class ClubNotes {
  @serializable
  signatureHoles = "";

  @serializable
  tournamentsEvents = "";

  @serializable
  specialAmenities = "";

  @serializable
  memberExperience = "";

  @serializable
  reputationRecognition = "";

  @serializable
  hospitalityCorporateFeatures = "";
}

export class ClubProfile {
  @serializable
  id?: string;

  @serializable
  logoUrl?: string;

  @serializable
  attachmentId = "";

  @serializable
  clubName = "";

  @serializable
  onBoardedDate = "";

  @serializable
  email = "";

  @serializable
  contactNumber = "";

  @serializable
  countryCode = "";

  @serializable
  phoneCode = "";

  @serializable
  address = "";

  @serializable
  chatbotStatus = "";

  @serializable
  memberCount = 0;

  @serializable(object(PrimaryContact))
  primaryContact = new PrimaryContact();

  @serializable(object(ClubNotes))
  notes = new ClubNotes();
}

export class ClubData {
  @serializable(object(ClubProfile))
  club = new ClubProfile();
}

export class ClubDataResponse extends ResponseModel {
  @serializable(object(ClubData))
  data = new ClubData();
}

export class ClubListData {
  @serializable
  id?: string;

  @serializable
  logoUrl?: string;

  @serializable
  clubName = "";

  @serializable
  email?: string;

  @serializable
  contactNumber?: string;

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
