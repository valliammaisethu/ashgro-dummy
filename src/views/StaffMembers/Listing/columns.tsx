import React from "react";
import { ColumnsType } from "antd/es/table";

import { StaffMemberDetails } from "src/models/staffMember.model";
import RowActions from "src/shared/components/Table/atoms/RowActions";
import { fillEmptyData } from "src/shared/utils/helpers";

interface ColumnProps {
  handleOnEdit: (item: StaffMemberDetails) => void;
  handleOnDelete: (item: StaffMemberDetails) => void;
}

export const getColumns = ({
  handleOnEdit,
  handleOnDelete,
}: ColumnProps): ColumnsType<StaffMemberDetails> => [
  {
    title: "Department",
    dataIndex: "staffDepartment",
    key: "staffDepartment",
    width: "30%",
    render: (value) => fillEmptyData(value),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: "20%",
    render: (value) => fillEmptyData(value),
  },
  {
    title: "",
    key: "actions",
    width: "7%",
    render: (_, record) => (
      <RowActions
        item={record}
        onEdit={handleOnEdit}
        onDelete={handleOnDelete}
      />
    ),
  },
];
