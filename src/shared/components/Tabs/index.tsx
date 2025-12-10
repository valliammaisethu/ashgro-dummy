import React, { FC } from "react";
import { Tabs as AntdTabs } from "antd";
import { TabsProps as AntdTabsProps } from "antd";

const Tabs: FC<AntdTabsProps> = ({ items = [], ...restProps }) => {
  return <AntdTabs items={items} {...restProps} />;
};

export default Tabs;
