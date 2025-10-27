import React, { Fragment, useMemo } from "react";
import { Col, Divider, Row } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IconCalendarWait } from "obra-icons-react";
import { FieldValues } from "react-hook-form";

import Modal from "src/shared/components/Modal";
import InputField from "src/shared/components/InputField";
import Form from "src/shared/components/Form";
import SelectField from "src/shared/components/SelectField";
import Button from "src/shared/components/Button";
import DatePicker from "src/shared/components/DatePicker";
import PhoneNumberField from "src/shared/components/PhoneNumberInput";
import ProfilePictureInput from "src/shared/components/ProfilePictureInput";
import useForm from "src/shared/components/UseForm";
import TextArea from "src/shared/components/TextArea";
import { INPUT_TYPE } from "src/enums/inputType";
import { Justify } from "src/enums/align.enum";
import { Colors } from "src/enums/colors.enum";
import { DateFormats } from "src/enums/dateFormats.enum";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { ADD_PROSPECT_CONSTANTS, submitButtonKey } from "./constants";
import { MetaService } from "src/services/MetaService/meta.service";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";
import { disableFutureAndToday, formatDate } from "src/shared/utils/dateUtils";
import { AddProspectProps } from "src/shared/types/prospects.type";
import { validationSchema } from "./validation";

import styles from "./prospectForm.module.scss";

const {
  MODAL_TITLE,
  EDIT_TITLE,
  MODAL_WIDTH,
  SECTION_TITLES,
  LABELS,
  PLACEHOLDERS,
  FIELD_NAMES,
} = ADD_PROSPECT_CONSTANTS;

const ProspectForm = ({
  visible,
  onClose,
  isEdit = false,
  prospectData,
}: AddProspectProps) => {
  const {
    getLeadSources,
    getLeadStatuses,
    getMembershipCategories,
    getActivityTypes,
  } = MetaService();

  const { addProspect, editProspect } = ProspectsService();

  const { mutateAsync, isPending } = useMutation(addProspect());
  const { mutateAsync: editMutateAsync, isPending: isEditPending } =
    useMutation(editProspect());
  const { data: leadSources } = useQuery(getLeadSources());
  const { data: leadStatuses } = useQuery(getLeadStatuses());
  const { data: membershipCategories } = useQuery(getMembershipCategories());
  const { data: activityTypes } = useQuery(getActivityTypes());

  const defaultValues = useMemo(() => {
    if (!prospectData) return {};

    const { activityDetails, ...prospect } = prospectData;

    return {
      activityDetails: activityDetails?.[0] || {},
      prospect: {
        ...prospect,
        phoneCode: prospect.countryCode,
        membershipCategoryId: prospect.membershipCategory,
        leadSourceId: prospect.leadSource,
        leadStatusId: prospect.leadStatus,
        followUpDate: formatDate(
          prospect.followUpDate,
          DateFormats.DD_MMM__YYYY,
        ),
        inquiryDate: formatDate(prospect.inquiryDate, DateFormats.DD_MMM__YYYY),
      },
    };
  }, [prospectData]);

  const methods = useForm({
    validationSchema,
    defaultValues: isEdit ? defaultValues : {},
  });

  const { setValue, watch } = methods;
  const activityDateTime = watch(FIELD_NAMES.ACTIVITY_DATE_TIME);

  const handleActivityTypeChange = (value: string) => {
    setValue(FIELD_NAMES.ACTIVITY_TYPE, value);

    const description = methods.getValues(FIELD_NAMES.ACTIVITY_DESCRIPTION);

    if (value || description) {
      setValue(FIELD_NAMES.ACTIVITY_DATE_TIME, new Date().toISOString());
    } else {
      setValue(FIELD_NAMES.ACTIVITY_DATE_TIME, "");
    }
  };

  const handleActivityDescriptionChange = (value: string) => {
    setValue(FIELD_NAMES.ACTIVITY_DESCRIPTION, value);

    const type = methods.getValues(FIELD_NAMES.ACTIVITY_TYPE);

    if (type || value) {
      setValue(FIELD_NAMES.ACTIVITY_DATE_TIME, new Date().toISOString());
    } else {
      setValue(FIELD_NAMES.ACTIVITY_DATE_TIME, "");
    }
  };

  const handleSubmit = async (values: FieldValues) => {
    const mutationFn = isEdit ? editMutateAsync : mutateAsync;
    await mutationFn(values, { onSuccess: onClose });
  };

  return (
    <Modal
      cancelButtonProps={{ className: "d-none" }}
      title={isEdit ? EDIT_TITLE : MODAL_TITLE}
      visible={visible}
      width={MODAL_WIDTH}
      okText={Buttons.ADD_PROSPECT}
      closeModal={onClose}
    >
      <Form methods={methods} onSubmit={handleSubmit}>
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
              placeholder={PLACEHOLDERS.LEAD_STATUS}
              label={LABELS.LEAD_STATUS}
              name={FIELD_NAMES.LEAD_STATUS}
              options={mapToSelectOptionsDynamic(leadStatuses?.leadStatuses)}
            />
          </Col>
          <Col span={12}>
            <DatePicker
              placeholder={PLACEHOLDERS.FOLLOW_UP_DATE}
              label={LABELS.FOLLOW_UP_DATE}
              name={FIELD_NAMES.FOLLOW_UP_DATE}
              format={DateFormats.DD_MMM__YYYY}
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
        </Row>

        <Divider />

        <div className={styles.sectionTitle}>{SECTION_TITLES.LEAD_DETAILS}</div>
        <Row gutter={[20, 20]} justify={Justify.SPACE_BETWEEN}>
          <Col span={12}>
            <DatePicker
              placeholder={PLACEHOLDERS.INQUIRY_DATE}
              label={LABELS.INQUIRY_DATE}
              name={FIELD_NAMES.INQUIRY_DATE}
              disabledDate={disableFutureAndToday}
              format={DateFormats.DD_MMM__YYYY}
            />
          </Col>
          <Col span={12}>
            <SelectField
              placeholder={PLACEHOLDERS.LEAD_SOURCE}
              label={LABELS.LEAD_SOURCE}
              name={FIELD_NAMES.LEAD_SOURCE}
              options={mapToSelectOptionsDynamic(leadSources?.leadSources)}
            />
          </Col>
          <Col span={12}>
            <SelectField
              placeholder={PLACEHOLDERS.MEMBERSHIP_CATEGORY}
              label={LABELS.MEMBERSHIP_CATEGORY}
              name={FIELD_NAMES.MEMBERSHIP_CATEGORY}
              options={mapToSelectOptionsDynamic(
                membershipCategories?.membershipCategories,
              )}
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

        {!isEdit && (
          <>
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
                  options={mapToSelectOptionsDynamic(
                    activityTypes?.activityTypes,
                  )}
                  onSelect={(value) => handleActivityTypeChange(value)}
                />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder={PLACEHOLDERS.ACTIVITY_DESCRIPTION}
                  name={FIELD_NAMES.ACTIVITY_DESCRIPTION}
                  label={LABELS.ACTIVITY_DESCRIPTION}
                  onChange={(e) =>
                    handleActivityDescriptionChange(e.target.value)
                  }
                />
              </Col>
            </Row>
          </>
        )}

        <div className={styles.modalFooter}>
          <Button
            key={submitButtonKey}
            type={ButtonTypes.DEFAULT}
            className={styles.okButton}
            loading={isEdit ? isEditPending : isPending}
            htmlType={HtmlButtonType.SUBMIT}
          >
            {isEdit ? Buttons.SAVE_CHANGES : Buttons.ADD_PROSPECT}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProspectForm;
