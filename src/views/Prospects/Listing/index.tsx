import React, { useState, useCallback, useMemo } from "react";
import { CheckboxChangeEvent } from "antd";
import { useQuery } from "@tanstack/react-query";

import { mockProspects, leadStatusOptions, TABLE_HEADERS } from "./constants";
import {
  toggleAllSelections,
  toggleSingleSelection,
  updateProspectStatus,
  areAllProspectsSelected,
  areSomeProspectsSelected,
} from "./helpers";
import Header from "./Header";
import Checkbox from "src/shared/components/Checkbox";
import ConditionalRender from "src/shared/components/ConditionalRender";
import ProspectRow from "./Components/ProspectRow";
import { ProspectData } from "src/shared/types/sharedComponents.type";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import useRedirect from "src/shared/hooks/useRedirect";
import useDrawer from "src/shared/hooks/useDrawer";

import styles from "./listing.module.scss";
import AddProspect from "../AddProspect";

const ProspectsListing = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [prospects, setProspects] = useState<ProspectData[]>(mockProspects);
  const { navigateToIndividualProspect } = useRedirect();
  const { getProspects } = ProspectsService();
  const { visible, show, hide } = useDrawer();
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedIds(toggleAllSelections(checked, prospects));
    },
    [prospects],
  );

  const handleSelectOne = useCallback((id: string, checked: boolean) => {
    setSelectedIds((prev) => toggleSingleSelection(id, checked, prev));
  }, []);

  const handleStatusChange = useCallback(
    (prospectId: string, newStatus: string) => {
      setProspects((prevProspects) =>
        updateProspectStatus(
          prevProspects,
          prospectId,
          newStatus,
          leadStatusOptions,
        ),
      );
    },
    [],
  );

  const handleHeaderCheckboxChange = useCallback(
    (e?: CheckboxChangeEvent) => {
      handleSelectAll(e?.target?.checked ?? false);
    },
    [handleSelectAll],
  );

  const allSelected = useMemo(
    () => areAllProspectsSelected(prospects, selectedIds),
    [prospects, selectedIds],
  );

  const someSelected = useMemo(
    () => areSomeProspectsSelected(prospects, selectedIds),
    [prospects, selectedIds],
  );

  const { data, isPending, isSuccess } = useQuery(getProspects());

  const navigateToProspect = (id: string) => () =>
    navigateToIndividualProspect(id);

  return (
    <div>
      <Header onAddProspect={show} />
      <div className={styles.prospectList}>
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div className={styles.checkboxCol}>
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={handleHeaderCheckboxChange}
              />
            </div>
            <div className={styles.prospectCol}>{TABLE_HEADERS.PROSPECTS}</div>
            <div className={styles.dateCol}>{TABLE_HEADERS.FOLLOW_UP_DATE}</div>
            <div className={styles.sourceCol}>{TABLE_HEADERS.LEAD_SOURCE}</div>
            <div className={styles.statusCol}>{TABLE_HEADERS.LEAD_STATUS}</div>
          </div>
          <ConditionalRender
            records={data?.data?.prospects}
            isPending={isPending}
            isSuccess={isSuccess}
          >
            <div className={styles.tableBody}>
              {data?.data?.prospects?.filter(Boolean).map((prospect) => (
                <ProspectRow
                  key={prospect.id}
                  onClick={navigateToProspect(prospect.id!)}
                  prospect={prospect}
                  isSelected={selectedIds.includes(prospect.id!)}
                  leadStatusOptions={leadStatusOptions}
                  onSelectChange={handleSelectOne}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </ConditionalRender>
        </div>
      </div>
      <AddProspect visible={visible} onClose={hide} />
    </div>
  );
};

export default ProspectsListing;
