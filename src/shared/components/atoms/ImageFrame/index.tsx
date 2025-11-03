import React from "react";
import clsx from "clsx";

import defaultProfile from "src/assets/images/default-profile.webp";
import { profileAlt } from "./constants";

import styles from "./ImageFrame.module.scss";

interface ImageFrameProps {
  src?: string;
  className?: string;
}

const ImageFrame = ({ src, className = "" }: ImageFrameProps) => {
  return (
    <div className={clsx(styles.imageContainer, className)}>
      <img
        src={src || defaultProfile}
        alt={profileAlt}
        className={styles.profileImg}
      />
    </div>
  );
};

export default ImageFrame;
