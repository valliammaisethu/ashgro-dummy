import React, { useState } from "react";
import ClubListingHeader from "./Listing/Header";
import ClubListingTable from "./Listing/Table";
import useDrawer from "src/shared/hooks/useDrawer";
import AddClub from "./AddClub";
import { ClubFormData } from "src/models/club.model";

const Clubs = () => {
  const { visible, toggleVisibility } = useDrawer();
  const [clubData, setClubData] = useState<ClubFormData | null>(null);

  const handleAddClub = () => {
    setClubData(null);
    toggleVisibility();
  };

  const handleEditClub = (data: ClubFormData) => {
    setClubData(data);
    toggleVisibility();
  };

  return (
    <div>
      <ClubListingHeader onAddClub={handleAddClub} />
      <ClubListingTable onEditClub={handleEditClub} />
      <AddClub onClose={toggleVisibility} open={visible} clubData={clubData} />
    </div>
  );
};

export default Clubs;
