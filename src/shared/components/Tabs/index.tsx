import React, { FC } from "react";
import { Tabs as AntdTabs } from "antd";
import { TabsProps } from "src/shared/types/sharedComponents.type";

const Tabs: FC<TabsProps> = ({ items = [], ...restProps }) => {
  return <AntdTabs items={items} {...restProps} />;
};

export default Tabs;
