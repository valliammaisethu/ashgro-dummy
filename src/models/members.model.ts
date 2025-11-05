import { list, object, primitive, serializable } from "serializr";
import { QueryParams } from "./queryParams.model";
import { ActivityDetails, Prospect } from "./prospects.model";
import { Pagination } from "./pagination.model";
import { defaultCountryCode } from "src/constants/common";

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

export class Member extends Prospect {
  @serializable
  joinedDate?: string;

  @serializable
  birthDate?: string;

  @serializable
  residentialAddress?: string;

  @serializable
  profilePictureUrl?: string;

  @serializable
  leadSource?: string;

  @serializable
  membershipCategory?: string;

  @serializable
  resignationDate?: string;

  @serializable
  membershipStatusId?: string;

  @serializable
  membershipStatus?: string;

  @serializable
  countryCode?: string = defaultCountryCode;
}

export class MemberFormData {
  @serializable(object(Member))
  member?: Member;

  @serializable(object(ActivityDetails))
  activityDetails?: ActivityDetails;
}

export class MemberDetails extends Member {
  @serializable(list(object(ActivityDetails)))
  activityDetails?: ActivityDetails[];
}

export class MembersListData {
  @serializable(list(object(Member)))
  members?: Member[];

  @serializable(object(Pagination))
  pagination?: Pagination;
}
