import React, { useCallback } from "react";
import { Col, Row } from "antd";
import dayjs from "dayjs";
import { FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import Modal from "src/shared/components/Modal";
import Form from "src/shared/components/Form";
import useForm from "src/shared/components/UseForm";
import InputField from "src/shared/components/InputField";
import RadioField from "src/shared/components/RadioField";
import DatePicker from "src/shared/components/DatePicker";
import TimeRangePicker from "src/shared/components/TimeRangePicker";
import { convertTo24hrs, disablePastDates } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import { Justify } from "src/enums/align.enum";
import { BOOK_MEETING_FIELDS, BOOK_MEETING_META } from "./constants";
import { BookMeetingProps } from "src/shared/types/calender";
import { validationSchema } from "./validationSchema";
import PaginatedDropdown from "src/shared/components/PaginatedDropdown";
import {
  getMembersMetaList,
  getProspectssMetaList,
} from "src/services/MetaService/meta.service";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import { BookMeeting as BookMeetingModel } from "src/models/calender.model";
import { QueryParams } from "src/models/queryParams.model";
import { CalenderService } from "src/services/Calender/calender.service";
import { PaginatedOptions } from "src/models/common.model";

import styles from "./bookMeeting.module.scss";

const { TITLE, TYPE, NAME, SLOT_DATE, MEETING_TIME, USER } =
  BOOK_MEETING_FIELDS;
const { BOOK_MEETING, RESCHEDULE_MEETING, RESCHEDULE_NOW } = BOOK_MEETING_META;
const { YYYY_MM_DD } = DateFormats;
const { GET_MEMBERS_META_LIST, GET_PROSPECTS_META_LIST } = QueryKeys;

const BookMeeting = ({
  isOpen = false,
  calendarEvent,
  onClose,
  selectedDate,
}: BookMeetingProps) => {
  const dateSource = calendarEvent?.id ?? selectedDate;

  const methods = useForm({
    validationSchema,
    defaultValues: {
      slotDate: dateSource ? dayjs(dateSource).format(YYYY_MM_DD) : "",
      title: (calendarEvent?.title as string) ?? "",
      bookedUserType: calendarEvent?.resource?.bookedUserType ?? "",
    },
  });

  const { bookMeeting } = CalenderService();

  const { mutateAsync: addMeeting, isPending: isAddMeetingLoading } =
    useMutation(bookMeeting());

  const {
    handleSubmit,
    formState: { isValid },
    watch,
    setValue,
  } = methods;

  const handleClose = () => {
    methods.reset({});
    onClose?.();
  };

  const isMembersSelected =
    watch(TYPE.name as keyof BookMeetingModel) === TYPE.options[0].value;

  const fetchMembersOrProspects = useCallback(
    (params: Partial<QueryParams>) =>
      (isMembersSelected ? getProspectssMetaList : getMembersMetaList)(params),
    [isMembersSelected],
  );

  const handleFormSubmit = async (data: FieldValues) => {
    const paylaod = {
      ...data,
      startTime: convertTo24hrs(data.meetingTime.startTime),
      endTime: convertTo24hrs(data.meetingTime.endTime),
    };

    await addMeeting(paylaod, { onSuccess: onClose });
  };

  const handleSelectUserType = (user: PaginatedOptions) => {
    const { id = "", label = "" } = user;
    if (!id || !label) return;
    setValue(USER.USER_ID, id);
    setValue(USER.USER_NAME, label);
  };

  return (
    <Modal
      cancelButtonProps={{ className: "d-none" }}
      title={calendarEvent?.id ? RESCHEDULE_MEETING : BOOK_MEETING}
      visible={isOpen}
      okText={calendarEvent?.id ? RESCHEDULE_NOW : BOOK_MEETING}
      closeModal={handleClose}
      rootClassName={styles.bookMeeting}
      handleOk={handleSubmit(handleFormSubmit)}
      okButtonProps={{ disabled: !isValid, loading: isAddMeetingLoading }}
    >
      <Form methods={methods}>
        <Row gutter={[20, 20]} justify={Justify.SPACE_BETWEEN}>
          <Col span={12}>
            <InputField
              name={TITLE.name}
              label={TITLE.label}
              placeholder={TITLE.placeholder}
              required
              disabled={!!calendarEvent?.title}
            />
          </Col>
        </Row>

        <p className={styles.bookforLabel}>{TYPE.label}</p>

        <Row className={styles.selectType}>
          <RadioField
            name={TYPE.name}
            options={TYPE.options}
            disabled={!!calendarEvent?.resource?.bookedUserType}
          />
        </Row>

        <Row gutter={[15, 15]} justify={Justify.SPACE_BETWEEN}>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <PaginatedDropdown
                  name={NAME.name}
                  label={NAME.label}
                  placeholder={NAME.placeholder}
                  onPageUpdate={fetchMembersOrProspects}
                  queryKey={[
                    isMembersSelected
                      ? GET_PROSPECTS_META_LIST
                      : GET_MEMBERS_META_LIST,
                  ]}
                  value={methods.watch(NAME.name as keyof BookMeetingModel)}
                  onSelect={(_, user) =>
                    handleSelectUserType(user as PaginatedOptions)
                  }
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <DatePicker
              name={SLOT_DATE.name}
              label={SLOT_DATE.label}
              placeholder={SLOT_DATE.placeholder}
              required
              disabledDate={disablePastDates}
              format={YYYY_MM_DD}
              disabled={!!selectedDate}
            />
          </Col>
          <Col span={12}>
            <TimeRangePicker
              name={MEETING_TIME.name}
              label={MEETING_TIME.label}
              placeholder={[...MEETING_TIME.placeholder]}
              required
              changeOnScroll
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default React.memo(BookMeeting);
