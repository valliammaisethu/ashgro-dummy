import React from "react";
import { ColumnsType } from "antd/es/table";

import { Member } from "src/models/members.model";
import PhoneNumberLabel from "src/shared/components/Table/atoms/PhoneNumberLabel";
import { Colors } from "src/enums/colors.enum";
import StatusDropdown from "src/shared/components/StatusDropdown";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { formatDate } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import RowActions from "src/shared/components/Table/atoms/RowActions";

interface ColumnProps {
  handleOnEdit: (member: Member) => void;
  handleOnDelete: (member: Member) => void;
  statusOptions: any[]; // Using any[] to match StatusDropdown flexibility or we can be specific
  onStatusChange: (memberId: string, statusId: string) => void;
  updatingMemberId?: string;
}

export const getColumns = ({
  handleOnEdit,
  handleOnDelete,
  statusOptions,
  onStatusChange,
  updatingMemberId,
}: ColumnProps): ColumnsType<Member> => [
  {
    title: "Phone Number",
    dataIndex: "contactNumber",
    key: "contactNumber",
    width: "15%",
    render: (_, record) => (
      <PhoneNumberLabel phoneNumber={record?.contactNumber} />
    ),
  },
  {
    title: "Joined Date",
    dataIndex: "joinedDate",
    key: "joinedDate",
    width: "15%",
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
        <StatusDropdown
          value={record.membershipStatus ?? status}
          options={statusOptions || []}
          onChange={(newStatus) => onStatusChange(record.id!, newStatus)}
          loading={updatingMemberId === record.id}
          onClick={stopPropagation}
        />
      </div>
    ),
  },
  {
    title: "",
    key: "actions",
    width: "10%",
    render: (_, record) => (
      <RowActions
        item={record}
        onEdit={handleOnEdit}
        onDelete={handleOnDelete}
      />
    ),
  },
];
