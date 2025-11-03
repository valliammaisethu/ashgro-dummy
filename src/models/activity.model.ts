import { serializable } from "serializr";

export class ActivityPayload {
  @serializable
  id?: string;

  @serializable
  createdAt?: string;

  @serializable
  activityTypeId?: number;

  @serializable
  description?: string;
}
