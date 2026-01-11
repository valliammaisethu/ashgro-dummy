import React from "react";
import { ColumnsType } from "antd/es/table";
import { IconEdit, IconDelete } from "obra-icons-react";
import dayjs from "dayjs";

import { ProspectsList } from "src/models/prospects.model";
import PhoneNumberLabel from "src/shared/components/Table/atoms/PhoneNumberLabel";
import { Colors } from "src/enums/colors.enum";
import StatusDropdown from "src/shared/components/StatusDropdown";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { LeadStatus } from "src/models/meta.model";
import ProspectFollowUpDate from "./Components/ProspectFollowUpDate";

import styles from "./listing.module.scss";

interface ColumnProps {
  handleOnEdit: (prospect: ProspectsList) => void;
  handleOnDelete: (prospect: ProspectsList) => void;
  leadStatusOptions: LeadStatus[];
  onStatusChange: (prospectId: string, leadStatusId: string) => void;
  updatingProspectId?: string;
  onFollowUpDateChange: (
    prospectId: string,
    date: dayjs.Dayjs | null,
  ) => Promise<void>;
  updatingFollowUpId?: string;
}

export const getColumns = ({
  handleOnEdit,
  handleOnDelete,
  leadStatusOptions,
  onStatusChange,
  updatingProspectId,
  onFollowUpDateChange,
  updatingFollowUpId,
}: ColumnProps): ColumnsType<ProspectsList> => [
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
    width: "13%",
    render: (_, record) => (
      <PhoneNumberLabel phoneNumber={record?.contactNumber} />
    ),
  },
  {
    title: "Follow-up Date",
    dataIndex: "followUpDate",
    width: "10%",
    render: (_, record) => (
      <ProspectFollowUpDate
        record={record}
        onFollowUpDateChange={onFollowUpDateChange}
        isUpdatingFollowUpDate={updatingFollowUpId === record?.id}
      />
    ),
  },
  {
    title: "Inquiry Date",
    dataIndex: "inquiryDate",
    key: "inquiryDate",
    width: "10%",
  },
  {
    title: "Lead Source",
    dataIndex: "leadSource",
    key: "leadSource",
    width: "10%",
  },
  {
    title: "Lead Status",
    dataIndex: "status",
    key: "status",
    width: "10%",
    render: (status, record) => (
      <div onClick={stopPropagation}>
        <StatusDropdown
          value={record.leadStatus ?? status}
          options={leadStatusOptions || []}
          onChange={(newStatus) => onStatusChange(record.id!, newStatus)}
          loading={updatingProspectId === record.id}
          onClick={stopPropagation}
        />
      </div>
    ),
  },
  {
    title: "",
    key: "actions",
    width: "7%",
    render: (_, record) => (
      // TODO: avoid using inline function in #220
      <div className={styles.actionsCell}>
        <IconEdit
          onClick={(e) => {
            stopPropagation(e);
            handleOnEdit(record);
          }}
          size={20}
          color={Colors.MODAL_CLOSE_ICON}
        />
        <IconDelete
          onClick={(e) => {
            stopPropagation(e);
            handleOnDelete(record);
          }}
          size={20}
          color={Colors.MODAL_CLOSE_ICON}
        />
      </div>
    ),
  },
];
