import React, { Fragment, useState } from "react";
import { message } from "antd";
import { IconKey, IconCopy } from "obra-icons-react";

import { useUserRole } from "src/shared/hooks/useUserRole";
import styles from "./settings.module.scss";
import Tabs from "src/shared/components/Tabs";
import { settingsTabs, CHATBOT_CONSTANTS } from "./constants";
import { DrawerPlacement } from "src/enums/drawerPlacement.enum";
import Button from "src/shared/components/Button";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";
import ChangePassword from "src/views/MyProfile/ChangePassword";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";

const {
  SCRIPT_URL,
  MESSAGES: { ERROR, SUCCESS, WARNING },
  LABEL,
} = CHATBOT_CONSTANTS;

const SettingsWrapper = () => {
  const ClubAdminSettings = () => {
    const [activeTab, setActiveTab] = useState("lead");
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);

    const handleChangePassword = () =>
      setChangePasswordVisible((prev) => !prev);

    const handleCopyLink = async () => {
      const user = localStorageHelper.getItem(LocalStorageKeys.USER);
      const clubId = user?.id;
      if (!clubId) return message.warning(WARNING);

      const chatbotScript = `<script src="${SCRIPT_URL}" data-club-id="${clubId}" async></script>`;
      try {
        await navigator.clipboard.writeText(chatbotScript);
        message.success(SUCCESS);
      } catch {
        message.error(ERROR);
      }
    };

    return (
      <Fragment>
        <div className={styles.buttonsContainer}>
          <div className={styles.chatbotLinkContainer} onClick={handleCopyLink}>
            <IconCopy />
            <span>{LABEL}</span>
          </div>
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
