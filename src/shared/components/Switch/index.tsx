import React from "react";
import { Switch as AntSwitch } from "antd";

import { SwitchFieldProps } from "src/shared/types/sharedComponents.type";

import styles from "./switch.module.scss";

const Switch = (props: SwitchFieldProps) => (
  <div className={styles["switch-component"]}>
    <AntSwitch {...props} />
  </div>
);

export default Switch;
