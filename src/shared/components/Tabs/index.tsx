import React, { FC } from "react";
import { Tabs as AntdTabs } from "antd";

import { TabsProps } from "src/shared/types/sharedComponents.type";

const Tabs: FC<TabsProps> = ({ items = [], ...restProps }) => {
  return (
    <AntdTabs {...restProps}>
      {items.map((item) => (
        <AntdTabs.TabPane tab={item.label} key={item.key}>
          {item.children}
        </AntdTabs.TabPane>
      ))}
    </AntdTabs>
  );
};

export default Tabs;
