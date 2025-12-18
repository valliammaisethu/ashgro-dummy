import React, { useState } from "react";
import { Popover } from "antd";
import { IconCircleClose } from "obra-icons-react";
import { useQuery } from "@tanstack/react-query";

import { useDashboardFilters } from "src/context/DashboardFiltersContext";
import Checkbox from "src/shared/components/Checkbox";
import { Colors } from "src/enums/colors.enum";

import styles from "./clubFilterDropdown.module.scss";
import { ClubService } from "src/services/ClubService/club.service";
import ConditionalRender from "src/shared/components/ConditionalRender";
import FilterIconWithBadge from "../FilterIconWithBadge";
import { QueryParams } from "src/models/queryParams.model";
import { Trigger } from "src/enums/trigger.enum";
import { Placement } from "src/enums/placement.enum";
import { filterConstants } from "../../constants";

interface ClubFilterDropdownProps {
  chartId: string;
}

const { MODAL_CLOSE_ICON } = Colors;

const ClubFilterDropdown: React.FC<ClubFilterDropdownProps> = ({ chartId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getClubs } = ClubService();
  const { getChartFilter, setChartFilter, hasActiveFilters } =
    useDashboardFilters();

  // TODO: remove once BE create meta api for clubs
  const queryParams = Object.assign(new QueryParams(), { limit: 100 });

  const {
    data: clubsData,
    isLoading,
    isSuccess,
  } = useQuery(getClubs(queryParams));

  const selectedValues = getChartFilter(chartId);

  const hasFilters = hasActiveFilters(chartId);

  const handlePopupVisibility = () => setIsOpen((prev) => !prev);

  const handleClearSelection = () => {
    handlePopupVisibility();
    setChartFilter(chartId, []);
  };

  const handleClubToggle = (clubId?: string) => () => {
    if (!clubId) return;

    const isSelected = selectedValues.includes(clubId);

    const updatedSelection = isSelected
      ? selectedValues.filter((id) => id !== clubId)
      : [...selectedValues, clubId];

    setChartFilter(chartId, updatedSelection);
  };

  return (
    <Popover
      content={
        <div className={styles.clubFilterContent}>
          <div className={styles.header}>
            <span
              className={styles.clearSelection}
              onClick={handleClearSelection}
            >
              {filterConstants.CLEAR_SELECTION}
            </span>
            <IconCircleClose
              size={20}
              className={styles.closeIcon}
              onClick={handlePopupVisibility}
              color={MODAL_CLOSE_ICON}
            />
          </div>
          <ConditionalRender
            records={clubsData?.clubs}
            isPending={isLoading}
            isSuccess={isSuccess}
          >
            <div className={styles.listContainer}>
              {clubsData?.clubs?.map(({ id, name }) => (
                <div key={id} className={styles.clubItem}>
                  <span className={styles.clubName}>{name}</span>
                  <Checkbox
                    checked={id ? selectedValues.includes(id) : false}
                    onChange={handleClubToggle(id)}
                  />
                </div>
              ))}
            </div>
          </ConditionalRender>
        </div>
      }
      trigger={Trigger.CLICK}
      open={isOpen}
      onOpenChange={handlePopupVisibility}
      placement={Placement.BOTTOM_RIGHT}
      overlayClassName={styles.popoverOverlay}
      arrow={false}
    >
      <FilterIconWithBadge hasFilters={hasFilters} />
    </Popover>
  );
};

export default ClubFilterDropdown;
