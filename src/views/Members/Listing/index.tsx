import React, { useCallback, useMemo, useState } from "react";
import Header from "../Header";
import useDrawer from "src/shared/hooks/useDrawer";
import MemberFilters from "../Filters";
import { MembersListingParams } from "src/models/members.model";
import { areFiltersActive } from "../helpers";

const Members = () => {
  const [queryParams, setQueryParams] = useState<MembersListingParams>(
    new MembersListingParams(),
  );
  const {
    visible: memberFiltersVisible,
    toggleVisibility: toggleMemberFilters,
  } = useDrawer();

  const filtersActive = useMemo(
    () => areFiltersActive(queryParams),
    [queryParams],
  );

  const handleSearch = useCallback((term: string) => {
    setQueryParams((prev) => ({ ...prev, search: term }));
  }, []);
  return (
    <div>
      <Header
        filtersActive={filtersActive}
        onFilter={toggleMemberFilters}
        onSearch={handleSearch}
      />
      <MemberFilters
        toggleVisibility={toggleMemberFilters}
        visible={memberFiltersVisible}
        defaultValues={queryParams}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default Members;
