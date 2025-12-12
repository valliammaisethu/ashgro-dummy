import { alias, list, primitive, serializable } from "serializr";

export class CustomChart {
  @serializable
  id?: string;

  @serializable
  name?: string;

  @serializable(list(primitive()))
  values?: string[];

  @serializable(alias("xaxis"))
  xAxis?: string;

  @serializable
  type?: string;
}
