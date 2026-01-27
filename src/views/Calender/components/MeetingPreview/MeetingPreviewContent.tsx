import React from "react";
import { IconCalendarDates, IconClock4Alt, IconClose } from "obra-icons-react";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { Colors } from "src/enums/colors.enum";
import {
  BOOK_MEETING_CONSTANTS,
  DELETE_MEETING_MODAL_PROPS,
} from "../../constants";
import { ButtonTypes } from "src/enums/buttons.enum";
import { DateFormats } from "src/enums/dateFormats.enum";
import { MeetingPopoverContentProps } from "src/shared/types/calender";
import Button from "src/shared/components/Button";
import BookedChatbotIcon from "../atoms/BookedChatbotIcon";
import { CommonService } from "src/services/CommonService.ts/common.service";
import { useMutation } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { responseHandlers } from "src/shared/utils/responseHandlers";
import DeleteModal from "src/shared/components/DeleteModal";
import TextTooltip from "src/shared/components/atoms/TextTooltip";

import styles from "./meetingPreview.module.scss";

const { CANCEL_BTN, RESCHEDULE } = BOOK_MEETING_CONSTANTS;
const { HH_MM_A, DDD_MMM_DO_YYYY } = DateFormats;

const MeetingPopoverContent: React.FC<MeetingPopoverContentProps> = ({
  event,
  onCancel,
  onReschedule,
  isBookedThroughBot,
}) => {
  const location = useLocation();

  const { refetchCalender } = responseHandlers();

  const { deleteResource } = CommonService();

  const { mutateAsync, isPending } = useMutation(deleteResource());

  const handleCancelEvent = async () => {
    const path = generatePath(ApiRoutes.CANCEL_MEETING, {
      slotId: event?.id,
    });
    await mutateAsync(
      {
        path: path,
        useCustomToast: true,
      },
      {
        onSuccess: (response) => {
          const slotDate = queryString.parse(location.search)?.month as string;
          refetchCalender({
            response,
            slotDate,
          });
          onCancel?.();
        },
      },
    );
  };
  return (
    <div className={styles.meetingPreviewCard}>
      <div className={styles.header}>
        <TextTooltip
          text={event?.resource?.bookedUserName}
          className={styles.name}
        />
        <IconClose onClick={onCancel} />
      </div>

      <div className={styles.details}>
        <p className={styles.title}>
          <TextTooltip
            text={event?.title as string}
            className={styles.ellipsisText}
          />

          <BookedChatbotIcon isBooked={isBookedThroughBot} isPastDate={false} />
        </p>
        <div className={styles.timeDetailsContainer}>
          <div className={styles.timeDetails}>
            <IconCalendarDates
              strokeWidth={1}
              size={20}
              color={Colors.ASHGRO_GOLD}
            />
            <p className={styles.meetingDetailsLabel}>
              {dayjs(event.date).format(DDD_MMM_DO_YYYY)}
            </p>
          </div>
          <div className={styles.timeDetails}>
            <IconClock4Alt
              strokeWidth={1}
              size={20}
              color={Colors.ASHGRO_GOLD}
            />
            <p className={styles.meetingDetailsLabel}>
              {dayjs(event.start).format(HH_MM_A)} –
              {dayjs(event.end).format(HH_MM_A)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <DeleteModal
          {...DELETE_MEETING_MODAL_PROPS}
          onDelete={handleCancelEvent}
          loading={isPending}
        >
          <Button
            type={ButtonTypes.LINK}
            className={styles.actionBtn}
            loading={isPending}
          >
            {CANCEL_BTN}
          </Button>
        </DeleteModal>
        <Button
          type={ButtonTypes.SECONDARY}
          className={styles.actionBtn}
          onClick={onReschedule}
        >
          {RESCHEDULE}
        </Button>
      </div>
    </div>
  );
};

export default MeetingPopoverContent;
