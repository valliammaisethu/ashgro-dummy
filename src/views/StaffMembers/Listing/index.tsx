import React, { useCallback, useState } from "react";
import Header from "./Header";
import { StaffMembersListingParams } from "src/models/staffMember.model";
import Form from "src/shared/components/Form";

import styles from "./staffMemberListing.module.scss";
import ListHeader from "src/shared/components/atoms/Table/Profile/ListHeader";
import { staffMemberHeaders } from "../constants";
import ConditionalRender from "src/shared/components/ConditionalRender";
import { StaffMembersService } from "src/services/StaffMembersService/staffMembers.service";
import { useQuery } from "@tanstack/react-query";
import Profile from "src/shared/components/atoms/Table/Profile";

const StaffMembersListing = () => {
  const [, setQueryParams] = useState<StaffMembersListingParams>(
    new StaffMembersListingParams(),
  );
  const handleSearch = useCallback((term: string) => {
    setQueryParams((prev) => ({ ...prev, search: term }));
  }, []);

  const handleFilter = (filters: Partial<StaffMembersListingParams>) =>
    setQueryParams((prev) => ({ ...prev, ...filters, page: 1 }));

  const { getStaffMembersList } = StaffMembersService();

  const { data, isFetching, isSuccess } = useQuery(getStaffMembersList());

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
          </ConditionalRender>
        </div>
      </Form>
    </div>
  );
};

export default StaffMembersListing;
