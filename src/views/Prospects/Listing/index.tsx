import React, { useState, useCallback, useMemo, useEffect } from "react";
import { CheckboxChangeEvent } from "antd";
import { useQuery } from "@tanstack/react-query";
import { IconChevronLeft, IconChevronRight } from "obra-icons-react";

import { PageListingDirections, TABLE_HEADERS } from "./constants";
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
import ProspectForm from "../ProspectForm";
import useRedirect from "src/shared/hooks/useRedirect";
import useDrawer from "src/shared/hooks/useDrawer";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { UserData } from "src/models/user.model";
import {
  ProspectsList,
  ProspectsListingParams,
} from "src/models/prospects.model";
import { MetaService } from "src/services/MetaService/meta.service";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import DeleteModal from "../DeleteModal";
import Button from "src/shared/components/Button";

import styles from "./listing.module.scss";

const ProspectsListing = () => {
  const [queryParams, setQueryParams] = useState<ProspectsListingParams>(
    new ProspectsListingParams(),
  );
  const { getProspects, viewProspect } = ProspectsService();
  const { data, isPending, isSuccess } = useQuery(getProspects(queryParams));

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState({
    state: false,
    id: "",
  });
  const { data: isEditData } = useQuery({
    ...viewProspect(isEdit?.id),
    enabled: !!isEdit?.id,
  });

  const { getLeadStatuses } = MetaService();

  const { data: leadStatusOptions } = useQuery(getLeadStatuses());
  const { navigateToIndividualProspect } = useRedirect();

  const { visible, show, toggleVisibility } = useDrawer();
  const { visible: deleteModalVisible, toggleVisibility: toggleDeleteModal } =
    useDrawer();
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

  const handleOnEdit = useCallback((prospect: ProspectsList) => {
    setIsEdit({
      state: true,
      id: prospect.id!,
    });
    toggleVisibility();
  }, []);

  const handleOnDelete = (prospect: ProspectsList) => {
    setIsEdit({
      state: false,
      id: prospect.id!,
    });
    toggleDeleteModal();
  };

  const handlePageChange = useCallback(
    (direction: PageListingDirections) => {
      setQueryParams((prev) => {
        const currentPage = prev.page || 1;
        const totalPages = data?.pagination?.overallPages || 1;

        let newPage = currentPage;

        if (direction === PageListingDirections.PREV && currentPage > 1)
          newPage = currentPage - 1;
        else if (
          direction === PageListingDirections.NEXT &&
          currentPage < totalPages
        )
          newPage = currentPage + 1;

        if (newPage === currentPage) return prev;

        return { ...prev, page: newPage };
      });
    },
    [data?.pagination?.overallPages],
  );

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
                  onEditClick={handleOnEdit}
                  onDeleteClick={handleOnDelete}
                />
              ))}
            </div>
            <div className={styles.paginationContainer}>
              <Button
                disabled={data?.pagination?.currentPage === 1}
                onClick={() => handlePageChange(PageListingDirections.PREV)}
                icon={<IconChevronLeft size={20} />}
              ></Button>
              <div className={styles.textContainer}>
                Page
                <span className={styles.active}>
                  {data?.pagination?.currentPage ?? queryParams.page ?? 1}
                </span>
                of
                <span className={styles.end}>
                  {data?.pagination?.overallPages ?? 1}
                </span>
              </div>
              <Button
                onClick={() => handlePageChange(PageListingDirections.NEXT)}
                disabled={
                  data?.pagination?.currentPage ===
                  data?.pagination?.overallPages
                }
                icon={<IconChevronRight size={20} />}
              ></Button>
            </div>
          </ConditionalRender>
        </div>
      </div>
      <DeleteModal
        visible={deleteModalVisible}
        toggleVisibility={toggleDeleteModal}
        id={isEdit?.id}
      />
      <ProspectForm
        prospectData={isEditData?.prospect}
        isEdit={isEdit?.state}
        visible={visible}
        onClose={toggleVisibility}
      />
    </div>
  );
};

export default ProspectsListing;
