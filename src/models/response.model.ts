import { list, object, serializable } from "serializr";

export class ResponseModel {
  @serializable
  title?: string;

  @serializable
  description?: string;

  @serializable
  success?: boolean;

  @serializable
  error?: string;
}

export class SlotItem {
  @serializable
  id?: number;

  @serializable
  startTime?: string;

  @serializable
  endTime?: string;
}

export class ChatbotDataModel {
  @serializable
  response?: string;

  @serializable
  responseType?: string;

  @serializable(list(object(SlotItem)))
  slots?: SlotItem[];
}

export class ChatbotResponse extends ResponseModel {
  @serializable(object(ChatbotDataModel))
  data?: ChatbotDataModel;
}

export class ChatbotPayload {
  @serializable
  message?: string;

  @serializable
  sessionId?: string;

  @serializable
  clubId?: string;

  @serializable
  slotId?: number;

  @serializable
  isSlotBooking?: boolean;
}

export class ChatbotProfile {
  @serializable
  clubName?: string;

  @serializable
  clubLogo?: string;
}
export class ChatbotProfileResposne extends ResponseModel {
  @serializable(object(ChatbotProfile))
  data?: ChatbotProfile;
}
