import { serializable, object, list, primitive } from "serializr";
import { ResponseModel } from "./response.model";
import { FALL_BACKS } from "src/constants/common";
import { QueryParams } from "./queryParams.model";
import { Pagination } from "./pagination.model";

const { NOT_AVAILABLE } = FALL_BACKS;

export class StaffMemberDetails {
  @serializable
  id = "";

  @serializable
  attachmentId = "";

  @serializable
  profilePictureUrl = "";

  @serializable
  firstName = "";

  @serializable
  lastName = "";

  @serializable
  email?: string;

  @serializable
  contactNumber?: string;

  @serializable
  countryCode = "+1";

  @serializable
  staffDepartment?: string;

  @serializable
  title?: string;

  @serializable
  birthDate?: string;

  @serializable
  workAnniversaryDate?: string;

  @serializable
  staffDepartmentId?: string;

  @serializable
  residentialAddress?: string;
}

export class StaffData {
  @serializable(object(StaffMemberDetails))
  staff = new StaffMemberDetails();
}

export class StaffDataResponse extends ResponseModel {
  @serializable(object(StaffData))
  data = new StaffData();
}

export class StaffMembersListingParams extends QueryParams {
  @serializable(list(primitive()))
  departmentIds: string[] = [];
}

export class StaffMemberListData {
  @serializable(list(object(StaffMemberDetails)))
  staffs?: StaffMemberDetails[];

  @serializable(object(Pagination))
  pagination?: Pagination;
}
