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

// TODO: TO rename StaffMemberSettings and use
export class PaginatedOptions extends BaseSettingsModel {
  @serializable(alias("name"))
  label?: string;
}

export class BasicProfile {
  @serializable
  firstName = "";

  @serializable
  lastName = "";

  @serializable
  email?: string;

  @serializable
  profilePictureUrl?: string;
}
