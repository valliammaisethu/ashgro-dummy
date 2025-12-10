import React from "react";
import { Checkbox as CustomCheckbox } from "antd";

import { CustomCheckboxProps } from "src/shared/types/sharedComponents.type";

import styles from "./Checkbox.module.scss";

const Checkbox = ({
  children,
  group,
  options,
  disabled,
  indeterminate,
  defaultChecked,
  onChange,
  checked,
}: CustomCheckboxProps) => {
  return (
    <div className={styles["checkbox-container"]}>
      {group ? (
        <CustomCheckbox.Group
          options={options}
          onChange={(event) => onChange(undefined, event)}
        />
      ) : (
        <CustomCheckbox
          indeterminate={indeterminate}
          defaultChecked={defaultChecked}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        >
          {children}
        </CustomCheckbox>
      )}
    </div>
  );
};

export default Checkbox;
