import { Popover } from "antd";
import { IconUser } from "obra-icons-react";
import React from "react";

import { Placement } from "src/enums/placement.enum";
import { Trigger } from "src/enums/trigger.enum";
import { MyProfileContent } from "./Content";

import styles from "./myProfile.module.scss";

const MyProfile = () => {
  return (
    <Popover
      rootClassName={styles.myProfilePopover}
      placement={Placement.BOTTOM_LEFT}
      arrow={false}
      trigger={Trigger.CLICK}
      content={MyProfileContent}
    >
      <IconUser />
    </Popover>
  );
};

export default MyProfile;
