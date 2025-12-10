import { serializable, object } from "serializr";

import { ProfileDetails } from "./profile.model";

export class LeadFormData extends ProfileDetails {
  @serializable
  categoryName?: string;

  @serializable
  additionalComments?: string;
}

export class LeadFormSubmitPayload {
  @serializable(object(LeadFormData))
  leadForm?: LeadFormData;
}
