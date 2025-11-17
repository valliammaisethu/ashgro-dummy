import { serializable } from "serializr";

export class ProfileDetails {
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
  profilePicture?: string;

  @serializable
  address?: string;

  @serializable
  contactNumber?: string;

  @serializable
  notes?: string;

  @serializable
  attachmentId = "";
}
