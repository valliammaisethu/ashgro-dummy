import { list, object, primitive, serializable } from "serializr";

export class EmailModel {
  @serializable
  email?: string;

  @serializable
  firstName?: string;
}

export class SendEmail {
  @serializable(list(object(EmailModel)))
  to?: EmailModel[];

  @serializable(list(primitive()))
  cc?: string[];

  @serializable(list(primitive()))
  bcc?: string[];

  @serializable(list(primitive()))
  attachmentIds?: string[];

  @serializable
  subject?: string;

  @serializable
  body?: string;
}

export class SelectedEmailModel {
  @serializable
  id?: string;

  @serializable
  email?: string;

  @serializable
  name?: string;
}
