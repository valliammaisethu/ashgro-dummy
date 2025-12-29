import React, { useState, useCallback, useMemo, useEffect } from "react";
import { CheckboxChangeEvent } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import { getFullName } from "src/shared/utils/helpers";
import Checkbox from "src/shared/components/Checkbox";
import ConditionalRender from "src/shared/components/ConditionalRender";
import ProspectRow from "./Components/ProspectRow";
import Pagination from "src/shared/components/Pagination";
import useRedirect from "src/shared/hooks/useRedirect";
import useDrawer from "src/shared/hooks/useDrawer";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { ImportModes } from "src/enums/importModes.enum";
import {
  ProspectsList,
  ProspectsListingParams,
} from "src/models/prospects.model";
import { EmailTemplate } from "src/models/meta.model";
import { SelectedProspect } from "src/shared/types/prospects.type";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import { EmailService } from "src/services/EmailService/email.service";
import { MetaService } from "src/services/MetaService/meta.service";
import { BulkUploadService } from "src/services/BulkUploadService/bulkUpload.service";
import { TemplateEntity } from "src/enums/templateEntity.enum";
import TemplateModal from "src/views/Email/TemplateModal";
import NewEmailModal from "src/views/Email/NewEmailModal";
import ImportModal from "src/views/ImportModal";
import BulkInProgressModal from "src/views/ImportModal/InProgressModal";
import { EmailModalEnum } from "src/views/Email/TemplateModal/constants";
import Filters from "../Filters";
import DeleteModal from "../DeleteModal";
import ProspectForm from "../ProspectForm";
import { TABLE_HEADERS } from "./constants";
import {
  toggleAllSelections,
  toggleSingleSelection,
  areAllProspectsSelected,
  areSomeProspectsSelected,
  areFiltersActive,
} from "./helpers";
import Header from "./Header";
import { LeadService } from "src/services/SettingsService/lead.service";

import styles from "./listing.module.scss";

const ProspectsListing = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER).clubId;

  const [queryParams, setQueryParams] = useState<ProspectsListingParams>(
    new ProspectsListingParams(),
  );
  const [selectedProspects, setSelectedProspects] = useState<
    SelectedProspect[]
  >([]);
  const [isEdit, setIsEdit] = useState({
    state: false,
    prospect: new ProspectsList(),
  });
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>();
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [updatingProspectId, setUpdatingProspectId] = useState<
    string | undefined
  >();

  const { getProspects, editProspect } = ProspectsService();
  const { getLeadStatuses } = MetaService();
  const { getProspectEmailRecipients } = EmailService();
  const { checkBulkImportStatus } = BulkUploadService();

  const { data, isPending, isSuccess } = useQuery(getProspects(queryParams));

  const { leadStatusList } = LeadService();
  const { data: leadStatusesData = [] } = useQuery(leadStatusList());

  const { data: emailRecipientsData } = useQuery({
    ...getProspectEmailRecipients(queryParams),
    enabled: isAllSelected,
  });

  const { mutateAsync: updateProspectMutate } = useMutation(editProspect());

  const { mutate: checkImportStatus, isPending: isCheckingImportStatus } =
    useMutation({
      ...checkBulkImportStatus(),
      onSuccess: (response) => {
        const { data } = response;
        if (data.canStartImport) {
          if (selectedProspects.length > 0 || isAllSelected) {
            toggleEmailTemplateModal();
          } else {
            toggleBulkUpload();
          }
        }
      },
    });

  const leadStatusOptions = useMemo(
    () =>
      leadStatusesData?.map((status) => ({
        ...status,
        statusName: status?.label,
      })),
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

  const {
    visible: bulkUploadVisible,
    toggleVisibility: toggleBulkUpload,
    hide: hideBulkUpload,
  } = useDrawer();

  const {
    visible: bulkInProgressVisible,
    toggleVisibility: toggleBulkInProgress,
    hide: hideBulkInProgress,
  } = useDrawer();

  const handleBulkImportClick = () => {
    checkImportStatus({ clubId, entity: TemplateEntity.PROSPECT });
  };

  const handleBulkImportSuccess = () => {
    // Note: The BulkImportModal will call onClose (hideBulkUpload) internally after success
    // We just need to show the in-progress modal
    toggleBulkInProgress();

    setTimeout(() => {
      hideBulkInProgress();
    }, 3000);
  };

  const handleSelectAll = useCallback(
    (checked = false) => {
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

      if (!checked) setIsAllSelected(false);
    },
    [],
  );

  const handleHeaderCheckboxChange = useCallback(
    (e?: CheckboxChangeEvent) => {
      handleSelectAll(e?.target?.checked);
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
      return emailRecipientsData.prospects.map((prospect) => ({
        id: prospect.id || "",
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

  const handleOnEdit = useCallback(
    (prospect: ProspectsList) => {
      setIsEdit({
        state: true,
        prospect: prospect,
      });
      toggleVisibility();
    },
    [toggleVisibility],
  );

  const closeForm = () => {
    setIsEdit({
      state: false,
      prospect: new ProspectsList(),
    });
    toggleVisibility();
  };

  const showForm = () => {
    setIsEdit({
      state: false,
      prospect: new ProspectsList(),
    });
    show();
  };

  const handleOnDelete = (prospect: ProspectsList) => {
    setIsEdit({
      state: false,
      prospect: prospect,
    });
    toggleDeleteModal();
  };

  const handlePageChange = useCallback((newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  }, []);

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

  const handleStatusChange = async (
    prospectId: string,
    leadStatusId: string,
  ) => {
    setUpdatingProspectId(prospectId);

    await updateProspectMutate({
      prospect: {
        id: prospectId,
        leadStatusId,
        clubId,
      },
    });
    setUpdatingProspectId(undefined);
  };

  const handleClearSelections = useCallback(() => {
    setSelectedProspects([]);
    setIsAllSelected(false);
  }, []);

  const handleBulkMail = useCallback(() => {
    checkImportStatus({ clubId, entity: TemplateEntity.PROSPECT });
  }, [clubId, checkImportStatus]);

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
        onAddProspect={showForm}
        onBulkMail={handleBulkMail}
        onClear={handleClearSelections}
        filtersActive={filtersActive}
        selectedEmails={selectedProspects.length}
        onBulkImport={handleBulkImportClick}
        isCheckingImportStatus={isCheckingImportStatus}
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
                  onStatusChange={handleStatusChange}
                  isUpdatingStatus={updatingProspectId === prospect.id}
                />
              ))}
            </div>
            <Pagination
              currentPage={
                data?.pagination?.currentPage ?? queryParams.page ?? 1
              }
              totalPages={data?.pagination?.overallPages ?? 1}
              onPageChange={handlePageChange}
              hasData={!!data?.prospects && data.prospects.length > 0}
            />
          </ConditionalRender>
        </div>
      </div>
      <DeleteModal
        visible={deleteModalVisible}
        toggleVisibility={toggleDeleteModal}
        id={isEdit?.prospect?.id ?? ""}
        prospectName={getFullName(
          isEdit?.prospect?.firstName,
          isEdit?.prospect?.lastName,
        )}
      />
      <ProspectForm
        prospectId={isEdit?.prospect?.id}
        isEdit={isEdit?.state}
        visible={visible}
        onClose={closeForm}
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
        isBulkEmail
        handleEmailComplete={handleClearSelections}
      />
      <ImportModal
        visible={bulkUploadVisible}
        onClose={hideBulkUpload}
        importMode={ImportModes.PROSPECTS}
        onImport={handleBulkImportSuccess}
      />
      <BulkInProgressModal visible={bulkInProgressVisible} />
    </div>
  );
};

export default ProspectsListing;
