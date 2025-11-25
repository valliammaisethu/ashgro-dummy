import React from "react";

import { BulkImportButtonProps } from "src/shared/types/sharedComponents.type";

import styles from "./bulkImportButton.module.scss";
import Button from "../../Button";
import { IconDocumentUpload } from "obra-icons-react";

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
