import React, { ChangeEvent, FC } from "react";
import styles from "./searchComponent.module.scss";
import Search from "antd/lib/input/Search";
import { SharedComponentsConstants } from "../../../constants/sharedComponents";

interface SearchComponentProps {
  onSearch: (value: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchField: FC<SearchComponentProps> = (props) => {
  const { onSearch, searchValue, setSearchValue } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

  const handleSearch = (searchText: string) => onSearch(searchText);

  return (
    <div className={styles["search-component"]}>
      <Search
        placeholder={SharedComponentsConstants.SEARCH_PLACEHOLDER}
        value={searchValue}
        allowClear
        onChange={onChange}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default SearchField;
