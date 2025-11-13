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
}
