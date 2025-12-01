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
import { memberHeaders } from "../MembersForm/constants";
import Header from "../Header";
import MemberFilters from "../Filters";
import DeleteModal from "../DeleteModal";
import MembersForm from "../MembersForm";
import TemplateModal from "src/views/Email/TemplateModal";
import NewEmailModal from "src/views/Email/NewEmailModal";
import BulkInProgressModal from "src/views/BulkImport/InProgressModal";
import BulkImportModal from "src/views/BulkImport";
import { EmailModalEnum } from "src/views/Email/TemplateModal/constants";
import { SettingFormModalModel } from "src/views/Settings/constants";
import { MembersService } from "src/services/MembersService/members.service";
import { EmailService } from "src/services/EmailService/email.service";
import { BulkUploadService } from "src/services/BulkUploadService/bulkUpload.service";
import { MemberShipService } from "src/services/SettingsService/memberShip.service";
import { VisibilityType } from "src/enums/visibilityType.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { BulkModes } from "src/enums/bulkModes";
import { DateFormats } from "src/enums/dateFormats.enum";
import { TemplateEntity } from "src/enums/templateEntity.enum";
import ConditionalRender from "src/shared/components/ConditionalRender";
import Pagination from "src/shared/components/Pagination";
import Profile from "src/shared/components/atoms/Table/Profile";
import Form from "src/shared/components/Form";
import Checkbox from "src/shared/components/Checkbox";
import Actions from "src/shared/components/atoms/Table/Actions";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { formatDate } from "src/shared/utils/dateUtils";
import useRedirect from "src/shared/hooks/useRedirect";
import useDrawer from "src/shared/hooks/useDrawer";
import { fallbackHandler } from "src/shared/utils/commonHelpers";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";

import styles from "./membersListing.module.scss";

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
      const status = memberShipStatusesOptions.find(
        (opt) => opt.label === statusName,
      );
      handleStatusChange(memberId, status?.value);
    };

  const handleMemberEdit = (member: Member) => () => handleEditClick(member);

  const handleMemberDelete = (member: Member) => () => setDeleteItem(member);

  const handlePageChange = (newPage: number) => () =>
    setQueryParams((prev) => ({ ...prev, page: newPage }));

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedMembers(toggleAllSelections(checked, data?.members));
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
      <Form>
        <div className={styles.listContainer}>
          <div className={styles.headerRow}>
            <div className={styles.headerWithCheckbox}>
              <div className={styles.checkboxCol} onClick={stopPropagation}>
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleHeaderCheckboxChange}
                />
              </div>
              <p className={styles.headerLabel}>{memberHeaders[0]}</p>
            </div>
            <p className={styles.headerLabel}>{memberHeaders[1]}</p>
            <p className={styles.headerLabel}>{memberHeaders[2]}</p>
          </div>

          <ConditionalRender
            records={data?.members}
            isPending={isLoading}
            isSuccess={isSuccess}
          >
            <div className={styles.listContainer}>
              {data?.members?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={styles.rowContainer}
                    onClick={handleNavigateToDetails(item?.id)}
                  >
                    <Profile
                      firstName={item.firstName}
                      lastName={item.lastName}
                      email={item.email}
                      profilePictureUrl={item.profilePictureUrl}
                      contactNumber={
                        item?.contactNumber
                          ? `${item?.countryCode} ${item?.contactNumber}`
                          : undefined
                      }
                      showCheckbox
                      isSelected={selectedMembers.some((m) => m.id === item.id)}
                      onSelectChange={(checked) =>
                        handleSelectOne(
                          item.id!,
                          item.email!,
                          item.firstName!,
                          checked,
                        )
                      }
                    />

                    <div className={styles.rowItem}>
                      {fallbackHandler(
                        formatDate(item.joinedDate, DateFormats.DD_MMM__YYYY),
                      )}
                    </div>

                    <Actions
                      selectWidth={200}
                      selectedValue={item.membershipStatus}
                      options={memberShipStatusesOptions}
                      onSelectChange={handleMemberStatusChange(item.id)}
                      selectLoading={updatingMemberId === item.id}
                      onEditClick={handleMemberEdit(item)}
                      onDeleteClick={handleMemberDelete(item)}
                    />
                  </div>
                );
              })}
            </div>
            <Pagination
              currentPage={
                data?.pagination?.currentPage ?? queryParams.page ?? 1
              }
              totalPages={data?.pagination?.overallPages ?? 1}
              onPageChange={handlePageChange}
              hasData={!!data?.members && data.members.length > 0}
            />
          </ConditionalRender>
        </div>
      </Form>

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
      <BulkImportModal
        visible={bulkImportModalVisible}
        importMode={BulkModes.MEMBERS}
        onClose={hideImportModal}
        onImport={handleBulkImportSuccess}
      />
      <BulkInProgressModal visible={bulkInProgressVisible} />
    </div>
  );
};

export default Members;
