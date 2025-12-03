import { alias, serializable } from "serializr";

export class ProfileDetails {
  @serializable(alias("id"))
  id?: string;

  @serializable
  firstName?: string;

  @serializable
  lastName?: string;

  @serializable
  email?: string;

  @serializable
  phoneNumber?: string;

  @serializable
  countryCode?: string = "+1";

  @serializable
  profilePicture?: string;

  @serializable
  address?: string;

  @serializable
  contactNumber?: string;

  @serializable
  attachmentId?: string;

  @serializable
  emailId?: string;
}
