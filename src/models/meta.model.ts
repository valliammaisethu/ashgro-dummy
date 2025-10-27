import { alias, list, object, primitive, serializable } from "serializr";
import { ResponseModel } from "./response.model";

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

export class ActivityType {
  @serializable
  id?: string;

  @serializable
  type?: string;
}

export class MembershipCategory {
  @serializable
  id?: string;

  @serializable
  category?: string;
}

export class LeadSource {
  @serializable
  id?: string;

  @serializable
  sourceName?: string;
}

export class LeadStatus {
  @serializable
  id?: string;

  @serializable
  statusName?: string;
}

export class LeadSourceParams {
  @serializable
  filter?: string;

  @serializable(list(primitive()))
  leadStatusIds?: string[];
}

export class LeadStatusParams {
  @serializable
  filter?: string;

  @serializable(list(primitive()))
  leadSourceIds?: string[];
}

export class MembershipCategoriesData {
  @serializable(list(object(MembershipCategory)))
  membershipCategories?: MembershipCategory[];
}

export class LeadSourcesData {
  @serializable(list(object(LeadSource)))
  leadSources?: LeadSource[];
}
export class ActivityTypesData {
  @serializable(list(object(ActivityType)))
  activityTypes?: ActivityType[];
}

export class LeadStatusesData {
  @serializable(list(object(LeadStatus)))
  leadStatuses?: LeadStatus[];
}

export class MembershipCategoriesResponse extends ResponseModel {
  @serializable(object(MembershipCategoriesData))
  data?: MembershipCategoriesData;
}

export class LeadSourcesResponse extends ResponseModel {
  @serializable(object(ActivityTypesData))
  data?: LeadSourcesData;
}

export class LeadStatusesResponse extends ResponseModel {
  @serializable(object(LeadStatusesData))
  data?: LeadStatusesData;
}

export class ActivityTypesResponse extends ResponseModel {
  @serializable(object(ActivityTypesData))
  data?: ActivityTypesData;
}
