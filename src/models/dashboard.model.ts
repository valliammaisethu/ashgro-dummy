import { list, object, serializable, custom } from "serializr";
import { XAxisTypes } from "src/enums/charts.enum";

const { LEAD_TO_MEMBER_CONVERSION, LEAD_SOURCE } = XAxisTypes;

export class BaseChartModel {
  @serializable
  id = "";

  @serializable
  name = "";
}

export class ChartItem extends BaseChartModel {
  @serializable(
    custom(
      (v: string) => v,
      (v: string) => (v === LEAD_TO_MEMBER_CONVERSION ? LEAD_SOURCE : v),
    ),
  )
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
