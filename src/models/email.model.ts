import { alias, list, object, primitive, serializable } from "serializr";

export class EmailModel {
  @serializable
  id?: string;

  @serializable
  email?: string;

  @serializable
  firstName?: string;

  @serializable
  clubId?: string;
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

  @serializable
  clubId?: string;
}

export class SelectedEmailModel {
  @serializable
  id?: string;

  @serializable
  email?: string;

  @serializable
  name?: string;
}

export class EmailRecipientsData {
  @serializable(list(object(EmailModel)))
  prospects?: EmailModel[];

  @serializable
  count = 0;
}

export class EmailTemplates {
  @serializable
  id?: string;

  @serializable(alias("title"))
  label?: string;

  get value(): string | undefined {
    return this.id;
  }
}
