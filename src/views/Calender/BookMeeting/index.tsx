import React from "react";
import { Col, Row } from "antd";

import Modal from "src/shared/components/Modal";
import Form from "src/shared/components/Form";
import useForm from "src/shared/components/UseForm";
import InputField from "src/shared/components/InputField";
import RadioField from "src/shared/components/RadioField";
import SelectField from "src/shared/components/SelectField";
import DatePicker from "src/shared/components/DatePicker";
import TimeRangePicker from "src/shared/components/TimeRangePicker";
import { disablePastDates } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import { Justify } from "src/enums/align.enum";
import { BOOK_MEETING_FIELDS, BOOK_MEETING_META } from "./constants";
import { BookMeetingProps } from "src/shared/types/calender";
import { validationSchema } from "./validationSchema";

import styles from "./bookMeeting.module.scss";

const { TITLE, TYPE, NAME, SLOT_DATE, MEETING_TIME } = BOOK_MEETING_FIELDS;
const { BOOK_MEETING, RESCHEDULE_MEETING, RESCHEDULE_NOW } = BOOK_MEETING_META;

const BookMeeting = ({
  isOpen = false,
  calendarEvent,
  onClose,
}: BookMeetingProps) => {
  const methods = useForm({ validationSchema: validationSchema });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const handleClose = () => {
    methods.reset({});
    onClose?.();
  };

  return (
    <Modal
      cancelButtonProps={{ className: "d-none" }}
      title={calendarEvent?.id ? RESCHEDULE_MEETING : BOOK_MEETING}
      visible={isOpen}
      okText={calendarEvent?.id ? RESCHEDULE_NOW : BOOK_MEETING}
      closeModal={handleClose}
      rootClassName={styles.bookMeeting}
      handleOk={handleSubmit(() => {})}
      okButtonProps={{ disabled: !isValid }}
    >
      <Form methods={methods}>
        <Row gutter={[20, 20]} justify={Justify.SPACE_BETWEEN}>
          <Col span={12}>
            <InputField
              name={TITLE.name}
              label={TITLE.label}
              placeholder={TITLE.placeholder}
              required
            />
          </Col>
        </Row>

        <p className={styles.bookforLabel}>{TYPE.label}</p>

        <Row className={styles.selectType}>
          <RadioField name={TYPE.name} options={TYPE.options} />
        </Row>

        <Row gutter={[15, 15]} justify={Justify.SPACE_BETWEEN}>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <SelectField
                  name={NAME.name}
                  label={NAME.label}
                  placeholder={NAME.placeholder}
                  required
                  options={[]}
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
              format={DateFormats.DD_MMM__YYYY}
            />
          </Col>
          <Col span={12}>
            <TimeRangePicker
              name={MEETING_TIME.name}
              label={MEETING_TIME.label}
              placeholder={[...MEETING_TIME.placeholder]}
              required
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default BookMeeting;
