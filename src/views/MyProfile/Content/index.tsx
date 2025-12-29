import React from "react";
import clsx from "clsx";
import { Divider } from "antd";
import { useQuery } from "@tanstack/react-query";
import { IconCall, IconCircleClose, IconEmail } from "obra-icons-react";

import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { Colors } from "src/enums/colors.enum";
import { Buttons } from "src/enums/buttons.enum";
import AvatarFallback from "src/shared/components/AvatarFallback";
import Button from "src/shared/components/Button";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { AttachmentService } from "src/services/AttachmentService/attachment.service";
import { getFullName } from "src/shared/utils/helpers";
import { formatPhone } from "src/shared/utils/parser";
import { myProfileConstants, ModalType } from "../constants";
import { MyProfileContentProps } from "src/shared/types/myProfile.type";

import styles from "../myProfile.module.scss";

export const MyProfileContent = (props: MyProfileContentProps) => {
  const { onOpenModal, closeMyProfile } = props;
  const user = localStorageHelper.getItem(LocalStorageKeys.USER) ?? {};

  const handleEditProfile = () => onOpenModal(ModalType.EDIT_PROFILE);
  const handleChangePassword = () => onOpenModal(ModalType.CHANGE_PASSWORD);

  const { getAttachmentPreview } = AttachmentService();

  const { data: profilePicUrl } = useQuery(
    getAttachmentPreview(user?.attachmentId),
  );

  return (
    <div className={styles.myProfileContent}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <AvatarFallback
            backgroundColor={Colors.ASHGRO_NAVY}
            src={profilePicUrl}
            name={getFullName(user?.firstName, user?.lastName)}
            className={styles.customAvatar}
          />
        </div>
        <IconCircleClose
          size={20}
          strokeWidth={1.5}
          color={Colors.MODAL_CLOSE_ICON}
          className={styles.closeIcon}
          onClick={closeMyProfile}
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
          +1 {formatPhone(user?.contactNumber)}
        </div>
        <Divider className={styles.divider} />
        <div className={styles.buttons}>
          <Button onClick={handleEditProfile} className={styles.editButton}>
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
