import React from "react";
import { IconFilterAlt, IconSearch } from "obra-icons-react";
import clsx from "clsx";

import { SearchFieldProps } from "src/shared/types/sharedComponents.type";
import {
  defaultFilterPlaceholder,
  defaultSearchPlaceholder,
} from "src/constants/sharedComponents";

import styles from "./searchField.module.scss";
import { Input } from "antd";
import { Colors } from "src/enums/colors.enum";

const SearchField = (props: SearchFieldProps) => {
  const { onFilter, placeholder = defaultSearchPlaceholder, className } = props;
  return (
    <div className={clsx(styles.searchField, className)}>
      <div className={styles.searchWrapper}>
        <Input
          className={styles.searchFieldContainer}
          placeholder={placeholder}
          prefix={<IconSearch color={Colors.SEARCH_ICON_COLOR} size={18} />}
        />
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
