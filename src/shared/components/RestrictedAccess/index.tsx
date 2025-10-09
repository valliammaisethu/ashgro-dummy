import React from "react";
import { SharedComponentsConstants } from "../../../constants/sharedComponents";

function RestrictAccess() {
  return <div>{SharedComponentsConstants.RESTRICTED_ACCESS_TEXT}</div>;
}

export default RestrictAccess;
