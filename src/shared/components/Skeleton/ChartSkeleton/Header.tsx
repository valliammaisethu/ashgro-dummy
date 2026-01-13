import React from "react";
import { Skeleton } from "antd";

import { LoaderSizes } from "src/enums/LoaderSizes";
import styles from "./chartSkeleton.module.scss";

const { Input, Button } = Skeleton;
const { DEFAULT } = LoaderSizes;

const Header = () => {
  return (
    <div className={styles.header}>
      <Input active size={DEFAULT} className={styles.headerInput} />
      <div className={styles.headerActions}>
        <Button active size={DEFAULT} shape="round" />
        <Button active size={DEFAULT} shape="round" />
      </div>
    </div>
  );
};

export default Header;
