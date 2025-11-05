import React, { useCallback, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IconChevronLeft, IconChevronRight } from "obra-icons-react";

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
import { PageListingDirections } from "src/views/Prospects/Listing/constants";
import Button from "src/shared/components/Button";

import styles from "./membersListing.module.scss";
import { fallbackHandler } from "src/shared/utils/commonHelpers";
import DeleteModal from "../DeleteModal";

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
    handleModalVisibility("edit", member);
  };

  const [deleteItem, setDeleteItem] = useState<Member | undefined>();

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
      <Header
        filtersActive={filtersActive}
        onFilter={toggleMemberFilters}
        onSearch={handleSearch}
        onAddMember={() => handleModalVisibility("add")}
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
            <div className={styles.listContainer}>
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
                      contactNumber={
                        item?.contactNumber
                          ? `${item?.countryCode} ${item?.contactNumber}`
                          : undefined
                      }
                      showCheckbox
                    />

                    <div className={styles.rowItem}>
                      {fallbackHandler(
                        formatDate(item.joinedDate, DateFormats.DD_MMM__YYYY),
                      )}
                    </div>

                    <Actions
                      selectWidth={200}
                      selectedValue={selectedValue}
                      options={memberShipStatusesOptions}
                      onSelectChange={(value) =>
                        handleStatusChange(item.id, value)
                      }
                      onEditClick={() => handleEditClick(item)}
                      onDeleteClick={() => setDeleteItem(item)}
                    />
                  </div>
                );
              })}
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
      </Form>

      {
        <DeleteModal
          visible={!!deleteItem?.id}
          toggleVisibility={() => setDeleteItem(undefined)}
          member={deleteItem}
        />
      }

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
