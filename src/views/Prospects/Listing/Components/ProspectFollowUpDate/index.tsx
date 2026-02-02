import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { LoadingOutlined } from "@ant-design/icons";
import { IconCalendarDates } from "obra-icons-react";

import { ProspectsList } from "src/models/prospects.model";
import { Colors } from "src/enums/colors.enum";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { formatDate } from "src/shared/utils/dateUtils";
import { fillEmptyData } from "src/shared/utils/helpers";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import Loader from "src/shared/components/Loader";
import { LoaderSizes } from "src/enums/LoaderSizes";
import { DateFormats } from "src/enums/dateFormats.enum";

import styles from "../../listing.module.scss";

const { MMM_DD__YYYY } = DateFormats;

const ProspectFollowUpDate = ({
  record,
  onFollowUpDateChange,
  isUpdatingFollowUpDate,
}: {
  record: ProspectsList;
  onFollowUpDateChange: (
    prospectId: string,
    date: dayjs.Dayjs | null,
  ) => Promise<void>;
  isUpdatingFollowUpDate: boolean;
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  const handleDatePickerClose = () => setIsDatePickerOpen(false);
  const handleDatePickerOpen = () => setIsDatePickerOpen(true);

  const handleDateChange = async (date: dayjs.Dayjs | null) => {
    if (!record?.id) return;
    await onFollowUpDateChange(record.id, date);
    handleDatePickerClose();
  };

  return (
    <div onClick={stopPropagation}>
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
            <IconCalendarDates size={18} color={Colors.ASHGRO_GOLD} />
            <span>
              {fillEmptyData(formatDate(record.followUpDate, MMM_DD__YYYY))}
            </span>
          </div>
          <DatePicker
            open={isDatePickerOpen}
            onOpenChange={handleDatePickerClose}
            value={record.followUpDate ? dayjs(record.followUpDate) : null}
            onChange={handleDateChange}
            format={MMM_DD__YYYY}
            inputReadOnly
            allowClear={false}
            className={styles.datePicker}
          />
        </div>
      </ConditionalRenderComponent>
    </div>
  );
};

export default ProspectFollowUpDate;
