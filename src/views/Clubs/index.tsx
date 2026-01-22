import React, { useCallback, useState } from "react";
import ClubListingHeader from "./Listing/Header";
import ClubListingTable from "./Listing/Table";
import ClubForm from "./ClubForm";
import { ClubFormState } from "src/shared/types/clubs.type";
import { QueryParams } from "src/models/queryParams.model";

const Clubs: React.FC = () => {
  const [formState, setFormState] = useState<ClubFormState>({
    clubId: null,
    visible: false,
  });
  const [queryParams, setQueryParams] = useState(new QueryParams());

  const handleSearch = useCallback((term: string) => {
    setQueryParams((prev) => ({ ...prev, search: term }));
  }, []);

  const handleAddClub = () =>
    setFormState((prev) => ({ ...prev, visible: true, clubId: "" }));

  const handleEditClub = (clubId: string) =>
    setFormState((prev) => ({ ...prev, visible: true, clubId }));

  const handleVisibility = () =>
    setFormState((prev) => ({ ...prev, visible: !prev.visible }));

  return (
    <div>
      <ClubListingHeader onSearch={handleSearch} onAddClub={handleAddClub} />
      <ClubListingTable
        setQueryParams={setQueryParams}
        queryParams={queryParams}
        onEditClub={handleEditClub}
      />
      <ClubForm
        onClose={handleVisibility}
        open={formState.visible}
        clubId={formState.clubId || ""}
      />
    </div>
  );
};

export default Clubs;
