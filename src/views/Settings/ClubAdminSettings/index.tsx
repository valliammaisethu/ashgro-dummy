import React, { useState } from "react";

import Tabs from "src/shared/components/Tabs";
import { DrawerPlacement } from "src/enums/drawerPlacement.enum";
import { settingsTabs } from "../constants";

import styles from "../settings.module.scss";

const ClubAdminSettings = () => {
  const [activeTab, setActiveTab] = useState("lead");

  return (
    <div className={styles.settingsWrapper}>
      <Tabs
        items={settingsTabs}
        // TODO: To create commont position enums
        tabPosition={DrawerPlacement.LEFT}
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        className={styles.verticalTabs}
      />
    </div>
  );
};

export default ClubAdminSettings;
