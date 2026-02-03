import React, { useCallback, useEffect } from "react";
import { Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import Modal from "src/shared/components/Modal";
import Form from "src/shared/components/Form";
import useForm from "src/shared/components/UseForm";
import InputField from "src/shared/components/InputField";
import RadioField from "src/shared/components/RadioField";
import DatePicker from "src/shared/components/DatePicker";
import TimeRangePicker from "src/shared/components/TimeRangePicker";
import {
  formatDateValue,
  convertTo24hrs,
  disablePastAndFuture180,
} from "src/shared/utils/dateUtils";
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
import { getMeetingDefaultValues } from "../utils/calendarUtils";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

import styles from "./bookMeeting.module.scss";

const { TITLE, TYPE, NAME, SLOT_DATE, MEETING_TIME, USER } =
  BOOK_MEETING_FIELDS;
const { BOOK_MEETING, RESCHEDULE_MEETING, RESCHEDULE_NOW } = BOOK_MEETING_META;
const { MMM_DD__YYYY } = DateFormats;
const { GET_MEMBERS_META_LIST, GET_PROSPECTS_META_LIST } = QueryKeys;

const BookMeeting = ({
  isOpen = false,
  calendarEvent,
  onClose,
  selectedDate,
}: BookMeetingProps) => {
  const methods = useForm({
    validationSchema,
  });
  const { bookMeeting, rescheduleMeeting } = CalenderService();

  const { mutateAsync: addMeeting, isPending: isAddMeetingLoading } =
    useMutation(bookMeeting());
  const { mutateAsync: editMeeting, isPending: isEditMeetingLoading } =
    useMutation(rescheduleMeeting());

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

  const selectedType = watch(TYPE.name as keyof BookMeetingModel);
  const isMembersSelected = selectedType === TYPE.options[0].value;

  const isNameDisabled =
    !selectedType ||
    !!calendarEvent?.id ||
    !!calendarEvent?.resource?.bookedUserId;

  const fetchMembersOrProspects = useCallback(
    (params: Partial<QueryParams>) =>
      (isMembersSelected ? getMembersMetaList : getProspectssMetaList)(params),
    [isMembersSelected],
  );

  const handleFormSubmit = async (data: FieldValues) => {
    const payload = {
      slotDate: formatDateValue(data.slotDate, MMM_DD__YYYY, true),
      startTime: convertTo24hrs(data.meetingTime.startTime),
      endTime: convertTo24hrs(data.meetingTime.endTime),
    };

    const id = calendarEvent?.id;
    const { bookedUserId, bookedUserName } = calendarEvent?.resource || {};

    const userData = bookedUserId ? { bookedUserId, bookedUserName } : {};

    await (id
      ? editMeeting({ ...payload, id })
      : addMeeting({ ...data, ...payload, ...userData }));

    onClose?.();
  };

  const handleSelectUserType = (user: PaginatedOptions) => {
    const { id = "", label = "" } = user;
    if (!id || !label) return;
    setValue(USER.USER_ID, id);
    setValue(USER.USER_NAME, label);
  };

  const handleUpdateUserName = () => setValue(NAME.name, "");

  useEffect(() => {
    methods.reset(getMeetingDefaultValues(calendarEvent, selectedDate));
  }, [calendarEvent, selectedDate, isOpen]);

  return (
    <Modal
      cancelButtonProps={{ className: "d-none" }}
      title={calendarEvent?.id ? RESCHEDULE_MEETING : BOOK_MEETING}
      visible={isOpen}
      okText={calendarEvent?.id ? RESCHEDULE_NOW : BOOK_MEETING}
      closeModal={handleClose}
      rootClassName={styles.bookMeeting}
      handleOk={handleSubmit(handleFormSubmit)}
      okButtonProps={{
        disabled: !isValid,
        loading: isAddMeetingLoading || isEditMeetingLoading,
      }}
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
            onBlur={handleUpdateUserName}
          />
        </Row>

        <Row gutter={[15, 15]} justify={Justify.SPACE_BETWEEN}>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <ConditionalRenderComponent
                  visible={!calendarEvent?.resource?.bookedUserId}
                  fallback={
                    <InputField
                      name={NAME.name}
                      label={NAME.label}
                      placeholder={NAME.placeholder}
                      value={calendarEvent?.resource?.bookedUserName}
                      required
                      disabled={!!calendarEvent?.resource?.bookedUserId}
                    />
                  }
                >
                  <PaginatedDropdown
                    key={String(selectedType)}
                    name={NAME.name}
                    label={NAME.label}
                    placeholder={
                      !selectedType || isMembersSelected
                        ? NAME.placeholder
                        : NAME.prospectPlaceholder
                    }
                    onPageUpdate={fetchMembersOrProspects}
                    queryKey={[
                      isMembersSelected
                        ? GET_MEMBERS_META_LIST
                        : GET_PROSPECTS_META_LIST,
                    ]}
                    value={methods.watch(NAME.name as keyof BookMeetingModel)}
                    onSelect={(_, user) =>
                      handleSelectUserType(user as PaginatedOptions)
                    }
                    disabled={isNameDisabled}
                    required
                  />
                </ConditionalRenderComponent>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <DatePicker
              name={SLOT_DATE.name}
              label={SLOT_DATE.label}
              placeholder={SLOT_DATE.placeholder}
              required
              disabledDate={disablePastAndFuture180}
              format={MMM_DD__YYYY}
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
