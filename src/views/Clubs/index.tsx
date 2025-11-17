import React, { useState } from "react";
import ClubListingHeader from "./Listing/Header";
import ClubListingTable from "./Listing/Table";
import AddClub from "./AddClub";
import { ClubFormState } from "src/shared/types/clubs.type";

const Clubs: React.FC = () => {
  const [formState, setFormState] = useState<ClubFormState>({
    clubId: null,
    visible: false,
  });

  const handleAddClub = () =>
    setFormState((prev) => ({ ...prev, visible: true, clubId: "" }));

  const handleEditClub = (clubId: string) =>
    setFormState((prev) => ({ ...prev, visible: true, clubId }));

  const handleVisibility = () =>
    setFormState((prev) => ({ ...prev, visible: !prev.visible }));

  return (
    <div>
      <ClubListingHeader onAddClub={handleAddClub} />
      <ClubListingTable onEditClub={handleEditClub} />
      <AddClub
        onClose={handleVisibility}
        open={formState.visible}
        clubId={formState.clubId || ""}
      />
    </div>
  );
};

export default Clubs;
