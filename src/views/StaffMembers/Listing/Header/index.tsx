import { IconUserAdd } from "obra-icons-react";
import React, { useMemo } from "react";
import Button from "src/shared/components/Button";
import SearchField from "src/shared/components/SearchField";
import { ClubStaffHeaderProps } from "src/shared/types/clubStaff.type";

import styles from "../../staffMembers.module.scss";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";
import Form from "src/shared/components/Form";
import SelectField from "src/shared/components/SelectField";
import { staffMembersConstants } from "../../constants";
import { MetaService } from "src/services/MetaService/meta.service";
import { useQuery } from "@tanstack/react-query";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";

const { SECONDARY } = ButtonTypes;
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
        <Button
          className={styles.addStaffButton}
          type={SECONDARY}
          icon={<IconUserAdd size={20} />}
          onClick={onStaffAdd}
        >
          {ADD_STAFF}
        </Button>
      </Form>
    </div>
  );
};

export default Header;
