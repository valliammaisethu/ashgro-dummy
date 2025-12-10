import { alias, list, primitive, serializable } from "serializr";

export class CustomChart {
  @serializable
  id?: string;

  @serializable
  chartTitle?: string;

  @serializable(list(primitive()))
  labels?: string[];

  @serializable(alias("xaxis"))
  xAxis?: string;

  @serializable
  type?: string;
}
