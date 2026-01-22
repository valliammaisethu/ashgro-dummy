import React from "react";
import { IconFilterAlt } from "obra-icons-react";

import { Colors } from "src/enums/colors.enum";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import Button from "src/shared/components/Button";
import { defaultFilterPlaceholder } from "src/constants/sharedComponents";

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
      <Button
        icon={
          <IconFilterAlt
            size={20}
            color={MODAL_CLOSE_ICON}
            className={styles.actionIcon}
          />
        }
        className={styles.filterButton}
        onClick={onClick}
        tooltip={{
          title: defaultFilterPlaceholder,
        }}
      />
      <ConditionalRenderComponent visible={hasFilters} hideFallback>
        <span className={styles.filterBadge} />
      </ConditionalRenderComponent>
    </div>
  );
};

export default FilterIconWithBadge;
