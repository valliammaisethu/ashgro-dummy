import React from "react";
import { ColumnsType } from "antd/es/table";
import { Select } from "antd";
import dayjs from "dayjs";

import { ProspectsList } from "src/models/prospects.model";
import PhoneNumberLabel from "src/shared/components/Table/atoms/PhoneNumberLabel";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { LeadStatus } from "src/models/meta.model";
import ProspectFollowUpDate from "./Components/ProspectFollowUpDate";
import RowActions from "src/shared/components/Table/atoms/RowActions";
import {
  selectStatus,
  selectStatusClassName,
} from "src/constants/sharedComponents";
import { DateFormats } from "src/enums/dateFormats.enum";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

interface ColumnProps {
  handleOnEdit: (prospect: ProspectsList) => void;
  handleOnDelete: (prospect: ProspectsList) => void;
  leadStatusOptions: LeadStatus[];
  onStatusChange: (prospectId?: string, leadStatusId?: string) => void;
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
    width: "10%",
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
    title: "Lead Status",
    dataIndex: "status",
    key: "status",
    width: "13%",
    render: (status, record) => (
      <div onClick={stopPropagation}>
        <Select
          value={record.leadStatus ?? status}
          options={leadStatusOptions?.map((opt) => ({
            label: opt.statusName,
            value: opt.id,
          }))}
          onChange={(newStatus) => onStatusChange(record?.id, newStatus)}
          loading={updatingProspectId === record.id}
          className={selectStatusClassName}
          onClick={stopPropagation}
          placeholder={selectStatus}
        />
      </div>
    ),
  },
  {
    title: "Lead Source",
    dataIndex: "leadSource",
    key: "leadSource",
    width: "10%",
  },
  {
    title: "Inquiry Date",
    dataIndex: "inquiryDate",
    key: "inquiryDate",
    width: "10%",
    render: (inquiryDate) => (
      <ConditionalRenderComponent visible={inquiryDate} hideFallback>
        <span>{dayjs(inquiryDate).format(DateFormats.MMM_DD__YYYY)}</span>
      </ConditionalRenderComponent>
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
