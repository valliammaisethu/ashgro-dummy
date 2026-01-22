import React, { useState, useEffect, useMemo } from "react";
import { IconClose, IconFilterAlt, IconSearch } from "obra-icons-react";
import clsx from "clsx";
import { Input, Tooltip } from "antd";
import { debounce } from "lodash";

import { SearchFieldProps } from "src/shared/types/sharedComponents.type";
import {
  defaultFilterPlaceholder,
  defaultSearchPlaceholder,
} from "src/constants/sharedComponents";
import { Colors } from "src/enums/colors.enum";
import ConditionalRenderComponent from "../ConditionalRenderComponent";
import { POINTER_CONSTANTS } from "src/views/Calender/ChatbotSlot/constants";

import styles from "./searchField.module.scss";

const SearchField = (props: SearchFieldProps) => {
  const {
    onSearch,
    onFilter,
    placeholder = defaultSearchPlaceholder,
    className,
    debounceTime = 500,
    filtersActive = false,
  } = props;

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (onSearch) onSearch(value);
      }, debounceTime),
    [onSearch, debounceTime],
  );

  const handleClear = () => {
    setSearchTerm("");
    onSearch?.("");
  };

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
          suffix={
            <ConditionalRenderComponent visible={!!searchTerm} hideFallback>
              <IconClose
                cursor={POINTER_CONSTANTS.POINTER}
                color={Colors.SEARCH_ICON_COLOR}
                size={18}
                onClick={handleClear}
              />
            </ConditionalRenderComponent>
          }
        />
        {onFilter && (
          <Tooltip title={defaultFilterPlaceholder}>
            <div
              title={defaultFilterPlaceholder}
              className={clsx(styles.filterContainer, {
                [styles.filtersActive]: filtersActive,
              })}
              onClick={onFilter}
            >
              <IconFilterAlt size={20} />
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default SearchField;
