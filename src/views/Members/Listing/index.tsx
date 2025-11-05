import React, { useCallback, useMemo, useState } from "react";
import Header from "../Header";
import useDrawer from "src/shared/hooks/useDrawer";
import MemberFilters from "../Filters";
import { MembersListingParams } from "src/models/members.model";
import { areFiltersActive } from "../helpers";
import { FieldValues } from "react-hook-form";

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

  const handleApplyFilter = (filters: FieldValues) => {
    setQueryParams((prev) => ({
      ...prev,
      ...filters,
      joinedEndDate: filters.followUpDateRange?.[1],
      joinedStartDate: filters.followUpDateRange?.[0],
      leadSourcesIds: filters.leadSourceIds,
      membershipCategoriesIds: filters.membershipCategoriesIds,
      membershipStatusIds: filters.membershipStatusIds,
      page: 1,
    }));
    toggleMemberFilters();
  };

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
        onSubmit={handleApplyFilter}
      />
    </div>
  );
};

export default Members;
