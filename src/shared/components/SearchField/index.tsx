import React, { useState, useEffect, useMemo } from "react";
import { IconFilterAlt, IconSearch } from "obra-icons-react";
import clsx from "clsx";
import { Input } from "antd";
import { debounce } from "lodash";

import { SearchFieldProps } from "src/shared/types/sharedComponents.type";
import {
  defaultFilterPlaceholder,
  defaultSearchPlaceholder,
} from "src/constants/sharedComponents";
import { Colors } from "src/enums/colors.enum";

import styles from "./searchField.module.scss";

const SearchField = (props: SearchFieldProps) => {
  const {
    onSearch,
    onFilter,
    placeholder = defaultSearchPlaceholder,
    className,
    debounceTime = 500,
  } = props;

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (onSearch) onSearch(value);
      }, debounceTime),
    [onSearch, debounceTime],
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  return (
    <div className={clsx(styles.searchField, className)}>
      <div className={styles.searchWrapper}>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
