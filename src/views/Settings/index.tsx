import React, { Fragment, useState } from "react";
import { useUserRole } from "src/shared/hooks/useUserRole";
import styles from "./settings.module.scss";
import Tabs from "src/shared/components/Tabs";
import { settingsTabs } from "./constants";
import { DrawerPlacement } from "src/enums/drawerPlacement.enum";
import Button from "src/shared/components/Button";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";
import { IconKey } from "obra-icons-react";
import ChangePassword from "src/views/MyProfile/ChangePassword";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

const SettingsWrapper = () => {
  const ClubAdminSettings = () => {
    const [activeTab, setActiveTab] = useState("lead");
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);

    const handleChangePassword = () =>
      setChangePasswordVisible((prev) => !prev);

    return (
      <Fragment>
        <div className={styles.buttonsContainer}>
          <Button
            type={ButtonTypes.LINK}
            className={styles.changePasswordButton}
            icon={<IconKey />}
            onClick={handleChangePassword}
          >
            {Buttons.CHANGE_PASSWORD}
          </Button>
        </div>
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
        <ConditionalRenderComponent
          visible={changePasswordVisible}
          hideFallback
        >
          <ChangePassword
            onClose={handleChangePassword}
            visible={changePasswordVisible}
          />
        </ConditionalRenderComponent>
      </Fragment>
    );
  };

  const { isClubAdmin } = useUserRole();

  if (isClubAdmin) return <ClubAdminSettings />;
  return null;
};

export default SettingsWrapper;
