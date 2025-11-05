import { Col, Divider, Row } from "antd";
import React, { ChangeEvent, useEffect, useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { IconCalendarWait } from "obra-icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Justify } from "src/enums/align.enum";
import Form from "src/shared/components/Form";
import InputField from "src/shared/components/InputField";
import Modal from "src/shared/components/Modal";
import ProfilePictureInput from "src/shared/components/ProfilePictureInput";
import useForm from "src/shared/components/UseForm";
import { FORM_CONSTANTS } from "./constants";
import SelectField from "src/shared/components/SelectField";
import DatePicker from "src/shared/components/DatePicker";
import { DateFormats } from "src/enums/dateFormats.enum";
import { INPUT_TYPE } from "src/enums/inputType";
import PhoneNumberField from "src/shared/components/PhoneNumberInput";
import { disableFutureAndToday, formatDate } from "src/shared/utils/dateUtils";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";
import { MetaService } from "src/services/MetaService/meta.service";
import { Colors } from "src/enums/colors.enum";
import TextArea from "src/shared/components/TextArea";
import { LeadService } from "src/services/SettingsService/lead.service";
import { MemberShipService } from "src/services/SettingsService/memberShip.service";
import { MembersService } from "src/services/MembersService/members.service";
import { defaultModalWidth } from "src/constants/sharedComponents";
import { findValueByLabel } from "src/shared/utils/commonHelpers";
import { membersFormValidationSchema } from "./validationSchema";

import styles from "./membersForm.module.scss";

interface MembersFormProps {
  isOpen?: boolean;
  handleModalVisibility?: () => void;
  id?: string;
}

const {
  LABELS,
  FIELD_NAMES,
  PLACEHOLDERS,
  SECTION_TITLES,
  MODAL_TITLE,
  ADD_BTN_TXT,
} = FORM_CONSTANTS;

const MembersForm = ({
  isOpen = false,
  handleModalVisibility,
  id,
}: MembersFormProps) => {
  const methods = useForm({
    validationSchema: membersFormValidationSchema,
  });

  const { memberShipStatuses, memberShipTypeStatuses } = MemberShipService();
  const { leadSources } = LeadService();
  const { getActivityTypes } = MetaService();
  const { addMember, MembersDetails } = MembersService();

  const { mutateAsync: addMemberMutate } = useMutation(addMember());

  const { data } = useQuery(MembersDetails(id));

  const { data: leadSourcesOptions } = useQuery(leadSources());

  const { data: memberShipStatusesOptions = [] } =
    useQuery(memberShipStatuses());

  const { data: memberShipTypeStatusesOptions = [] } = useQuery(
    memberShipTypeStatuses(),
  );

  const { data: activityTypesData } = useQuery(getActivityTypes());

  const { setValue, watch, handleSubmit } = methods;

  const activityTypeOptions = useMemo(
    () => mapToSelectOptionsDynamic(activityTypesData?.activityTypes),
    [activityTypesData],
  );

  const activityDateTime = watch(FIELD_NAMES.ACTIVITY_DATE_TIME) as string;

  const handleActivityTypeChange = (value: string) => {
    setValue(FIELD_NAMES.ACTIVITY_TYPE, value);

    const description = methods.getValues(FIELD_NAMES.ACTIVITY_DESCRIPTION);

    setValue(
      FIELD_NAMES.ACTIVITY_DATE_TIME,
      value || description ? new Date().toISOString() : "",
    );
  };

  const handleActivityDescriptionChange = (
    value?: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (!value) return;
    setValue(FIELD_NAMES.ACTIVITY_DESCRIPTION, value?.target?.value);

    const type = methods.getValues(FIELD_NAMES.ACTIVITY_TYPE);

    setValue(
      FIELD_NAMES.ACTIVITY_DATE_TIME,
      type || value ? new Date().toISOString() : "",
    );
  };

  const handleFormSubmit = async (values: FieldValues) => {
    await addMemberMutate(values);
    // edit
    handleModalVisibility?.();
  };

  const formValues = useMemo(() => {
    if (!data) return {};
    // TODO: findValueByLabel and date format check with BE to send id and value both to avoid unnesaryfindValueByLabel
    return {
      ...data,
      [FIELD_NAMES.MEMBER_STATUS]: findValueByLabel(
        memberShipStatusesOptions,
        data.membershipStatus,
      ),
      [FIELD_NAMES.MEMBERSHIP_TYPE]: findValueByLabel(
        memberShipTypeStatusesOptions,
        data.membershipCategory,
      ),
      [FIELD_NAMES.LEAD_SOURCE]: findValueByLabel(
        leadSourcesOptions,
        data.leadSource,
      ),
      activityDetails: undefined,
    };
  }, [
    data,
    memberShipStatusesOptions,
    memberShipTypeStatusesOptions,
    leadSourcesOptions,
  ]);

  // TODO: Fix the form issue and remove useEffect here
  useEffect(() => {
    methods.reset(formValues);
  }, [data]);

  return (
    <div>
      <Modal
        cancelButtonProps={{ className: "d-none" }}
        title={MODAL_TITLE}
        visible={isOpen}
        width={defaultModalWidth}
        okText={ADD_BTN_TXT}
        closeModal={handleModalVisibility}
        handleOk={handleSubmit(handleFormSubmit)}
      >
        <Form methods={methods}>
          <div className={styles.profileContainer}>
            <ProfilePictureInput
              name={FIELD_NAMES.PROFILE_PICTURE}
              label={LABELS.PROFILE_PICTURE}
            />
          </div>

          <Divider />

          <Row gutter={[20, 20]} justify={Justify.SPACE_BETWEEN}>
            <Col span={12}>
              <InputField
                placeholder={PLACEHOLDERS.FIRST_NAME}
                label={LABELS.FIRST_NAME}
                name={FIELD_NAMES.FIRST_NAME}
                required
              />
            </Col>
            <Col span={12}>
              <InputField
                placeholder={PLACEHOLDERS.LAST_NAME}
                label={LABELS.LAST_NAME}
                name={FIELD_NAMES.LAST_NAME}
                required
              />
            </Col>
            <Col span={12}>
              <SelectField
                placeholder={PLACEHOLDERS.MEMBER_STATUS}
                label={LABELS.MEMBER_STATUS}
                name={FIELD_NAMES.MEMBER_STATUS}
                options={memberShipStatusesOptions}
              />
            </Col>
            <Col span={12}>
              <DatePicker
                placeholder={PLACEHOLDERS.JOIN_DATE}
                label={LABELS.JOIN_DATE}
                name={FIELD_NAMES.JOIN_DATE}
                format={id ? DateFormats.YYYY_MM_DD : DateFormats.DD_MMM__YYYY}
              />
            </Col>
            <Col span={12}>
              <InputField
                placeholder={PLACEHOLDERS.EMAIL_ADDRESS}
                label={LABELS.EMAIL_ADDRESS}
                name={FIELD_NAMES.EMAIL_ADDRESS}
                type={INPUT_TYPE.EMAIL}
                required
              />
            </Col>
            <Col span={12}>
              <PhoneNumberField
                label={LABELS.PHONE_NUMBER}
                name={FIELD_NAMES.PHONE_NUMBER}
                phoneCodeName={FIELD_NAMES.PHONE_CODE}
                placeholder={PLACEHOLDERS.PHONE_NUMBER}
              />
            </Col>
            <Col span={24}>
              <DatePicker
                placeholder={PLACEHOLDERS.BIRTH_DATE}
                label={LABELS.BIRTH_DATE}
                name={FIELD_NAMES.BIRTH_DATE}
                disabledDate={disableFutureAndToday}
                format={id ? DateFormats.YYYY_MM_DD : DateFormats.DD_MMM__YYYY}
              />
            </Col>
            <Col span={24}>
              <TextArea
                placeholder={PLACEHOLDERS.RESIDENTIAL_ADDRESS}
                name={FIELD_NAMES.RESIDENTIAL_ADDRESS}
                label={LABELS.RESIDENTIAL_ADDRESS}
              />
            </Col>
          </Row>

          <Divider />

          <div className={styles.sectionTitle}>
            {SECTION_TITLES.MEMBER_DETAILS}
          </div>
          <Row gutter={[20, 20]} justify={Justify.SPACE_BETWEEN}>
            <Col span={12}>
              <SelectField
                placeholder={PLACEHOLDERS.LEAD_SOURCE}
                label={LABELS.LEAD_SOURCE}
                name={FIELD_NAMES.LEAD_SOURCE}
                options={leadSourcesOptions}
              />
            </Col>
            <Col span={12}>
              <SelectField
                placeholder={PLACEHOLDERS.MEMBERSHIP_TYPE}
                label={LABELS.MEMBERSHIP_TYPE}
                name={FIELD_NAMES.MEMBERSHIP_TYPE}
                options={memberShipTypeStatusesOptions}
              />
            </Col>
            <Col span={12}>
              <DatePicker
                placeholder={PLACEHOLDERS.RESIGNATION_DATE}
                label={LABELS.RESIGNATION_DATE}
                name={FIELD_NAMES.RESIGNATION_DATE}
                disabledDate={disableFutureAndToday}
                format={id ? DateFormats.YYYY_MM_DD : DateFormats.DD_MMM__YYYY}
              />
            </Col>
          </Row>

          <Divider />

          <div className={styles.sectionTitle}>
            {SECTION_TITLES.FEES_AND_DUES}
          </div>
          <Row gutter={[20, 20]} justify={Justify.SPACE_BETWEEN}>
            <Col span={12}>
              <InputField
                placeholder={PLACEHOLDERS.MONTHLY_DUES}
                label={LABELS.MONTHLY_DUES}
                name={FIELD_NAMES.MONTHLY_DUES}
                type={INPUT_TYPE.CURRENCY}
                min={0}
              />
            </Col>
            <Col span={12}>
              <InputField
                placeholder={PLACEHOLDERS.INITIATION_FEE}
                label={LABELS.INITIATION_FEE}
                name={FIELD_NAMES.INITIATION_FEE}
                type={INPUT_TYPE.CURRENCY}
              />
            </Col>
          </Row>

          <Divider />
          <div className={styles.sectionTitle}>
            {SECTION_TITLES.ACTIVITY_DETAILS}
          </div>
          <Row gutter={[20, 20]} justify={Justify.SPACE_BETWEEN}>
            <Col span={12}>
              <InputField
                placeholder={PLACEHOLDERS.ACTIVITY_DATE_TIME}
                label={LABELS.ACTIVITY_DATE_TIME}
                value={formatDate(
                  activityDateTime,
                  DateFormats.HH_MM_A__DD_MMM_YYYY,
                  true,
                )}
                name={FIELD_NAMES.ACTIVITY_DATE_TIME}
                readOnly
                suffix={
                  <IconCalendarWait
                    color={Colors.ASHGRO_NAVY}
                    strokeWidth={1.25}
                    size={16}
                  />
                }
              />
            </Col>
            <Col span={12}>
              <SelectField
                placeholder={PLACEHOLDERS.ACTIVITY_TYPE}
                label={LABELS.ACTIVITY_TYPE}
                name={FIELD_NAMES.ACTIVITY_TYPE}
                options={activityTypeOptions}
                onSelect={handleActivityTypeChange}
              />
            </Col>
            <Col span={24}>
              <TextArea
                placeholder={PLACEHOLDERS.ACTIVITY_DESCRIPTION}
                name={FIELD_NAMES.ACTIVITY_DESCRIPTION}
                label={LABELS.ACTIVITY_DESCRIPTION}
                onChange={handleActivityDescriptionChange}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default MembersForm;
