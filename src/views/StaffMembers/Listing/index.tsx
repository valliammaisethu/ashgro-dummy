import React, { useCallback, useState } from "react";
import Header from "./Header";
import { StaffMembersListingParams } from "src/models/staffMember.model";

const StaffMembersListing = () => {
  const [, setQueryParams] = useState<StaffMembersListingParams>(
    new StaffMembersListingParams(),
  );
  const handleSearch = useCallback((term: string) => {
    setQueryParams((prev) => ({ ...prev, search: term }));
  }, []);

  const handleFilter = (filters: Partial<StaffMembersListingParams>) =>
    setQueryParams((prev) => ({ ...prev, ...filters, page: 1 }));

  return (
    <div>
      <Header
        onFilter={handleFilter}
        onStaffAdd={() => {}}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default StaffMembersListing;
