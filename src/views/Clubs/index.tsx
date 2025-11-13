import React, { useState } from "react";
import ClubListingHeader from "./Listing/Header";
import ClubListingTable from "./Listing/Table";
import AddClub from "./AddClub";
import { ClubFormData } from "src/models/club.model";
import { ClubFormState } from "src/shared/types/clubs.type";

const Clubs: React.FC = () => {
  const [formState, setFormState] = useState<ClubFormState>({
    clubData: null,
    visible: false,
  });

  const handleAddClub = () =>
    setFormState((prev) => ({ ...prev, visible: true, clubData: null }));

  const handleEditClub = (data: ClubFormData) =>
    setFormState((prev) => ({ ...prev, visible: true, clubData: data }));

  const handleVisibility = () =>
    setFormState((prev) => ({ ...prev, visible: !prev.visible }));

  return (
    <div>
      <ClubListingHeader onAddClub={handleAddClub} />
      <ClubListingTable onEditClub={handleEditClub} />
      <AddClub
        onClose={handleVisibility}
        open={formState.visible}
        clubData={formState.clubData}
      />
    </div>
  );
};

export default Clubs;
