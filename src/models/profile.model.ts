import { serializable } from "serializr";

export class ProfileDetails {
  @serializable
  firstName = "";

  @serializable
  lastName = "";

  @serializable
  email = "";

  @serializable
  phoneNumber?: string;

  @serializable
  countryCode?: string;

  @serializable
  profilePicture?: string;

  @serializable
  address?: string;

  @serializable
  contactNumber = "";

  @serializable
  notes?: string;

  @serializable
  attachmentId = "";
}
