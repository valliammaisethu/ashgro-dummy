import React, { useState, useCallback, useMemo, useEffect } from "react";
import { CheckboxChangeEvent } from "antd";
import { useQuery } from "@tanstack/react-query";

import { TABLE_HEADERS } from "./constants";
import {
  toggleAllSelections,
  toggleSingleSelection,
  areAllProspectsSelected,
  areSomeProspectsSelected,
} from "./helpers";
import Header from "./Header";
import Checkbox from "src/shared/components/Checkbox";
import ConditionalRender from "src/shared/components/ConditionalRender";
import ProspectRow from "./Components/ProspectRow";
import useRedirect from "src/shared/hooks/useRedirect";
import useDrawer from "src/shared/hooks/useDrawer";

import styles from "./listing.module.scss";
import AddProspect from "../AddProspect";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { UserData } from "src/models/user.model";
import { ProspectsListingParams } from "src/models/prospects.model";
import { MetaService } from "src/services/MetaService/meta.service";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";

const ProspectsListing = () => {
  const [queryParams, setQueryParams] = useState<ProspectsListingParams>(
    new ProspectsListingParams(),
  );
  const { getProspects } = ProspectsService();
  const { data, isPending, isSuccess } = useQuery(getProspects(queryParams));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { getLeadStatuses } = MetaService();

  const { data: leadStatusOptions } = useQuery(getLeadStatuses());
  const { navigateToIndividualProspect } = useRedirect();

  const { visible, show, hide } = useDrawer();
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedIds(toggleAllSelections(checked, data?.prospects));
    },
    [data?.prospects],
  );
  const user = localStorageHelper.getItem(LocalStorageKeys.USER) as UserData;
  const clubId = user?.clubId;
  const handleSelectOne = useCallback((id: string, checked: boolean) => {
    setSelectedIds((prev) => toggleSingleSelection(id, checked, prev));
  }, []);

  const handleHeaderCheckboxChange = useCallback(
    (e?: CheckboxChangeEvent) => {
      handleSelectAll(e?.target?.checked ?? false);
    },
    [handleSelectAll],
  );

  const allSelected = useMemo(
    () => areAllProspectsSelected(data?.prospects, selectedIds),
    [data?.prospects, selectedIds],
  );

  const someSelected = useMemo(
    () => areSomeProspectsSelected(data?.prospects, selectedIds),
    [data?.prospects, selectedIds],
  );

  useEffect(() => {
    if (clubId && queryParams.clubId !== clubId) {
      setQueryParams((prev) => ({ ...prev, clubId }));
    }
  }, [clubId]);

  const navigateToProspect = (id: string) => () =>
    navigateToIndividualProspect(id);

  const handleSearch = useCallback((term: string) => {
    setQueryParams((prev) => ({ ...prev, search: term }));
  }, []);

  return (
    <div>
      <Header onSearch={handleSearch} onAddProspect={show} />
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
            records={data?.prospects}
            isPending={isPending}
            isSuccess={isSuccess}
          >
            <div className={styles.tableBody}>
              {data?.prospects?.filter(Boolean).map((prospect) => (
                <ProspectRow
                  key={prospect.id}
                  onClick={navigateToProspect(prospect.id!)}
                  prospect={prospect}
                  isSelected={selectedIds.includes(prospect.id!)}
                  leadStatusOptions={leadStatusOptions?.leadStatuses}
                  onSelectChange={handleSelectOne}
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
