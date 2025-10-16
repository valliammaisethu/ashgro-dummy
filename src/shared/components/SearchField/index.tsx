import React from "react";
import { IconFilterAlt, IconSearch } from "obra-icons-react";
import clsx from "clsx";

import { SearchFieldProps } from "src/shared/types/sharedComponents.type";
import {
  defaultFilterPlaceholder,
  defaultSearchPlaceholder,
} from "src/constants/sharedComponents";

import styles from "./searchField.module.scss";

const SearchField = (props: SearchFieldProps) => {
  const { onFilter, placeholder = defaultSearchPlaceholder, className } = props;
  return (
    <div className={clsx(styles.searchField, className)}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchFieldContainer}>
          <div>{<IconSearch size={18} />}</div>
          <div>{placeholder}</div>
        </div>
        {onFilter && (
          <div
            title={defaultFilterPlaceholder}
            className={styles.filterContainer}
          >
            <IconFilterAlt size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchField;
