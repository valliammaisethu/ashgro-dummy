import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import SearchField from "src/shared/components/SearchField";
import Form from "src/shared/components/Form";
import SelectField from "src/shared/components/SelectField";
import AddUserButton from "src/shared/components/atoms/Buttons/AddUserButton";
import { Buttons } from "src/enums/buttons.enum";
import { ClubStaffHeaderProps } from "src/shared/types/clubStaff.type";
import { staffMembersConstants } from "../../constants";
import { MetaService } from "src/services/MetaService/meta.service";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";

import styles from "../../staffMembers.module.scss";

const { ADD_STAFF } = Buttons;
const { field, filterTitle } = staffMembersConstants;

const Header = (props: ClubStaffHeaderProps) => {
  const { onStaffAdd, onSearch, onFilter } = props;
  const { getStaffDepartments } = MetaService();

  const { data: staffDepartments } = useQuery(getStaffDepartments());

  const handleDepartmentChange = (value: string[]) =>
    onFilter?.({
      staffDepartmentIds: value,
    });

  const staffDepartmentsOptions = useMemo(
    () => mapToSelectOptionsDynamic(staffDepartments?.staffDepartments),
    [staffDepartments],
  );
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <SearchField onSearch={onSearch} />
      </div>

      <Form className={styles.right}>
        <SelectField
          className={styles.staffFilter}
          options={staffDepartmentsOptions}
          name={field}
          placeholder={filterTitle}
          showCheckboxes
          showSelectedCount
          onChange={handleDepartmentChange}
        />
        <AddUserButton onClick={onStaffAdd} label={ADD_STAFF} />
      </Form>
    </div>
  );
};

export default Header;
