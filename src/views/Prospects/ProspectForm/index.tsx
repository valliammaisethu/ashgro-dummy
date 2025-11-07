import React, { useEffect, useMemo } from "react";
import { Col, Divider, Row } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { QueryKeys } from "src/enums/cacheEvict.enum";
import { Buttons, ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { ADD_PROSPECT_CONSTANTS, submitButtonKey } from "./constants";
import { MetaService } from "src/services/MetaService/meta.service";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";
import {
  convertDateToApiFormat,
  disableFutureAndToday,
  formatDate,
} from "src/shared/utils/dateUtils";
import { AddProspectProps } from "src/shared/types/prospects.type";
import { getValidationSchema } from "./validation";
import { getDigitsOnly } from "src/shared/utils/parser";
import { findValueByLabel } from "src/shared/utils/commonHelpers";
import Loader from "src/shared/components/Loader";

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
  isLoading = false,
}: AddProspectProps) => {
  const {
    getLeadSources,
    getLeadStatuses,
    getMembershipCategories,
    getActivityTypes,
  } = MetaService();
  const queryClient = useQueryClient();
  const { addProspect, editProspect } = ProspectsService();

  const { mutateAsync, isPending } = useMutation(addProspect());
  const { mutateAsync: editMutateAsync, isPending: isEditPending } =
    useMutation(editProspect());

  const { data: leadSourcesData } = useQuery({
    ...getLeadSources(),
    enabled: visible,
  });
  const { data: leadStatusesData } = useQuery({
    ...getLeadStatuses(),
    enabled: visible,
  });
  const { data: membershipCategoriesData } = useQuery({
    ...getMembershipCategories(),
    enabled: visible,
  });
  const { data: activityTypesData } = useQuery({
    ...getActivityTypes(),
    enabled: visible,
  });

  const leadSourceOptions = useMemo(
    () => mapToSelectOptionsDynamic(leadSourcesData?.leadSources),
    [leadSourcesData],
  );
  const leadStatusOptions = useMemo(
    () => mapToSelectOptionsDynamic(leadStatusesData?.leadStatuses),
    [leadStatusesData],
  );
  const membershipCategoryOptions = useMemo(
    () =>
      mapToSelectOptionsDynamic(membershipCategoriesData?.membershipCategories),
    [membershipCategoriesData],
  );
  const activityTypeOptions = useMemo(
    () => mapToSelectOptionsDynamic(activityTypesData?.activityTypes),
    [activityTypesData],
  );

  const defaultValues = useMemo(() => {
    if (!prospectData) return {};

    const { activityDetails, ...prospect } = prospectData;

    return {
      activityDetails: activityDetails?.[0] || {},
      prospect: {
        ...prospect,
        phoneCode: prospect.countryCode,
        membershipCategoryId: findValueByLabel(
          membershipCategoryOptions,
          prospect.membershipCategory,
        ),
        leadSourceId: findValueByLabel(leadSourceOptions, prospect.leadSource),
        leadStatusId: findValueByLabel(leadStatusOptions, prospect.leadStatus),
        followUpDate: formatDate(
          prospect.followUpDate,
          DateFormats.DD_MMM__YYYY,
        ),
        inquiryDate: formatDate(prospect.inquiryDate, DateFormats.DD_MMM__YYYY),
      },
    };
  }, [
    prospectData,
    membershipCategoryOptions,
    leadSourceOptions,
    leadStatusOptions,
  ]);

  const methods = useForm({
    validationSchema: getValidationSchema(isEdit),
    defaultValues: isEdit ? defaultValues : {},
  });

  const { setValue, watch, reset } = methods;
  const activityDateTime = watch(FIELD_NAMES.ACTIVITY_DATE_TIME);

  // Reset form with prospect data when editing
  useEffect(() => {
    if (isEdit && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [isEdit, defaultValues, reset]);

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

  const modalClose = () => {
    methods.reset({});
    onClose();
  };

  const handleFormSuccess = () => {
    modalClose();
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_PROSPECTS] });
  };

  const handleSubmit = async (values: FieldValues) => {
    const hasActivityDetails =
      values.activityDetails?.activityTypeId ||
      values.activityDetails?.description;

    const payload = {
      ...values,
      prospect: {
        ...values.prospect,
        id: prospectData?.id,
        contactNumber: values.prospect?.contactNumber?.trim()
          ? getDigitsOnly(values.prospect.contactNumber)
          : undefined,
        followUpDate: convertDateToApiFormat(values.prospect?.followUpDate),
        inquiryDate: convertDateToApiFormat(values.prospect?.inquiryDate),
      },
      activityDetails:
        isEdit || !hasActivityDetails ? undefined : values.activityDetails,
    };

    const mutationFn = isEdit ? editMutateAsync : mutateAsync;
    await mutationFn(payload, {
      onSuccess: () => {
        methods.reset({});
        handleFormSuccess();
      },
    });
  };

  return (
    <Modal
      cancelButtonProps={{ className: "d-none" }}
      title={isEdit ? EDIT_TITLE : MODAL_TITLE}
      visible={visible}
      width={MODAL_WIDTH}
      okText={Buttons.ADD_PROSPECT}
      closeModal={modalClose}
      destroyOnClose
      footer={[]}
      rootClassName={styles.prospectFormModal}
      styles={{
        wrapper: {
          top: 0,
        },
        content: {
          height: 733,
          width: 710,
        },
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
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
                options={leadStatusOptions}
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

          <div className={styles.sectionTitle}>
            {SECTION_TITLES.LEAD_DETAILS}
          </div>
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
                options={leadSourceOptions}
              />
            </Col>
            <Col span={12}>
              <SelectField
                placeholder={PLACEHOLDERS.MEMBERSHIP_CATEGORY}
                label={LABELS.MEMBERSHIP_CATEGORY}
                name={FIELD_NAMES.MEMBERSHIP_CATEGORY}
                options={membershipCategoryOptions}
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
                    options={activityTypeOptions}
                    onChange={(value) => handleActivityTypeChange(value)}
                  />
                </Col>
                <Col span={24}>
                  <TextArea
                    placeholder={PLACEHOLDERS.ACTIVITY_DESCRIPTION}
                    name={FIELD_NAMES.ACTIVITY_DESCRIPTION}
                    className={styles.activityDescBox}
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
      )}
    </Modal>
  );
};

export default ProspectForm;
