import React, { useState, useCallback, useMemo, useEffect, Key } from "react";
import { CheckboxChangeEvent } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import dayjs from "dayjs";

import { getFullName } from "src/shared/utils/helpers";
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
import { convertDateToApiFormat } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import TemplateModal from "src/views/Email/TemplateModal";
import NewEmailModal from "src/views/Email/NewEmailModal";
import ImportModal from "src/views/ImportModal";
import BulkInProgressModal from "src/views/ImportModal/InProgressModal";
import { EmailModalEnum } from "src/views/Email/TemplateModal/constants";
import Filters from "../Filters";
import DeleteModal from "../DeleteModal";
import ProspectForm from "../ProspectForm";
import {
  toggleAllSelections,
  toggleSingleSelection,
  areAllProspectsSelected,
  areSomeProspectsSelected,
  areFiltersActive,
} from "./helpers";
import Header from "./Header";
import { LeadService } from "src/services/SettingsService/lead.service";
import Table from "src/shared/components/Table";
import { getColumns } from "./columns";

import styles from "./listing.module.scss";
import { prospectNameColTitle } from "./constants";

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
  const [updatingFollowUpId, setUpdatingFollowUpId] = useState<
    string | undefined
  >();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: Key[]) =>
    setSelectedRowKeys(newSelectedRowKeys);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record: ProspectsList, selected: boolean) => {
      const { id, email, firstName } = record || {};
      if (!id || !email || !firstName) return;
      handleSelectOne(id, email, firstName, selected);
    },
    onSelectAll: (selected: boolean) => {
      handleSelectAll(selected);
    },
  };

  const { getProspects, editProspect } = ProspectsService();
  const { getLeadStatuses } = MetaService();
  const { getProspectEmailRecipients } = EmailService();
  const { checkBulkImportStatus } = BulkUploadService();

  const { data, isLoading } = useQuery(getProspects(queryParams));

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

  const navigateToProspect = (id: string) => navigateToIndividualProspect(id);

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
    prospectId?: string,
    leadStatusId?: string,
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

  const handleFollowUpDateChange = async (
    prospectId?: string,
    date?: dayjs.Dayjs | null,
  ) => {
    if (!date) return;

    setUpdatingFollowUpId(prospectId);

    await updateProspectMutate({
      prospect: {
        id: prospectId,
        followUpDate: convertDateToApiFormat(
          date.format(DateFormats.DD_MMM_YYYY),
          DateFormats.DD_MMM_YYYY,
        ),
        clubId,
      },
    });
    setUpdatingFollowUpId(undefined);
  };

  const columns: ColumnsType<ProspectsList> = useMemo(
    () =>
      getColumns({
        handleOnEdit,
        handleOnDelete,
        leadStatusOptions,
        onStatusChange: handleStatusChange,
        updatingProspectId,
        onFollowUpDateChange: handleFollowUpDateChange,
        updatingFollowUpId,
      }),
    [
      handleOnEdit,
      handleOnDelete,
      leadStatusOptions,
      handleStatusChange,
      updatingProspectId,
      handleFollowUpDateChange,
      updatingFollowUpId,
    ],
  );

  const handleClearSelections = useCallback(() => {
    setSelectedProspects([]);
    setSelectedRowKeys([]);
    setIsAllSelected(false);
  }, []);

  const handleBulkMail = useCallback(() => {
    checkImportStatus({ clubId, entity: TemplateEntity.PROSPECT });
  }, [clubId, checkImportStatus]);

  const handleRowClick = useCallback(
    (record: ProspectsList) => ({
      onClick: () => {
        if (!record.id) return;
        navigateToProspect(record.id);
      },
    }),
    [navigateToProspect],
  );

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
        <Table<ProspectsList>
          columns={columns}
          dataSource={data?.prospects}
          currentPage={data?.pagination?.currentPage ?? queryParams.page}
          totalPages={data?.pagination?.overallPages}
          onPageChange={handlePageChange}
          hasData={!!data?.prospects?.length}
          rowSelection={rowSelection}
          onRow={handleRowClick}
          loading={isLoading}
          nameColTitle={prospectNameColTitle}
        />
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
