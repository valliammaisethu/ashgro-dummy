import { serializable } from "serializr";

export class QueryParams {
  @serializable
  search?: string;

  @serializable
  page?: number;

  @serializable
  limit?: number;

  @serializable
  clubId?: string;
}
