import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Header from "./Header";
import { staffMemberHeaders } from "../constants";
import { StaffMembersListingParams } from "src/models/staffMember.model";
import Form from "src/shared/components/Form";
import ListHeader from "src/shared/components/atoms/Table/Profile/ListHeader";
import ConditionalRender from "src/shared/components/ConditionalRender";
import Profile from "src/shared/components/atoms/Table/Profile";
import Pagination from "src/shared/components/Pagination";
import { StaffMembersService } from "src/services/StaffMembersService/staffMembers.service";

import styles from "./staffMemberListing.module.scss";

const StaffMembersListing = () => {
  const [queryParams, setQueryParams] = useState<StaffMembersListingParams>(
    new StaffMembersListingParams(),
  );
  const handleSearch = useCallback((term: string) => {
    setQueryParams((prev) => ({ ...prev, search: term }));
  }, []);

  const handleFilter = (filters: Partial<StaffMembersListingParams>) =>
    setQueryParams((prev) => ({ ...prev, ...filters, page: 1 }));

  const handlePageChange = useCallback((newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  }, []);

  const { getStaffMembersList } = StaffMembersService();

  const { data, isFetching, isSuccess } = useQuery(
    getStaffMembersList(queryParams),
  );

  return (
    <div>
      <Header
        onFilter={handleFilter}
        onStaffAdd={() => {}}
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
                  <div key={item.id} className={styles.rowContainer}>
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
              hasData={!!data?.staffs && data.staffs.length > 0}
            />
          </ConditionalRender>
        </div>
      </Form>
    </div>
  );
};

export default StaffMembersListing;
