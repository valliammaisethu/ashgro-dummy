import React from "react";
import { IconFilterAlt } from "obra-icons-react";

import { Colors } from "src/enums/colors.enum";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

import styles from "./filterIconWithBadge.module.scss";

interface FilterIconWithBadgeProps {
  hasFilters: boolean;
  onClick?: () => void;
}

const { MODAL_CLOSE_ICON } = Colors;

const FilterIconWithBadge: React.FC<FilterIconWithBadgeProps> = ({
  hasFilters,
  onClick,
}) => {
  return (
    <div className={styles.filterIconWrapper} onClick={onClick}>
      <IconFilterAlt
        size={20}
        color={MODAL_CLOSE_ICON}
        className={styles.actionIcon}
      />
      <ConditionalRenderComponent visible={hasFilters} hideFallback>
        <span className={styles.filterBadge} />
      </ConditionalRenderComponent>
    </div>
  );
};

export default FilterIconWithBadge;
