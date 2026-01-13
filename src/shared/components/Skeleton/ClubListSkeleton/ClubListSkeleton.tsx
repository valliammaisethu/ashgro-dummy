import React from "react";
import { Skeleton } from "antd";
import clsx from "clsx";

import { LoaderSizes } from "src/enums/LoaderSizes";

import styles from "src/views/Clubs/clubs.module.scss";
import stylesSkeleton from "./clubListSkeleton.module.scss";

const { Input, Avatar } = Skeleton;
const { SMALL, DEFAULT } = LoaderSizes;

const ClubListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className={clsx(styles.rowContainer, stylesSkeleton.skeletonRow)}
        >
          <div className={stylesSkeleton.profileSection}>
            <Avatar active size={60} shape="circle" />
            <div className={stylesSkeleton.profileDetails}>
              <Input
                active
                size={SMALL}
                className={stylesSkeleton.nameSkeleton}
              />
              <Input
                active
                size={SMALL}
                className={stylesSkeleton.metaSkeleton}
              />
            </div>
          </div>

          <div className={styles.badge}>
            <Input
              active
              size={SMALL}
              className={stylesSkeleton.badgeSkeleton}
            />
          </div>

          <div className={styles.switchCol}>
            <Input
              active
              size={SMALL}
              className={stylesSkeleton.switchSkeleton}
            />
          </div>

          <div className={stylesSkeleton.actions}>
            <Input
              active
              size={DEFAULT}
              className={stylesSkeleton.actionSkeleton}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default ClubListSkeleton;
