import React from "react";
import { ColumnsType } from "antd/es/table";
import { Select } from "antd";

import { Member } from "src/models/members.model";
import PhoneNumberLabel from "src/shared/components/Table/atoms/PhoneNumberLabel";
import { Colors } from "src/enums/colors.enum";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { formatDate } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import RowActions from "src/shared/components/Table/atoms/RowActions";
import {
  selectStatus,
  selectStatusClassName,
} from "src/constants/sharedComponents";

interface ColumnProps {
  handleOnEdit: (member: Member) => void;
  handleOnDelete: (member: Member) => void;
  statusOptions: any[]; // Using any[] to match StatusDropdown flexibility or we can be specific
  onStatusChange: (memberId: string, statusId: string) => void;
  membershipCategoryOptions?: any[];
  onCategoryChange?: (memberId: string, categoryId: string) => void;
  updatingMemberId?: string;
  updatingCategoryId?: string;
}

export const getColumns = ({
  handleOnEdit,
  handleOnDelete,
  statusOptions,
  onStatusChange,
  membershipCategoryOptions,
  onCategoryChange,
  updatingMemberId,
  updatingCategoryId,
}: ColumnProps): ColumnsType<Member> => [
  {
    title: "Phone Number",
    dataIndex: "contactNumber",
    key: "contactNumber",
    width: "10%",
    render: (_, record) => (
      <PhoneNumberLabel phoneNumber={record?.contactNumber} />
    ),
  },
  {
    title: "Membership Category",
    dataIndex: "membershipCategory",
    key: "membershipCategory",
    width: "15%",
    render: (category, record) => (
      <div onClick={stopPropagation}>
        <Select
          value={record.membershipCategoryId ?? category}
          options={membershipCategoryOptions}
          onChange={(newCategory) =>
            onCategoryChange?.(record.id!, newCategory)
          }
          loading={updatingCategoryId === record.id}
          className={selectStatusClassName}
          onClick={stopPropagation}
          placeholder="Select Category"
        />
      </div>
    ),
  },
  {
    title: "Joined Date",
    dataIndex: "joinedDate",
    key: "joinedDate",
    width: "10%",
    render: (date) => (
      <span style={{ color: Colors.ASHGRO_NAVY, fontSize: "1.4rem" }}>
        {formatDate(date, DateFormats.DD_MMM__YYYY)}
      </span>
    ),
  },
  {
    title: "Member Status",
    dataIndex: "membershipStatus",
    key: "status",
    width: "15%",
    render: (status, record) => (
      <div onClick={stopPropagation}>
        <Select
          value={record.membershipStatus ?? status}
          options={statusOptions?.map((opt) => ({
            label: opt.statusName,
            value: opt.id,
          }))}
          onChange={(newStatus) => onStatusChange(record.id!, newStatus)}
          loading={updatingMemberId === record.id}
          className={selectStatusClassName}
          onClick={stopPropagation}
          placeholder={selectStatus}
        />
      </div>
    ),
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
