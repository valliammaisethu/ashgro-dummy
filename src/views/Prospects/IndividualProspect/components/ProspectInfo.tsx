import React, { useState } from "react";
import { IconCalendarDates, IconCall, IconEmail } from "obra-icons-react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

import { Colors } from "src/enums/colors.enum";
import { PROSPECT_LABELS } from "../constants";
import IconText from "../atoms/IconText";

import styles from "../individualProspect.module.scss";
import { ViewProspect } from "src/models/viewProspect.model";
import { getFullName } from "src/shared/utils/helpers";
import { formatDate, convertDateToApiFormat } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import { getPhoneNumber } from "../utils";
import { AttachmentService } from "src/services/AttachmentService/attachment.service";
import { useQuery, useMutation } from "@tanstack/react-query";
import { formatAndSetPhoneNumber } from "src/shared/utils/phoneNumberUtils";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import Loader from "src/shared/components/Loader";

interface ProspectInfoProps {
  data?: ViewProspect;
  onRefetch?: () => void;
  clubId?: string;
}

const ProspectInfo: React.FC<ProspectInfoProps> = ({
  data: prospect = new ViewProspect(),
  onRefetch,
  clubId,
}) => {
  const {
    firstName,
    lastName,
    followUpDate,
    contactNumber,
    countryCode,
    email,
    attachmentId,
    id,
  } = prospect;

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { getAttachmentPreview } = AttachmentService();

  const { editProspect } = ProspectsService();

  const { mutateAsync: updateProspectMutation, isPending: isUpdating } =
    useMutation(editProspect());

  const { data: attachmentPreview } = useQuery({
    ...getAttachmentPreview(attachmentId),
    enabled: !!attachmentId,
  });

  const handleFollowUpDateChange = async (date: dayjs.Dayjs | null) => {
    if (date && id) {
      await updateProspectMutation(
        {
          prospect: {
            id: String(id),
            followUpDate: convertDateToApiFormat(
              date.format(DateFormats.DD_MMM_YYYY),
              DateFormats.DD_MMM_YYYY,
            ),
            clubId,
          },
        },
        {
          onSuccess: () => {
            onRefetch?.();
            setIsDatePickerOpen(false);
          },
        },
      );
    }
  };

  return (
    <div className={styles.top}>
      <div className={styles.left}>
        <img src={attachmentPreview} className={styles.prospectImage} />
      </div>
      <div className={styles.right}>
        <div className={styles.name}>{getFullName(firstName, lastName)}</div>
        <div className={styles.details}>
          <span className={styles.dateTitle}>
            {PROSPECT_LABELS.followUpDate}
          </span>
          <IconCalendarDates
            strokeWidth={1.25}
            color={Colors.ASHGRO_GOLD}
            onClick={() => setIsDatePickerOpen(true)}
            className={styles.calendarIcon}
          />
          <DatePicker
            open={isDatePickerOpen}
            onOpenChange={setIsDatePickerOpen}
            value={followUpDate ? dayjs(followUpDate) : null}
            onChange={handleFollowUpDateChange}
            format={DateFormats.DD_MMM__YYYY}
            className={styles.datePicker}
            suffixIcon={null}
            placeholder={formatDate(followUpDate, DateFormats.DD_MMM__YYYY)}
            inputReadOnly
            allowClear={false}
          />
          <Loader loading={isUpdating} />
        </div>
        <div className={styles.email}>
          <IconText
            icon={<IconEmail color={Colors.ASHGRO_GOLD} size={20} />}
            text={email}
            className={styles.mail}
          />
          <IconText
            icon={<IconCall color={Colors.ASHGRO_GOLD} size={20} />}
            text={formatAndSetPhoneNumber(
              getPhoneNumber(countryCode, contactNumber),
            )}
            className={styles.phone}
          />
        </div>
      </div>
    </div>
  );
};

export default ProspectInfo;
