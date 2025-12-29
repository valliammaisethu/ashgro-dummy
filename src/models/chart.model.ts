import { alias, list, object, primitive, serializable } from "serializr";

import { ResponseModel } from "./response.model";

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

class AvailabilityData {
  @serializable
  success?: boolean;
}

export class CustomChartAvailability extends ResponseModel {
  @serializable(object(AvailabilityData))
  data?: AvailabilityData;
}
