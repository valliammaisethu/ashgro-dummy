import { list, object, primitive, serializable } from "serializr";

import { ResponseModel } from "./response.model";
import { Pagination } from "./pagination.model";
import { QueryParams } from "./queryParams.model";

export class ProspectsListingParams extends QueryParams {
  @serializable(list(primitive()))
  leadStatusIds?: string[];

  @serializable(list(primitive()))
  leadSourcesIds?: string[];

  @serializable
  followUpStartDate?: string;

  @serializable
  followUpEndDate?: string;
}

export class ProspectsList {
  @serializable
  id?: string;

  @serializable
  attachmentId?: string;

  @serializable
  firstName?: string;

  @serializable
  endName?: string;

  @serializable
  email?: string;

  @serializable
  contactNumber?: string;

  @serializable
  countryCode?: string;

  @serializable
  leadStatus?: string;

  @serializable
  followUpDate?: string;

  @serializable
  leadSource?: string;
}

export class ProspectsListData {
  @serializable(list(object(ProspectsList)))
  prospects?: ProspectsList[];

  @serializable(object(Pagination))
  pagination?: Pagination;
}

export class ProspectsListResponse extends ResponseModel {
  @serializable(object(ProspectsListData))
  data?: ProspectsListData;
}
