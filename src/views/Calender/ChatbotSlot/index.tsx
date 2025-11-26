import React, { MouseEvent } from "react";
import clsx from "clsx";
import { Col, Row } from "antd";
import { useFieldArray } from "react-hook-form";
import { IconDelete, IconAdd } from "obra-icons-react";
import { useMutation } from "@tanstack/react-query";

import Drawer from "src/shared/components/Drawer";
import Form from "src/shared/components/Form";
import useForm from "src/shared/components/UseForm";
import Button from "src/shared/components/Button";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import DatePicker from "src/shared/components/DatePicker";
import TimeRangePicker from "src/shared/components/TimeRangePicker";
import { Colors } from "src/enums/colors.enum";
import { stopPropagation } from "src/shared/utils/eventUtils";
import {
  getOccupiedRangesForIndex,
  initialChatbotSlots,
} from "src/shared/utils/timeRange";
import { ChatbotSlotProps } from "src/shared/types/calender";
import { CalenderService } from "src/services/Calender/calender.service";
import { ChatbotSlotPayload } from "src/models/calender.model";
import { chatbotSlotSchema } from "./validationSchema";
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
const { TITLE, DATE_RANGE, TIME_RANGE, START_AND_END_TIME, ADD_BTN } =
  CHAT_BOT_CONSTANTS;
const { DATE_FROM, DATE_TO, TIMERANGE_START, TIMERANGE_END } = PLACEHOLDERS;
const { NOT_ALLOWED, POINTER } = POINTER_CONSTANTS;
const { FROM_DATE_LABEL, TO_DATE_LABEL } = LABELS;

const ChatbotSlot = ({
  isOpen,
  onClose,
  selectedDate,
  availableSlots,
}: ChatbotSlotProps) => {
  const methods = useForm({
    validationSchema: chatbotSlotSchema,
    defaultValues: initialChatbotSlots(selectedDate, availableSlots),
  });

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

  const { mutateAsync, isPending } = useMutation(addChatbotSlots());

  const handleSubmitForm = async (data: Partial<ChatbotSlotPayload>) => {
    await mutateAsync(data);
  };

  const handleDelete = (index: number) => (e: MouseEvent) => {
    stopPropagation(e);
    if (fields.length <= 1) return;
    remove(index);
  };

  const handleAddTimeRange = () => prepend(defaultTimeRange);

  const handleOnClose = () => {
    methods.reset({});
    onClose();
  };

  return (
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
            loading={isPending}
            onClick={handleSubmit(handleSubmitForm)}
          >
            {Buttons.ADD_SLOTS}
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
            />
          </Col>

          <Col span={12}>
            <DatePicker
              placeholder={DATE_TO}
              label={TO_DATE_LABEL}
              name={TO_DATE}
            />
          </Col>
        </Row>

        <div className={clsx(styles.sectionTitle, styles.timeRangeSection)}>
          <p>{TIME_RANGE}</p>
          <span className={styles.addField} onClick={handleAddTimeRange}>
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
  );
};

export default ChatbotSlot;
