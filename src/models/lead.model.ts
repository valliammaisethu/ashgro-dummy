import { alias, serializable } from "serializr";

export class LeadSources {
  @serializable
  id?: string;

  @serializable(alias("sourceName"))
  label?: string;

  @serializable(alias("id"))
  value?: string;

  // TODO: use common model and make changes across settings page
  @serializable
  color?: string;
}
