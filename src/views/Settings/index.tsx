import React, { useState } from "react";
import { useUserRole } from "src/shared/hooks/useUserRole";
import styles from "./settings.module.scss";
import Tabs from "src/shared/components/Tabs";
import { settingsTabs } from "./constants";
import { DrawerPlacement } from "src/enums/drawerPlacement.enum";

const SettingsWrapper = () => {
  const SuperAdminSettings = () => {
    return <div>SuperAdminSettings</div>;
  };

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

  const { isSuperAdmin, isClubAdmin } = useUserRole();

  if (isSuperAdmin) return <SuperAdminSettings />;
  if (isClubAdmin) return <ClubAdminSettings />;
  return null;
};

export default SettingsWrapper;
