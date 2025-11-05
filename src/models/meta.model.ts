import { alias, list, object, primitive, serializable } from "serializr";

export class MobileCode {
  @serializable
  country?: string;

  @serializable(alias("iso_code"))
  isoCode?: string;

  @serializable(alias("phone_code"))
  phoneCode?: string;

  @serializable
  flag?: string;
}

export class ActivityType {
  @serializable
  id?: string;

  @serializable
  type?: string;

  @serializable(alias("sourceName"))
  label?: string;

  @serializable(alias("id"))
  value?: string;
}

export class MembershipCategory {
  @serializable
  id?: string;

  @serializable
  category?: string;
}

export class LeadSource {
  @serializable
  id?: string;

  @serializable
  sourceName?: string;
}

export class LeadStatus {
  @serializable
  id?: string;

  @serializable
  statusName?: string;
}

export class MembershipStatus {
  @serializable
  id?: string;

  @serializable
  statusName?: string;
}

export class EmailTemplate {
  @serializable
  id?: string;

  @serializable
  title?: string;

  @serializable
  subject?: string;

  @serializable
  body?: string;

  @serializable(list(primitive()))
  attachmentIds?: string[];
}

export class StaffDepartment {
  @serializable
  id?: string;

  @serializable
  name?: string;
}
export class LeadSourceParams {
  @serializable
  filter?: string;

  @serializable(list(primitive()))
  leadStatusIds?: string[];
}

export class LeadStatusParams {
  @serializable
  filter?: string;

  @serializable(list(primitive()))
  leadSourceIds?: string[];
}

export class MembershipStatusParams {
  @serializable(list(primitive()))
  leadSourceIds?: string[];

  @serializable
  filter?: string;

  @serializable(list(primitive()))
  membershipCategoryIds?: string[];
}

export class MembershipCategoriesData {
  @serializable(list(object(MembershipCategory)))
  membershipCategories?: MembershipCategory[];
}

export class LeadSourcesData {
  @serializable(list(object(LeadSource)))
  leadSources?: LeadSource[];
}
export class ActivityTypesData {
  @serializable(list(object(ActivityType)))
  activityTypes?: ActivityType[];
}

export class LeadStatusesData {
  @serializable(list(object(LeadStatus)))
  leadStatuses?: LeadStatus[];
}

export class EmailTemplatesData {
  @serializable(list(object(EmailTemplate)))
  emailTemplates?: EmailTemplate[];
}

export class StaffDepartmentsData {
  @serializable(list(object(StaffDepartment)))
  staffDepartments?: StaffDepartment[];
}
