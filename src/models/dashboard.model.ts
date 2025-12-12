import { list, object, serializable } from "serializr";

export class BaseChartModel {
  @serializable
  id = "";

  @serializable
  name = "";
}

export class ChartItem extends BaseChartModel {
  @serializable
  type?: string;

  @serializable
  isDefault = false;

  @serializable
  order?: number;

  @serializable
  path?: string;
}

export class ChartLabel extends BaseChartModel {
  @serializable
  count?: number;
}

export class ChartDetail extends ChartItem {
  @serializable(list(object(ChartLabel)))
  values?: ChartLabel[];
}
