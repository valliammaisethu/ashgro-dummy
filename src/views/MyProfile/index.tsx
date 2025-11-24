import { Divider, Popover } from "antd";
import {
  IconCall,
  IconCircleClose,
  IconEmail,
  IconUser,
} from "obra-icons-react";
import React, { Fragment, useState } from "react";
import clsx from "clsx";

import AvatarFallback from "src/shared/components/AvatarFallback";
import Button from "src/shared/components/Button";
import { Colors } from "src/enums/colors.enum";
import { Trigger } from "src/enums/trigger.enum";
import { Placement } from "src/enums/placement.enum";
import { Buttons } from "src/enums/buttons.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { getFullName } from "src/shared/utils/helpers";
import {
  MyProfileContentProps,
  ProfileState,
} from "src/shared/types/myProfile.type";
import { myProfileConstants } from "./constants";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

import styles from "./myProfile.module.scss";

const MyProfileContent: React.FC<MyProfileContentProps> = ({
  onClose,
  onCloseEditProfile,
  onCloseChangePassword,
}) => {
  const user = localStorageHelper.getItem(LocalStorageKeys.USER);

  const handleEditProfileForm = () => {
    onClose();
    onCloseEditProfile();
  };

  const handleChangePassword = () => {
    onClose();
    onCloseChangePassword();
  };

  return (
    <div className={styles.myProfileContent}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <AvatarFallback
            backgroundColor={Colors.ASHGRO_NAVY}
            src={user?.profilePicUrl}
            name={getFullName(user?.firstName, user?.lastName)}
            className={styles.customAvatar}
          />
        </div>
        <IconCircleClose
          size={20}
          strokeWidth={1.5}
          color={Colors.MODAL_CLOSE_ICON}
          onClick={onClose}
          className={styles.myProfileIcon}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.name}>
          {myProfileConstants.hi} {getFullName(user?.firstName, user?.lastName)}
          !
        </div>
        <div className={styles.email}>
          <IconEmail color={Colors.ASHGRO_GOLD} size={16} />
          {user.email}
        </div>
        <div className={styles.phone}>
          <IconCall size={16} color={Colors.ASHGRO_GOLD} />
          {user?.phone}
        </div>
        <Divider className={styles.divider}></Divider>
        <div className={styles.buttons}>
          <Button onClick={handleEditProfileForm} className={styles.editButton}>
            {Buttons.EDIT_PROFILE}
          </Button>
          <Button
            onClick={handleChangePassword}
            className={clsx(styles.editButton, styles.changePassword)}
          >
            {Buttons.CHANGE_PASSWORD}
          </Button>
        </div>
      </div>
    </div>
  );
};

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

  return (
    <Fragment>
      <Popover
        rootClassName={styles.myProfilePopover}
        placement={Placement.BOTTOM_LEFT}
        arrow={false}
        open={profileState.myProfileVisible}
        onOpenChange={handleMyProfile}
        trigger={Trigger.CLICK}
        content={
          <MyProfileContent
            onCloseEditProfile={handleEditProfile}
            onCloseChangePassword={handleChangePassword}
            onClose={handleMyProfile}
          />
        }
      >
        <IconUser className={styles.myProfileIcon} />
      </Popover>
      <EditProfile
        onClose={handleEditProfile}
        visible={profileState.editProfileVisible}
      />
      <ChangePassword
        onClose={handleChangePassword}
        visible={profileState.changePasswordVisible}
      />
    </Fragment>
  );
};

export default MyProfile;
