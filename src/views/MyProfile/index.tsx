import { Popover } from "antd";
import { IconUser } from "obra-icons-react";
import React, { Fragment, useState } from "react";

import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { Trigger } from "src/enums/trigger.enum";
import { Placement } from "src/enums/placement.enum";
import { ProfileState } from "src/shared/types/myProfile.type";
import { MyProfileContent } from "./Content";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import { ModalType } from "./constants";

import styles from "./myProfile.module.scss";

const MyProfile = () => {
  const [profileState, setProfileState] = useState<ProfileState>({
    editProfileVisible: false,
    myProfileVisible: false,
    changePasswordVisible: false,
  });

  const handleMyProfile = () =>
    setProfileState((prev) => ({
      ...prev,
      myProfileVisible: !prev.myProfileVisible,
    }));

  const handleEditProfile = () =>
    setProfileState((prev) => ({
      ...prev,
      editProfileVisible: !prev.editProfileVisible,
    }));

  const handleChangePassword = () =>
    setProfileState((prev) => ({
      ...prev,
      changePasswordVisible: !prev.changePasswordVisible,
    }));

  const handleOpenModal = (type: ModalType) => {
    handleMyProfile();
    if (type === ModalType.EDIT_PROFILE) handleEditProfile();
    else if (type === ModalType.CHANGE_PASSWORD) handleChangePassword();
  };

  return (
    <Fragment>
      <Popover
        rootClassName={styles.myProfilePopover}
        placement={Placement.BOTTOM_LEFT}
        arrow={false}
        open={profileState.myProfileVisible}
        destroyOnHidden
        destroyTooltipOnHide
        onOpenChange={handleMyProfile}
        trigger={Trigger.CLICK}
        content={
          <MyProfileContent
            closeMyProfile={handleMyProfile}
            onOpenModal={handleOpenModal}
          />
        }
      >
        <IconUser className={styles.myProfileIcon} />
      </Popover>
      <ConditionalRenderComponent
        hideFallback
        visible={profileState.changePasswordVisible}
      >
        <ChangePassword
          onClose={handleChangePassword}
          visible={profileState.changePasswordVisible}
        />
      </ConditionalRenderComponent>
      <EditProfile
        onClose={handleEditProfile}
        visible={profileState.editProfileVisible}
      />
    </Fragment>
  );
};
export default MyProfile;
