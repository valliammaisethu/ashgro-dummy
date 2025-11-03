import { alias, serializable } from "serializr";

export class LeadSources {
  @serializable
  id?: string;

  @serializable
  sourceName?: string;

  @serializable(alias("sourceName"))
  label?: string;

  @serializable(alias("id"))
  value?: string;
}
