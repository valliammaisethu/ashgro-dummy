import React, { useCallback, useState } from "react";
import Header from "./Header";
import {
  StaffMemberDetails,
  StaffMembersListingParams,
} from "src/models/staffMember.model";
import Form from "src/shared/components/Form";

import styles from "./staffMemberListing.module.scss";
import ListHeader from "src/shared/components/atoms/Table/Profile/ListHeader";
import { staffMemberHeaders } from "../constants";
import ConditionalRender from "src/shared/components/ConditionalRender";
import { StaffMembersService } from "src/services/StaffMembersService/staffMembers.service";
import { useQuery } from "@tanstack/react-query";
import Profile from "src/shared/components/atoms/Table/Profile";
import Actions from "src/shared/components/atoms/Table/Actions";
import useRedirect from "src/shared/hooks/useRedirect";
import { SettingFormModalModel } from "src/views/Settings/constants";
import StaffMembersForm from "../StaffMembersForm";
import DeleteModal from "../DeleteModal";

interface ModalState {
  open: boolean;
  mode: SettingFormModalModel;
  item?: StaffMemberDetails;
}

interface DeleteModalState {
  open: boolean;
  item?: StaffMemberDetails;
}

const StaffMembersListing = () => {
  const [, setQueryParams] = useState<StaffMembersListingParams>(
    new StaffMembersListingParams(),
  );
  const handleSearch = useCallback((term: string) => {
    setQueryParams((prev) => ({ ...prev, search: term }));
  }, []);
  const [deleteItem, setDeleteItem] = useState<
    StaffMemberDetails | undefined
  >();

  const { navigateToStaffMemberDetails } = useRedirect();

  const handleFilter = (filters: Partial<StaffMembersListingParams>) =>
    setQueryParams((prev) => ({ ...prev, ...filters, page: 1 }));

  const { getStaffMembersList } = StaffMembersService();

  const { data, isFetching, isSuccess } = useQuery(getStaffMembersList());

  const handleNavigateToDetails = (id?: string) => () =>
    navigateToStaffMemberDetails(id);

  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    mode: null,
  });

  const handleModalVisibility = (
    mode: SettingFormModalModel,
    item?: StaffMemberDetails,
  ) => {
    setModalState({ open: !!mode, mode, item });
  };

  return (
    <div>
      <Header
        onFilter={handleFilter}
        onStaffAdd={() => handleModalVisibility("add")}
        onSearch={handleSearch}
      />
      <Form>
        <div className={styles.listContainer}>
          <ListHeader headers={staffMemberHeaders} />

          <ConditionalRender
            records={data?.staffs}
            isPending={isFetching}
            isSuccess={isSuccess}
          >
            <div className={styles.body}>
              {data?.staffs?.map((item) => {
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
                    />

                    <div className={styles.rowItem}>
                      {item?.staffDepartment}
                    </div>
                    <div className={styles.rowItem}>{item?.title}</div>

                    <Actions
                      showSelect={false}
                      onEditClick={() => handleModalVisibility("edit", item)}
                      onDeleteClick={() => setDeleteItem(item)}
                    />
                  </div>
                );
              })}
            </div>
          </ConditionalRender>
        </div>
      </Form>

      {
        <DeleteModal
          visible={!!deleteItem?.id}
          toggleVisibility={() => setDeleteItem(undefined)}
          staffMember={deleteItem}
        />
      }

      {modalState.open && (
        <StaffMembersForm
          isOpen={modalState.open}
          handleModalVisibility={() => handleModalVisibility(null)}
          id={modalState?.item?.id}
        />
      )}
    </div>
  );
};

export default StaffMembersListing;
