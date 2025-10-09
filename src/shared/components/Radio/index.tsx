import React from "react";
import { Radio, Space } from "antd";

import { RadioExtendedProps } from "src/shared/types/sharedComponents.type";

const RadioButton = ({ label, ...props }: RadioExtendedProps) => (
  <Space>
    {label && <span>{label}</span>}
    <Radio.Group {...props} />
  </Space>
);

export default RadioButton;
