import React, { useState } from "react";
import { Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import withFormik from "@bbbtech/storybook-formik";
import SearchField from ".";

export default {
  title: "Components/SearchField",
  component: SearchField,
  decorators: [withFormik],
} as Meta;

export const Default = () => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <SearchField
      searchValue={searchText}
      setSearchValue={setSearchText}
      onSearch={(value: string) => action("onSearchCalled")(value)}
    />
  );
};
