import { serializable, object, list, primitive } from "serializr";
import { ResponseModel } from "./response.model";
import { FALL_BACKS } from "src/constants/common";
import { QueryParams } from "./queryParams.model";

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
  email = NOT_AVAILABLE;

  @serializable
  contactNumber = NOT_AVAILABLE;

  @serializable
  countryCode = "+1";

  @serializable
  staffDepartment = NOT_AVAILABLE;

  @serializable
  title = NOT_AVAILABLE;

  @serializable
  birthDate = "";

  @serializable
  workAnniversaryDate = "";

  @serializable
  residentialAddress = NOT_AVAILABLE;
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
