import { primitive, serializable } from "serializr";

export class Pagination {
  @serializable(primitive())
  limit?: number;

  @serializable(primitive())
  page?: number;

  @serializable(primitive())
  overallPages?: number;

  @serializable(primitive())
  overallCount?: number;

  @serializable(primitive())
  previousPage?: number;

  @serializable(primitive())
  currentPage?: number;

  @serializable(primitive())
  nextPage?: number;
}
