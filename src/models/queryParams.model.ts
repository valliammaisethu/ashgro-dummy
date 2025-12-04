import { serializable } from "serializr";

export class QueryParams {
  @serializable
  id?: string;

  @serializable
  search = "";

  @serializable
  page = 1;

  @serializable
  limit = 10;

  @serializable
  clubId = "";
}
