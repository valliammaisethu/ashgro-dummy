import React, { MouseEvent, useEffect, useState } from "react";
import clsx from "clsx";
import { Col, Row } from "antd";
import { useFieldArray } from "react-hook-form";
import { IconDelete, IconAdd } from "obra-icons-react";
import { useMutation } from "@tanstack/react-query";

import Drawer from "src/shared/components/Drawer";
import Form from "src/shared/components/Form";
import useForm from "src/shared/components/UseForm";
import Button from "src/shared/components/Button";
import Modal from "src/shared/components/Modal";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import DatePicker from "src/shared/components/DatePicker";
import TimeRangePicker from "src/shared/components/TimeRangePicker";
import { Colors } from "src/enums/colors.enum";
import { stopPropagation } from "src/shared/utils/eventUtils";
import { replaceString } from "src/shared/utils/commonHelpers";
import {
  getOccupiedRangesForIndex,
  initialChatbotSlots,
} from "src/shared/utils/timeRange";
import { disablePastDates } from "src/shared/utils/dateUtils";
import { ChatbotSlotProps } from "src/shared/types/calender";
import { CalenderService } from "src/services/Calender/calender.service";
import { ChatbotSlotPayload } from "src/models/calender.model";
import { chatbotSlotSchema } from "./validationSchema";
import { getCalendarMonthFromQuery } from "src/shared/utils/helpers";
import {
  CHAT_BOT_CONSTANTS,
  FIELD_NAME,
  LABELS,
  PLACEHOLDERS,
  POINTER_CONSTANTS,
  defaultSlotWidth,
  defaultTimeRange,
} from "./constants";

import styles from "./chatbotSlot.module.scss";

const { TIME_RANGES, FROM_DATE, TO_DATE } = FIELD_NAME;
const {
  TITLE,
  DATE_RANGE,
  TIME_RANGE,
  START_AND_END_TIME,
  ADD_BTN,
  CONFIRMATION_MODAL,
} = CHAT_BOT_CONSTANTS;
const { DATE_FROM, DATE_TO, TIMERANGE_START, TIMERANGE_END } = PLACEHOLDERS;
const { NOT_ALLOWED, POINTER } = POINTER_CONSTANTS;
const { FROM_DATE_LABEL, TO_DATE_LABEL } = LABELS;
const { ADD_SLOTS, UPDATE_SLOTS, YES_PROCEED } = Buttons;
const { ADD_TITLE, UPDATE_TITLE, CONFIRMATION_TITLE } = CONFIRMATION_MODAL;

const ChatbotSlot = ({
  isOpen,
  onClose,
  selectedDate,
  availableSlots,
}: ChatbotSlotProps) => {
  const [formData, setFormData] = useState<Partial<ChatbotSlotPayload> | null>(
    null,
  );

  const methods = useForm({
    validationSchema: chatbotSlotSchema,
    defaultValues: initialChatbotSlots(selectedDate, availableSlots),
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset(initialChatbotSlots(selectedDate, availableSlots));
    }
  }, [isOpen, selectedDate, availableSlots, methods]);

  const {
    control,
    watch,
    formState: { isValid },
    handleSubmit,
  } = methods;

  const {
    fields = [],
    remove,
    prepend,
  } = useFieldArray({
    control,
    name: TIME_RANGES,
  });

  const timeRanges = watch(TIME_RANGES);

  const { addChatbotSlots } = CalenderService();

  const calenderMonth = getCalendarMonthFromQuery(location.search);

  const { mutateAsync, isPending } = useMutation(addChatbotSlots());

  const handleSubmitForm = (data: Partial<ChatbotSlotPayload>) =>
    setFormData(data);

  const handleConfirmSubmit = async () => {
    if (!formData) return;
    await mutateAsync({ ...formData, slotDate: calenderMonth });
    handleOnClose();
  };

  const handleDelete = (index: number) => (e: MouseEvent) => {
    stopPropagation(e);
    if (fields.length <= 1) return;
    remove(index);
  };

  const handleAddTimeRange = () => {
    if (fields.length >= 10) return;
    prepend(defaultTimeRange);
  };

  const handleCancelModal = () => setFormData(null);

  const handleOnClose = () => {
    methods.reset({});
    onClose();
    handleCancelModal();
  };

  return (
    <>
      <Drawer
        width={defaultSlotWidth}
        title={TITLE}
        open={isOpen}
        closable
        onClose={handleOnClose}
        maskClosable={false}
        destroyOnHidden
        footer={
          <div className={styles.footer}>
            <Button
              className={styles.addSlotsBtn}
              type={ButtonTypes.SECONDARY}
              htmlType={HtmlButtonType.SUBMIT}
              disabled={!isValid}
              onClick={handleSubmit(handleSubmitForm)}
            >
              {availableSlots?.length ? UPDATE_SLOTS : ADD_SLOTS}
            </Button>
          </div>
        }
      >
        <Form methods={methods}>
          <div className={styles.sectionTitle}>{DATE_RANGE}</div>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <DatePicker
                placeholder={DATE_FROM}
                label={FROM_DATE_LABEL}
                name={FROM_DATE}
                disabledDate={disablePastDates}
              />
            </Col>

            <Col span={12}>
              <DatePicker
                placeholder={DATE_TO}
                label={TO_DATE_LABEL}
                name={TO_DATE}
                disabledDate={disablePastDates}
              />
            </Col>
          </Row>

          <div className={clsx(styles.sectionTitle, styles.timeRangeSection)}>
            <p>{TIME_RANGE}</p>
            <span
              className={clsx(styles.addField, {
                [styles.isAddDisabled]: fields?.length >= 10,
              })}
              onClick={handleAddTimeRange}
            >
              <IconAdd color={Colors.ASHGRO_BLACK} size={15} />
              {ADD_BTN}
            </span>
          </div>

          <Row className={styles.timeRow} gutter={[16, 16]}>
            {fields.map((field, currentIndex) => (
              <Col span={12} key={field?.id}>
                <TimeRangePicker
                  name={`${TIME_RANGES}.${currentIndex}`}
                  label={
                    <div className={styles.timeRangeLabel}>
                      <p>{START_AND_END_TIME}</p>
                      <IconDelete
                        color={Colors.ERROR_NOTIFICATION}
                        cursor={fields?.length === 1 ? NOT_ALLOWED : POINTER}
                        onClick={handleDelete(currentIndex)}
                        size={15}
                      />
                    </div>
                  }
                  changeOnScroll
                  placeholder={[TIMERANGE_START, TIMERANGE_END]}
                  disabledRanges={getOccupiedRangesForIndex({
                    timeRanges,
                    currentIndex,
                  })}
                />
              </Col>
            ))}
          </Row>
        </Form>
      </Drawer>
      <Modal
        title={replaceString(
          CONFIRMATION_TITLE,
          availableSlots?.length ? UPDATE_TITLE : ADD_TITLE,
        )}
        visible={!!formData}
        handleOk={handleConfirmSubmit}
        onCancel={handleCancelModal}
        confirmLoading={isPending}
        okText={YES_PROCEED}
        cancelButtonProps={{
          className: "d-none",
        }}
        okButtonProps={{
          loading: isPending,
        }}
      >
        <p>{CONFIRMATION_MODAL.DESCRIPTION}</p>
      </Modal>
    </>
  );
};

export default ChatbotSlot;
