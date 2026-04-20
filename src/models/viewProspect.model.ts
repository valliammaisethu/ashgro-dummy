import { serializable, object, list } from "serializr";
import { ResponseModel } from "./response.model";

export class ActivityDetails {
  @serializable
  id?: string;

  @serializable
  activityType?: string;

  @serializable
  description?: string;

  @serializable
  createdAt?: string;

  @serializable
  activityTypeId?: string;
}

export class ViewProspect {
  @serializable
  id?: number;

  @serializable
  attachmentId = "";

  @serializable
  firstName = "";

  @serializable
  lastName = "";

  @serializable
  email = "";

  @serializable
  contactNumber = "";

  @serializable
  countryCode = "";

  @serializable
  phoneCode = "";

  @serializable
  leadStatus = "";

  @serializable
  followUpDate = "";

  @serializable
  leadSource = "";

  @serializable
  inquiryDate = "";

  @serializable
  membershipCategory = "";

  @serializable
  monthlyDues = "";

  @serializable
  initiationFee = "";

  @serializable
  additionalComments = "";

  @serializable(list(object(ActivityDetails)))
  activityDetails: ActivityDetails[] = [];
}

export class ProspectData {
  @serializable(object(ViewProspect))
  prospect = new ViewProspect();
}

export class ProspectDataResponse extends ResponseModel {
  @serializable(object(ProspectData))
  data = new ProspectData();
}
