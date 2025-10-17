import { list, object, primitive, serializable } from "serializr";

import { ResponseModel } from "./response.model";
import { Pagination } from "./pagination.model";

export class ProspectsListingParams {
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
  @serializable(primitive())
  id?: string;

  @serializable(primitive())
  attachmentId?: string;

  @serializable(primitive())
  firstName?: string;

  @serializable(primitive())
  endName?: string;

  @serializable(primitive())
  email?: string;

  @serializable(primitive())
  contactNumber?: string;

  @serializable(primitive())
  countryCode?: string;

  @serializable(primitive())
  leadStatus?: string;

  @serializable(primitive())
  followUpDate?: string;

  @serializable(primitive())
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
