import React, { useState, useCallback, useMemo, useEffect } from "react";
import { CheckboxChangeEvent } from "antd";
import { useQuery } from "@tanstack/react-query";
import { IconChevronLeft, IconChevronRight } from "obra-icons-react";
import { FieldValues } from "react-hook-form";

import { PageListingDirections, TABLE_HEADERS } from "./constants";
import {
  toggleAllSelections,
  toggleSingleSelection,
  areAllProspectsSelected,
  areSomeProspectsSelected,
  areFiltersActive,
} from "./helpers";
import Header from "./Header";
import Checkbox from "src/shared/components/Checkbox";
import ConditionalRender from "src/shared/components/ConditionalRender";
import Button from "src/shared/components/Button";
import ProspectRow from "./Components/ProspectRow";
import ProspectForm from "../ProspectForm";
import useRedirect from "src/shared/hooks/useRedirect";
import useDrawer from "src/shared/hooks/useDrawer";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { QueryParamKeys } from "src/enums/queryParams.enum";
import { UserData } from "src/models/user.model";
import {
  ProspectsList,
  ProspectsListingParams,
} from "src/models/prospects.model";
import { EmailTemplate } from "src/models/meta.model";
import { MetaService } from "src/services/MetaService/meta.service";
import { SelectedProspect } from "src/shared/types/prospects.type";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import { EmailService } from "src/services/EmailService/email.service";
import DeleteModal from "../DeleteModal";
import Filters from "../Filters";
import TemplateModal from "src/views/Email/TemplateModal";
import NewEmailModal from "src/views/Email/NewEmailModal";
import { EmailModalEnum } from "src/views/Email/TemplateModal/constants";

import styles from "./listing.module.scss";

const ProspectsListing = () => {
  const user = localStorageHelper.getItem(LocalStorageKeys.USER) as UserData;
  const clubId = user?.clubId;

  const [queryParams, setQueryParams] = useState<ProspectsListingParams>(
    new ProspectsListingParams(),
  );
  const [selectedProspects, setSelectedProspects] = useState<
    SelectedProspect[]
  >([]);
  const [isEdit, setIsEdit] = useState({
    state: false,
    id: "",
  });
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>();
  const [isAllSelected, setIsAllSelected] = useState(false);

  const { getProspects, viewProspect } = ProspectsService();
  const { getLeadStatuses } = MetaService();
  const { getProspectEmailRecipients } = EmailService();

  const { data, isPending, isSuccess } = useQuery(getProspects(queryParams));
  const { data: leadStatusesData } = useQuery(
    getLeadStatuses({
      filter: QueryParamKeys.PROSPECTS,
    }),
  );
  const { data: isEditData } = useQuery({
    ...viewProspect(isEdit?.id),
    enabled: !!isEdit?.id,
  });
  const { data: emailRecipientsData } = useQuery({
    ...getProspectEmailRecipients(queryParams),
    enabled: isAllSelected,
  });

  const leadStatusOptions = useMemo(
    () => leadStatusesData?.leadStatuses,
    [leadStatusesData],
  );

  const { navigateToIndividualProspect } = useRedirect();

  const { visible, show, toggleVisibility } = useDrawer();
  const { visible: deleteModalVisible, toggleVisibility: toggleDeleteModal } =
    useDrawer();
  const { visible: drawerVisible, toggleVisibility: toggleDrawerVisibility } =
    useDrawer();
  const {
    visible: emailTemplateModalVisible,
    toggleVisibility: toggleEmailTemplateModal,
  } = useDrawer();
  const {
    visible: newEmailModalVisible,
    toggleVisibility: toggleNewEmailModal,
  } = useDrawer();

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedProspects(toggleAllSelections(checked, data?.prospects));
      setIsAllSelected(checked);
    },
    [data?.prospects],
  );

  const handleSelectOne = useCallback(
    (id: string, email: string, name: string, checked: boolean) => {
      setSelectedProspects((prev) =>
        toggleSingleSelection(id, email, name, checked, prev),
      );
      // If unchecking a single item, clear the "all selected" state
      if (!checked) {
        setIsAllSelected(false);
      }
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
    () => areAllProspectsSelected(data?.prospects, selectedProspects),
    [data?.prospects, selectedProspects],
  );

  const someSelected = useMemo(
    () => areSomeProspectsSelected(data?.prospects, selectedProspects),
    [data?.prospects, selectedProspects],
  );

  const filtersActive = useMemo(
    () => areFiltersActive(queryParams),
    [queryParams],
  );

  const emailRecipients = useMemo(() => {
    if (isAllSelected && emailRecipientsData?.prospects) {
      // Convert API recipients to SelectedEmailModel format
      return emailRecipientsData.prospects.map((prospect) => ({
        id: prospect.email || "",
        email: prospect.email || "",
        name: prospect.firstName || "",
      }));
    }
    return selectedProspects;
  }, [isAllSelected, emailRecipientsData, selectedProspects]);

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

  const handleApplyFilter = (filters: FieldValues) => {
    setQueryParams((prev) => ({
      ...prev,
      ...filters,
      followUpStartDate: filters.followUpDateRange?.[0],
      followUpEndDate: filters.followUpDateRange?.[1],
      page: 1,
    }));
    toggleDrawerVisibility();
  };

  const handleEmailTemplateModal = (
    type: EmailModalEnum,
    template?: EmailTemplate,
  ) => {
    setSelectedTemplate(type === EmailModalEnum.EMAIL ? undefined : template);
    toggleEmailTemplateModal();
    toggleNewEmailModal();
  };

  const handleNewEmailModalClose = useCallback(() => {
    setSelectedTemplate(undefined);
    setIsAllSelected(false);
    toggleNewEmailModal();
  }, [toggleNewEmailModal]);

  useEffect(() => {
    if (clubId && queryParams.clubId !== clubId) {
      setQueryParams((prev) => ({ ...prev, clubId }));
    }
  }, [clubId]);

  return (
    <div>
      <Header
        onFilter={toggleDrawerVisibility}
        onSearch={handleSearch}
        onAddProspect={show}
        filtersActive={filtersActive}
        onBulkMail={toggleEmailTemplateModal}
        selectedEmails={selectedProspects.length}
      />
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
                  isSelected={selectedProspects.some(
                    (p) => p.id === prospect.id,
                  )}
                  leadStatusOptions={leadStatusOptions}
                  onSelectChange={(checked) =>
                    handleSelectOne(
                      prospect.id!,
                      prospect.email!,
                      prospect.firstName!,
                      checked,
                    )
                  }
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
      <Filters
        visible={drawerVisible}
        toggleVisibility={toggleDrawerVisibility}
        onSubmit={handleApplyFilter}
        defaultValues={queryParams}
      />
      <TemplateModal
        isOpen={emailTemplateModalVisible}
        onClose={toggleEmailTemplateModal}
        toggleEmailModal={handleEmailTemplateModal}
      />
      <NewEmailModal
        isOpen={newEmailModalVisible}
        onClose={handleNewEmailModalClose}
        selectedEmails={emailRecipients}
        selectedTemplate={selectedTemplate}
      />
    </div>
  );
};

export default ProspectsListing;
