import { alias, serializable } from "serializr";

export class MobileCode {
  @serializable
  country?: string;

  @serializable(alias("iso_code"))
  isoCode?: string;

  @serializable(alias("phone_code"))
  phoneCode?: string;

  @serializable
  flag?: string;
}
