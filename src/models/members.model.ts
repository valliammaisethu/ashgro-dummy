import { list, primitive, serializable } from "serializr";
import { QueryParams } from "./queryParams.model";

export class MembersListingParams extends QueryParams {
  @serializable(list(primitive()))
  membershipStatusIds?: string[];

  @serializable(list(primitive()))
  membershipCategoriesIds?: string[];

  @serializable(list(primitive()))
  leadSourcesIds?: string[];

  @serializable
  joinedStartDate?: string;

  @serializable
  joinedEndDate?: string;
}
