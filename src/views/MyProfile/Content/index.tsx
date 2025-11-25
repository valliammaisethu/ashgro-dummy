import React from "react";
import clsx from "clsx";
import { Divider } from "antd";
import { IconCall, IconCircleClose, IconEmail } from "obra-icons-react";

import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { Colors } from "src/enums/colors.enum";
import { Buttons } from "src/enums/buttons.enum";
import AvatarFallback from "src/shared/components/AvatarFallback";
import Button from "src/shared/components/Button";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { getFullName } from "src/shared/utils/helpers";
import { myProfileConstants } from "../constants";
import { MyProfileContentProps } from "src/shared/types/myProfile.type";

import styles from "../myProfile.module.scss";

export const MyProfileContent = (props: MyProfileContentProps) => {
  const { onOpenEditProfile } = props;
  const user = localStorageHelper.getItem(LocalStorageKeys.USER) ?? {};

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
          className={styles.closeIcon}
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
        <Divider className={styles.divider} />
        <div className={styles.buttons}>
          <Button onClick={onOpenEditProfile} className={styles.editButton}>
            {Buttons.EDIT_PROFILE}
          </Button>
          <Button className={clsx(styles.editButton, styles.changePassword)}>
            {Buttons.CHANGE_PASSWORD}
          </Button>
        </div>
      </div>
    </div>
  );
};
