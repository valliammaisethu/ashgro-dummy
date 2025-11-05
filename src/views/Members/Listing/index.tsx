import React, { useCallback, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import Header from "../Header";
import useDrawer from "src/shared/hooks/useDrawer";
import MemberFilters from "../Filters";
import { Member, MembersListingParams } from "src/models/members.model";
import { areFiltersActive } from "../helpers";
import { MembersService } from "src/services/MembersService/members.service";
import MembersForm from "../MembersForm";
import ListHeader from "src/shared/components/atoms/Table/Profile/ListHeader";
import ConditionalRender from "src/shared/components/ConditionalRender";
import Profile from "src/shared/components/atoms/Table/Profile";
import Form from "src/shared/components/Form";
import { MemberShipService } from "src/services/SettingsService/memberShip.service";
import { formatDate } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import useRedirect from "src/shared/hooks/useRedirect";
import Actions from "src/shared/components/atoms/Table/Actions";
import { SettingFormModalModel } from "src/views/Settings/constants";
import { memberHeaders } from "../MembersForm/constants";

import styles from "./membersListing.module.scss";
import { VisibilityType } from "src/enums/visibilityType.enum";

interface ModalState {
  open: boolean;
  mode: SettingFormModalModel;
  item?: Member;
}

const Members = () => {
  const [queryParams, setQueryParams] = useState<MembersListingParams>(
    new MembersListingParams(),
  );
  const filtersActive = useMemo(
    () => areFiltersActive(queryParams),
    [queryParams],
  );
  const {
    visible: memberFiltersVisible,
    toggleVisibility: toggleMemberFilters,
  } = useDrawer();

  const { navigateToMemberDetails } = useRedirect();

  const { getStaffMembersList, updateMemberStatus } = MembersService();
  const { memberShipStatuses } = MemberShipService();

  const { data: memberShipStatusesOptions = [] } =
    useQuery(memberShipStatuses());
  const { mutateAsync: updateMemberStatusMutate } =
    useMutation(updateMemberStatus());
  const { data, isFetching, isSuccess } = useQuery(
    getStaffMembersList(queryParams),
  );

  const handleSearch = useCallback((term: string) => {
    setQueryParams((prev) => ({ ...prev, search: term }));
  }, []);

  const handleApplyFilter = (filters: FieldValues) => {
    setQueryParams((prev) => ({
      ...prev,
      ...filters,
      joinedEndDate: filters.followUpDateRange?.[1],
      joinedStartDate: filters.followUpDateRange?.[0],
      leadSourcesIds: filters.leadSourceIds,
      membershipCategoriesIds: filters.membershipCategoriesIds,
      membershipStatusIds: filters.membershipStatusIds,
      page: 1,
    }));
    toggleMemberFilters();
  };

  const handleStatusChange = async (
    memberId?: string,
    membershipStatusId?: string,
  ) => {
    await updateMemberStatusMutate({ memberId, membershipStatusId });
  };

  const handleNavigateToDetails = (id?: string) => () =>
    navigateToMemberDetails(id);

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

  return (
    <div>
      <Header
        filtersActive={filtersActive}
        onFilter={toggleMemberFilters}
        onSearch={handleSearch}
        onAddMember={() => handleModalVisibility(VisibilityType.ADD)}
      />
      <MemberFilters
        toggleVisibility={toggleMemberFilters}
        visible={memberFiltersVisible}
        defaultValues={queryParams}
        onSubmit={handleApplyFilter}
      />
      <Form>
        <div className={styles.listContainer}>
          <ListHeader headers={memberHeaders} />

          <ConditionalRender
            records={data?.members}
            isPending={isFetching}
            isSuccess={isSuccess}
          >
            <div className={styles.body}>
              {data?.members?.map((item) => {
                const selectedValue = memberShipStatusesOptions.find(
                  (opt) => opt.label === item.membershipStatus,
                )?.value;

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
                      contactNumber={`${item?.countryCode} ${item?.contactNumber}`}
                      showCheckbox
                    />

                    <div className={styles.rowItem}>
                      {formatDate(item.joinedDate, DateFormats.DD_MMM__YYYY)}
                    </div>

                    <Actions
                      selectWidth={200}
                      selectedValue={selectedValue}
                      options={memberShipStatusesOptions}
                      onSelectChange={(value) =>
                        handleStatusChange(item.id, value)
                      }
                      onEditClick={() => handleEditClick(item)}
                      onDeleteClick={() => {}}
                    />
                  </div>
                );
              })}
            </div>
          </ConditionalRender>
        </div>
      </Form>

      {modalState.open && (
        <MembersForm
          isOpen={modalState.open}
          handleModalVisibility={() => handleModalVisibility(null)}
          id={modalState?.item?.id}
        />
      )}
    </div>
  );
};

export default Members;
