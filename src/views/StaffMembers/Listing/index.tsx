import React, { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Header from "./Header";
import {
  StaffMemberDetails,
  StaffMembersListingParams,
} from "src/models/staffMember.model";
import Table from "src/shared/components/Table";
import { getColumns } from "./columns";

import { StaffMembersService } from "src/services/StaffMembersService/staffMembers.service";
import useRedirect from "src/shared/hooks/useRedirect";
import { SettingFormModalModel } from "src/views/Settings/constants";
import StaffMembersForm from "../StaffMembersForm";
import DeleteModal from "../DeleteModal";
import { VisibilityType } from "src/enums/visibilityType.enum";

interface ModalState {
  open: boolean;
  mode: SettingFormModalModel;
  item?: StaffMemberDetails;
}

const StaffMembersListing = () => {
  const [queryParams, setQueryParams] = useState<StaffMembersListingParams>(
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

  const handlePageChange = useCallback((newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  }, []);

  const { getStaffMembersList } = StaffMembersService();

  const { data, isFetching } = useQuery(getStaffMembersList(queryParams));

  const handleNavigateToDetails = useCallback(
    (id?: string) => () => navigateToStaffMemberDetails(id),
    [navigateToStaffMemberDetails],
  );

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

  const columns = useMemo(
    () =>
      getColumns({
        handleOnEdit: (item) =>
          handleModalVisibility(VisibilityType.EDIT, item),
        handleOnDelete: (item) => setDeleteItem(item),
      }),
    [],
  );

  const handleRowClick = useCallback(
    (record: StaffMemberDetails) => ({
      onClick: handleNavigateToDetails(record.id),
    }),
    [handleNavigateToDetails],
  );

  return (
    <div>
      <Header
        onFilter={handleFilter}
        onStaffAdd={() => handleModalVisibility(VisibilityType.ADD)}
        onSearch={handleSearch}
      />
      <Table<StaffMemberDetails>
        columns={columns}
        dataSource={data?.staffs}
        currentPage={data?.pagination?.currentPage ?? queryParams.page}
        totalPages={data?.pagination?.overallPages}
        onPageChange={handlePageChange}
        hasData={!!data?.staffs?.length}
        onRow={handleRowClick}
        loading={isFetching}
      />

      <DeleteModal
        visible={!!deleteItem?.id}
        toggleVisibility={() => setDeleteItem(undefined)}
        staffMember={deleteItem}
      />
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
