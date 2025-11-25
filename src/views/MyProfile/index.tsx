import { Popover } from "antd";
import { IconUser } from "obra-icons-react";
import React, { Fragment, useState } from "react";

import { Trigger } from "src/enums/trigger.enum";
import { Placement } from "src/enums/placement.enum";
import { ProfileState } from "src/shared/types/myProfile.type";
import { MyProfileContent } from "./Content";
import EditProfile from "./EditProfile";

import styles from "./myProfile.module.scss";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

const MyProfile = () => {
  const [profileState, setProfileState] = useState<ProfileState>({
    editProfileVisible: false,
    myProfileVisible: false,
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

  const handleOpenEditProfile = () => {
    handleMyProfile();
    handleEditProfile();
  };

  return (
    <Fragment>
      <Popover
        rootClassName={styles.myProfilePopover}
        placement={Placement.BOTTOM_LEFT}
        arrow={false}
        open={profileState.myProfileVisible}
        onOpenChange={handleMyProfile}
        trigger={Trigger.CLICK}
        content={<MyProfileContent onOpenEditProfile={handleOpenEditProfile} />}
      >
        <IconUser className={styles.myProfileIcon} />
      </Popover>
      <ConditionalRenderComponent
        hideFallback
        visible={profileState.editProfileVisible}
      >
        <EditProfile
          onClose={handleEditProfile}
          visible={profileState.editProfileVisible}
        />
      </ConditionalRenderComponent>
    </Fragment>
  );
};
export default MyProfile;
