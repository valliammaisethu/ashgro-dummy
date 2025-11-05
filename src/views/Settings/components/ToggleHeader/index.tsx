import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./toggleHeader.module.scss";
import { ButtonTypes } from "src/enums/buttons.enum";

export interface ToggleHeaderOption<Key extends string = string> {
  key: Key;
  label: string;
}

interface ToggleHeaderProps<Key extends string = string> {
  options?: ToggleHeaderOption<Key>[];
  activeKey?: Key;
  onChange?: (key: Key) => void;
  onAdd?: () => void;
}

const ToggleHeader = <Key extends string>({
  options,
  activeKey,
  onChange,
  onAdd,
}: ToggleHeaderProps<Key>) => {
  const handleChange = (key: Key) => () => onChange?.(key);

  return (
    <div className={styles.headerRow}>
      <div className={styles.toggleGroup}>
        {options?.map((opt) => (
          <button
            key={opt.key}
            className={`${styles.toggleBtn} ${activeKey === opt.key ? styles.active : ""}`}
            onClick={handleChange(opt.key)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {onAdd && (
        <Button
          type={ButtonTypes.PRIMARY}
          icon={<PlusOutlined />}
          className={styles.addButton}
          onClick={onAdd}
        >
          Add
        </Button>
      )}
    </div>
  );
};

export default ToggleHeader;
