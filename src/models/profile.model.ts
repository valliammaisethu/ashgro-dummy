import { serializable } from "serializr";

export class ProfileDetails {
  @serializable
  id?: string;

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
  profilePicture = "";

  @serializable
  address = "";

  @serializable
  contactNumber = "";

  @serializable
  attachmentId = "";

  @serializable
  emailId = "";

  @serializable
  isAccountLocked?: boolean;
}
