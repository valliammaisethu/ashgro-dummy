import React, { MouseEvent } from "react";
import { CheckboxChangeEvent } from "antd";
import { IconDelete, IconEdit, IconCalendarDates } from "obra-icons-react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { LoadingOutlined } from "@ant-design/icons";

import { ProspectsList } from "src/models/prospects.model";
import { LeadStatus } from "src/models/meta.model";
import { formatDate } from "src/shared/utils/dateUtils";
import { toTitleCase } from "src/shared/utils/parser";
import { fillEmptyData, getFullName } from "src/shared/utils/helpers";
import AvatarFallback from "src/shared/components/AvatarFallback";
import Checkbox from "src/shared/components/Checkbox";
import { DateFormats } from "src/enums/dateFormats.enum";
import { Colors } from "src/enums/colors.enum";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import Loader from "src/shared/components/Loader";
import { LoaderSizes } from "src/enums/LoaderSizes";

import styles from "./prospectRow.module.scss";
import { stopPropagation } from "src/shared/utils/eventUtils";
import StatusDropdown from "src/shared/components/StatusDropdown";

interface ProspectRowProps {
  prospect: ProspectsList;
  isSelected: boolean;
  leadStatusOptions?: LeadStatus[];
  onSelectChange: (checked: boolean) => void;
  onClick: () => void;
  onEditClick: (data: ProspectsList) => void;
  onDeleteClick: (data: ProspectsList) => void;
  onStatusChange?: (prospectId: string, leadStatusId: string) => void;
  isUpdatingStatus?: boolean;
  onFollowUpDateChange?: (
    prospectId: string,
    date: dayjs.Dayjs | null,
  ) => Promise<void>;
  isUpdatingFollowUpDate?: boolean;
}

const { DD_MMM__YYYY } = DateFormats;

const ProspectRow: React.FC<ProspectRowProps> = ({
  prospect,
  isSelected,
  leadStatusOptions = [],
  onSelectChange,
  onClick,
  onEditClick,
  onDeleteClick,
  onStatusChange,
  isUpdatingStatus = false,
  onFollowUpDateChange,
  isUpdatingFollowUpDate = false,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const {
    leadStatus,
    firstName,
    lastName,
    email,
    countryCode,
    contactNumber,
    followUpDate,
    leadSource,
    profilePictureUrl,
  } = prospect;

  const handleCheckboxChange = (e?: CheckboxChangeEvent) => {
    e?.stopPropagation();
    onSelectChange(e?.target?.checked || false);
  };

  const handleSelectClick = (e: React.MouseEvent) => e.stopPropagation();

  const handleEditClick = (e: React.MouseEvent, data: ProspectsList) => {
    e.stopPropagation();
    onEditClick(data);
  };

  const handleDeleteClick = (e: MouseEvent, data: ProspectsList) => {
    e.stopPropagation();
    onDeleteClick(data);
  };

  const handleStatusChange = (statusName: string) => {
    const selectedStatus = leadStatusOptions?.find(
      (status) => status?.id === statusName,
    );

    if (selectedStatus?.id && prospect?.id && onStatusChange) {
      onStatusChange(prospect?.id, selectedStatus?.id);
    }
  };

  const handleDatePickerClose = () => setIsDatePickerOpen(false);
  const handleDatePickerOpen = () => setIsDatePickerOpen(true);

  const handleDateChange = async (date: dayjs.Dayjs | null) => {
    if (!prospect?.id) return;
    await onFollowUpDateChange?.(prospect?.id, date);
    handleDatePickerClose();
  };

  return (
    <div onClick={onClick} className={styles.tableRow}>
      <div className={styles.checkboxCol} onClick={stopPropagation}>
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
      </div>

      <div className={styles.prospectCol}>
        <div className={styles.prospectInfo}>
          <AvatarFallback
            src={profilePictureUrl}
            name={getFullName(firstName, lastName)}
            size={56}
            className={styles.avatar}
          />
          <div className={styles.details}>
            <div className={styles.name}>
              {getFullName(firstName, lastName)}
            </div>
            <div className={styles.contact}>
              <span className={styles.email}>{email}</span>
              {contactNumber && (
                <span
                  className={styles.phone}
                >{`${countryCode} ${contactNumber}`}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dateColValue} onClick={stopPropagation}>
        <ConditionalRenderComponent
          visible={!isUpdatingFollowUpDate}
          fallback={
            <Loader
              loading={isUpdatingFollowUpDate}
              icon={<LoadingOutlined spin />}
              size={LoaderSizes.SMALL}
            />
          }
        >
          <div
            onClick={handleDatePickerOpen}
            className={styles.followUpDateContainer}
          >
            <div className={styles.followUpDateLabel}>
              <span>
                {fillEmptyData(formatDate(followUpDate, DD_MMM__YYYY))}
              </span>
              <IconCalendarDates size={16} color={Colors.ASHGRO_GOLD} />
            </div>
            <DatePicker
              open={isDatePickerOpen}
              onOpenChange={handleDatePickerClose}
              value={followUpDate ? dayjs(followUpDate) : null}
              onChange={handleDateChange}
              format={DD_MMM__YYYY}
              inputReadOnly
              allowClear={false}
              className={styles.datePicker}
              style={{
                visibility: "hidden",
                width: 0,
                height: 0,
                padding: 0,
                border: 0,
              }}
            />
          </div>
        </ConditionalRenderComponent>
      </div>

      <div className={styles.sourceColValue}>
        {fillEmptyData(toTitleCase(leadSource))}
      </div>
      <StatusDropdown
        value={leadStatus}
        options={leadStatusOptions || []}
        onChange={handleStatusChange}
        loading={isUpdatingStatus}
        onClick={handleSelectClick}
      />
      <div className={styles.actions}>
        <IconEdit
          onClick={(e) => handleEditClick(e, prospect)}
          size={20}
          color={Colors.MODAL_CLOSE_ICON}
        />
        <IconDelete
          onClick={(e) => handleDeleteClick(e, prospect)}
          size={20}
          color={Colors.MODAL_CLOSE_ICON}
        />
      </div>
    </div>
  );
};

export default ProspectRow;
