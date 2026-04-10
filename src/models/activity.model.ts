import { serializable } from "serializr";

export class ActivityPayload {
  @serializable
  id?: string;

  @serializable
  createdAt?: string;

  @serializable
  activityTypeId?: string;

  @serializable
  description?: string;

  @serializable
  activityId?: string;
}
