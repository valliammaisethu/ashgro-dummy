import { serializable, alias } from "serializr";

export class BaseSettingsModel {
  @serializable
  id?: string;

  get value() {
    return this?.id;
  }
}

export class LeadStatus extends BaseSettingsModel {
  @serializable(alias("statusName"))
  label?: string;
}

export class StaffMemberSettings extends BaseSettingsModel {
  @serializable(alias("name"))
  label?: string;
}
