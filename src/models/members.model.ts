import { list, object, primitive, serializable } from "serializr";
import { QueryParams } from "./queryParams.model";
import { ActivityDetails, Prospect } from "./prospects.model";
import { Pagination } from "./pagination.model";
import { CountryCode } from "src/enums/countryCodes.enum";

export class MembersListingParams extends QueryParams {
  @serializable(list(primitive()))
  membershipStatusIds?: string[];

  @serializable(list(primitive()))
  membershipCategoryIds?: string[];

  @serializable(list(primitive()))
  leadSourceIds?: string[];

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
  countryCode = CountryCode.USA;
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
