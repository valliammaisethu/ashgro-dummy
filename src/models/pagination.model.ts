import { serializable } from "serializr";

export class Pagination {
  @serializable
  limit?: number;

  @serializable
  page?: number;

  @serializable
  overallPages?: number;

  @serializable
  overallCount?: number;

  @serializable
  previousPage?: number;

  @serializable
  currentPage?: number;

  @serializable
  nextPage?: number;
}
