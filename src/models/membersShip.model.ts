import { alias, serializable } from "serializr";

export class MemberShipStatus {
  @serializable
  id?: string;

  @serializable(alias("statusName"))
  label?: string;

  @serializable(alias("id"))
  value?: string;

  @serializable
  color?: string;
}

export class MemberShipTypeStatus {
  @serializable
  id?: string;

  @serializable(alias("categoryName"))
  label?: string;

  @serializable(alias("id"))
  value?: string;

  // TODO: To use BaseSettings model
  @serializable
  color?: string;
}
