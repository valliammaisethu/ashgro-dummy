import React from "react";
import { IconAdd, IconBarChartThin } from "obra-icons-react";

import { useUserRole } from "src/shared/hooks/useUserRole";
import Button from "src/shared/components/Button";
import { DashboardHeaderProps } from "src/shared/types/dashboard.type";
import { Colors } from "src/enums/colors.enum";
import { Buttons } from "src/enums/buttons.enum";

import styles from "../dashboard.module.scss";

const DashboardHeader = (props: DashboardHeaderProps) => {
  const { onAddChart, loading } = props;
  const ClubAdminDashboardHeader = () => {
    return (
      <div className={styles.header}>
        <Button
          className={styles.addChartButton}
          onClick={onAddChart}
          loading={loading}
          icon={
            <IconBarChartThin
              strokeWidth={2}
              size={20}
              color={Colors.ASHGRO_WHITE}
              className={styles.chartIcon}
            />
          }
        >
          {Buttons.ADD_CHART}
          <IconAdd
            color={Colors.ASHGRO_WHITE}
            strokeWidth={3}
            className={styles.addIcon}
            size={10}
          />
        </Button>
      </div>
    );
  };
  const { isClubAdmin } = useUserRole();

  if (isClubAdmin) return <ClubAdminDashboardHeader />;
  return null;
};

export default DashboardHeader;
