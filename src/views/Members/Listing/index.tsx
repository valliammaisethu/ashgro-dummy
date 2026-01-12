import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import { CheckboxChangeEvent } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Member, MembersListingParams } from "src/models/members.model";
import { EmailTemplate } from "src/models/meta.model";
import {
  areFiltersActive,
  toggleAllSelections,
  toggleSingleSelection,
  areAllMembersSelected,
  areSomeMembersSelected,
  SelectedMember,
} from "../helpers";
import Header from "../Header";
import MemberFilters from "../Filters";
import DeleteModal from "../DeleteModal";
import MembersForm from "../MembersForm";
import TemplateModal from "src/views/Email/TemplateModal";
import NewEmailModal from "src/views/Email/NewEmailModal";
import BulkInProgressModal from "src/views/ImportModal/InProgressModal";
import { EmailModalEnum } from "src/views/Email/TemplateModal/constants";
import ImportModal from "src/views/ImportModal";
import { SettingFormModalModel } from "src/views/Settings/constants";
import { MembersService } from "src/services/MembersService/members.service";
import { EmailService } from "src/services/EmailService/email.service";
import { BulkUploadService } from "src/services/BulkUploadService/bulkUpload.service";
import { MemberShipService } from "src/services/SettingsService/memberShip.service";
import { VisibilityType } from "src/enums/visibilityType.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { ImportModes } from "src/enums/importModes.enum";
import { TemplateEntity } from "src/enums/templateEntity.enum";
import useRedirect from "src/shared/hooks/useRedirect";
import useDrawer from "src/shared/hooks/useDrawer";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import Table from "src/shared/components/Table";
import { getColumns } from "./columns";

interface ModalState {
  open: boolean;
  mode: SettingFormModalModel;
  item?: Member;
}

const Members = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const [queryParams, setQueryParams] = useState<MembersListingParams>(
    new MembersListingParams(),
  );
  const [selectedMembers, setSelectedMembers] = useState<SelectedMember[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>();
  const [isAllSelected, setIsAllSelected] = useState(false);

  const filtersActive = useMemo(
    () => areFiltersActive(queryParams),
    [queryParams],
  );
  const {
    visible: memberFiltersVisible,
    toggleVisibility: toggleMemberFilters,
  } = useDrawer();

  const {
    visible: emailTemplateModalVisible,
    toggleVisibility: toggleEmailTemplateModal,
  } = useDrawer();

  const {
    visible: newEmailModalVisible,
    toggleVisibility: toggleNewEmailModal,
  } = useDrawer();

  const {
    visible: bulkImportModalVisible,
    toggleVisibility: toggleImportModal,
    hide: hideImportModal,
  } = useDrawer();

  const {
    visible: bulkInProgressVisible,
    toggleVisibility: toggleBulkInProgress,
    hide: hideBulkInProgress,
  } = useDrawer();

  const handleBulkImportClick = () => {
    checkBulkImportStatusMutate(
      { clubId, entity: TemplateEntity.MEMBER },
      {
        onSuccess: (response) => {
          const { data } = response;
          if (data.canStartImport) {
            if (selectedMembers.length > 0 || isAllSelected)
              toggleEmailTemplateModal();
            else toggleImportModal();
          }
        },
      },
    );
  };

  const handleBulkImportSuccess = () => {
    // Note: The BulkImportModal will call onClose (hideImportModal) internally after success
    // We just need to show the in-progress modal
    toggleBulkInProgress();

    setTimeout(() => {
      hideBulkInProgress();
    }, 3000);
  };

  const { navigateToMemberDetails } = useRedirect();

  const { getStaffMembersList, updateMemberStatus } = MembersService();
  const { memberShipStatuses } = MemberShipService();
  const { getMemberEmailRecipients } = EmailService();
  const { checkBulkImportStatus } = BulkUploadService();

  const { data: memberShipStatusesOptions = [] } =
    useQuery(memberShipStatuses());
  const { mutateAsync: updateMemberStatusMutate } =
    useMutation(updateMemberStatus());
  const { data, isSuccess, isLoading } = useQuery(
    getStaffMembersList(queryParams),
  );

  const { data: emailRecipientsData } = useQuery({
    ...getMemberEmailRecipients(queryParams),
    enabled: isAllSelected,
  });

  const {
    mutate: checkBulkImportStatusMutate,
    isPending: isCheckingBulkImportStatus,
  } = useMutation(checkBulkImportStatus());

  const [updatingMemberId, setUpdatingMemberId] = useState<
    string | undefined
  >();

  const handleSearch = useCallback((term: string) => {
    setQueryParams((prev) => ({ ...prev, search: term }));
  }, []);

  const handleApplyFilter = (filters: FieldValues) => {
    setQueryParams((prev) => ({
      ...prev,
      ...filters,
      joinedEndDate: filters.followUpDateRange?.[1],
      joinedStartDate: filters.followUpDateRange?.[0],
      page: 1,
    }));
    toggleMemberFilters();
  };

  const handleStatusChange = async (
    memberId?: string,
    membershipStatusId?: string,
  ) => {
    if (!memberId || !membershipStatusId) return;

    setUpdatingMemberId(memberId);
    try {
      await updateMemberStatusMutate({ memberId, membershipStatusId });
    } catch {
      // do nothing
    } finally {
      setUpdatingMemberId(undefined);
    }
  };

  const handleNavigateToDetails = (id?: string) => () =>
    navigateToMemberDetails(id);

  const handleMemberStatusChange =
    (memberId?: string) => (statusName: string) => {
      const status = memberShipStatusesOptions?.find(
        (opt) => opt?.id === statusName,
      );
      handleStatusChange(memberId, status?.value);
    };

  const handleMemberEdit = (member: Member) => () => handleEditClick(member);

  const handleMemberDelete = (member: Member) => () => setDeleteItem(member);

  const handlePageChange = useCallback((newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedMembers(toggleAllSelections(checked, data?.members));
      if (checked) {
        setSelectedRowKeys(data?.members?.map((m) => m.id!) ?? []);
      } else {
        setSelectedRowKeys([]);
      }
      setIsAllSelected(checked);
    },
    [data?.members],
  );

  const handleSelectOne = useCallback(
    (id: string, email: string, name: string, checked: boolean) => {
      setSelectedMembers((prev) =>
        toggleSingleSelection(id, email, name, checked, prev),
      );

      if (!checked) setIsAllSelected(false);
    },
    [],
  );

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record: Member, selected: boolean) => {
      const { id, email, firstName } = record || {};
      if (!id || !email || !firstName) return;
      handleSelectOne(id, email, firstName, selected);
    },
    onSelectAll: (selected: boolean) => {
      handleSelectAll(selected);
    },
  };

  const handleHeaderCheckboxChange = useCallback(
    (e?: CheckboxChangeEvent) => {
      handleSelectAll(e?.target?.checked ?? false);
    },
    [handleSelectAll],
  );

  const allSelected = useMemo(
    () => areAllMembersSelected(data?.members, selectedMembers),
    [data?.members, selectedMembers],
  );

  const someSelected = useMemo(
    () => areSomeMembersSelected(data?.members, selectedMembers),
    [data?.members, selectedMembers],
  );

  const emailRecipients = useMemo(() => {
    if (isAllSelected && emailRecipientsData?.prospects) {
      return emailRecipientsData.prospects.map((member) => ({
        id: member.id || "",
        email: member.email || "",
        name: member.firstName || "",
      }));
    }
    return selectedMembers;
  }, [isAllSelected, emailRecipientsData, selectedMembers]);

  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    mode: null,
  });

  const handleModalVisibility = (
    mode: SettingFormModalModel,
    item?: Member,
  ) => {
    setModalState({ open: !!mode, mode, item });
  };

  const handleEditClick = (member: Member) => {
    handleModalVisibility(VisibilityType.EDIT, member);
  };

  const [deleteItem, setDeleteItem] = useState<Member | undefined>();

  const handleEmailTemplateModal = useCallback(
    (type: EmailModalEnum, template?: EmailTemplate) => {
      setSelectedTemplate(type === EmailModalEnum.EMAIL ? undefined : template);
      toggleEmailTemplateModal();
      toggleNewEmailModal();
    },
    [toggleEmailTemplateModal, toggleNewEmailModal],
  );

  const handleNewEmailModalClose = useCallback(() => {
    setSelectedTemplate(undefined);
    setIsAllSelected(false);
    toggleNewEmailModal();
  }, [toggleNewEmailModal]);

  const handleClearSelections = () => {
    setSelectedMembers([]);
    setSelectedRowKeys([]);
    setIsAllSelected(false);
  };

  const handleBulkMail = () => {
    checkBulkImportStatusMutate(
      { clubId, entity: TemplateEntity.MEMBER },
      {
        onSuccess: (response) => {
          const { data } = response;
          if (data.canStartImport) {
            if (selectedMembers.length > 0 || isAllSelected)
              toggleEmailTemplateModal();
            else toggleImportModal();
          }
        },
      },
    );
  };

  useEffect(() => {
    if (clubId && queryParams.clubId !== clubId) {
      setQueryParams((prev) => ({ ...prev, clubId }));
    }
  }, [clubId, queryParams.clubId]);

  const memberStatusOptions = useMemo(
    () =>
      memberShipStatusesOptions?.map((opt) => ({
        ...opt,
        statusName: opt.label,
        id: opt.value,
      })) || [],
    [memberShipStatusesOptions],
  );

  const columns = useMemo(
    () =>
      getColumns({
        handleOnEdit: (member) => handleEditClick(member),
        handleOnDelete: (member) => setDeleteItem(member),
        statusOptions: memberStatusOptions,
        onStatusChange: (memberId, statusId) =>
          handleStatusChange(memberId, statusId),
        updatingMemberId,
      }),
    [memberStatusOptions, updatingMemberId],
  );

  const handleRowClick = useCallback(
    (record: Member) => ({
      onClick: handleNavigateToDetails(record.id),
    }),
    [handleNavigateToDetails],
  );

  return (
    <div>
      <Header
        filtersActive={filtersActive}
        selectedEmails={selectedMembers.length}
        onFilter={toggleMemberFilters}
        onSearch={handleSearch}
        onClear={handleClearSelections}
        onAddMember={() => handleModalVisibility(VisibilityType.ADD)}
        onBulkMail={handleBulkMail}
        onBulkImport={handleBulkImportClick}
        isCheckingImportStatus={isCheckingBulkImportStatus}
      />
      <MemberFilters
        toggleVisibility={toggleMemberFilters}
        visible={memberFiltersVisible}
        defaultValues={queryParams}
        onSubmit={handleApplyFilter}
      />
      <Table<Member>
        columns={columns}
        dataSource={data?.members}
        currentPage={data?.pagination?.currentPage ?? queryParams.page}
        totalPages={data?.pagination?.overallPages}
        onPageChange={handlePageChange}
        hasData={!!data?.members?.length}
        rowSelection={rowSelection}
        onRow={handleRowClick}
        loading={isLoading}
      />
      <DeleteModal
        visible={!!deleteItem?.id}
        toggleVisibility={() => setDeleteItem(undefined)}
        member={deleteItem}
      />

      <MembersForm
        isOpen={modalState.open}
        handleModalVisibility={() => handleModalVisibility(null)}
        id={modalState?.item?.id}
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
        visible={bulkImportModalVisible}
        importMode={ImportModes.MEMBERS}
        onClose={hideImportModal}
        onImport={handleBulkImportSuccess}
      />
      <BulkInProgressModal visible={bulkInProgressVisible} />
    </div>
  );
};

export default Members;
