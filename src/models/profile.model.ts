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
  countryCode = "+1";

  @serializable
  profilePicture?: string;

  @serializable
  address?: string;

  @serializable
  contactNumber = "";

  @serializable
  attachmentId = "";
}
