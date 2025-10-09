import React from "react";
import { Switch as AntSwitch } from "antd";

import { SwitchFieldProps } from "src/shared/types/sharedComponents.type";

const Switch = (props: SwitchFieldProps) => <AntSwitch {...props} />;

export default Switch;
