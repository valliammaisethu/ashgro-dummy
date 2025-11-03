import { object, serializable } from "serializr";
import { ActivityDetails, Prospect } from "./prospects.model";

export class Member extends Prospect {
  @serializable
  joinedDate?: string;

  @serializable
  birthDate?: string;

  @serializable
  residentialAddress?: string;
}

export class MemberFormData {
  @serializable(object(Member))
  member?: Member;

  @serializable(object(ActivityDetails))
  activityDetails?: ActivityDetails;
}
