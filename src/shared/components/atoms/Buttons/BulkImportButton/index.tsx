import React from "react";
import { IconDocumentUpload } from "obra-icons-react";

import Button from "../../../Button";
import { BulkImportButtonProps } from "src/shared/types/sharedComponents.type";

import styles from "./bulkImportButton.module.scss";

const BulkImportButton = (props: BulkImportButtonProps) => {
  const { onClick, tooltip } = props;

  return (
    <Button
      icon={<IconDocumentUpload size={20} />}
      className={styles.filterButton}
      onClick={onClick}
      tooltip={{
        title: tooltip,
      }}
    />
  );
};

export default BulkImportButton;
