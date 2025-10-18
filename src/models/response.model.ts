import { serializable } from "serializr";

export class ResponseModel {
  @serializable
  title?: string;

  @serializable
  description?: string;

  @serializable
  success?: boolean;
}
