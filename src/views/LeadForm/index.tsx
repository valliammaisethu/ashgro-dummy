import React, { useMemo } from "react";
import { Col, Row } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";

import logo from "src/assets/images/logo.webp";
import { imageAlts } from "src/constants/imageAlts";
import Form from "src/shared/components/Form";
import useForm from "src/shared/components/UseForm";
import InputField from "src/shared/components/InputField";
import { INPUT_TYPE } from "src/enums/inputType";
import {
  EmailValidationError,
  useDebouncedEmailValidation,
} from "src/shared/hooks/useDebouncedEmailValidation";
import { EmailService } from "src/services/EmailService/email.service";
import { LeadFormService } from "src/services/LeadFormService/leadForm.service";
import { MetaService } from "src/services/MetaService/meta.service";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";
import SelectField from "src/shared/components/SelectField";
import PhoneNumberField from "src/shared/components/PhoneNumberInput";
import TextArea from "src/shared/components/TextArea";
import { leadFormValidationSchema } from "./validationSchema";
import { LEAD_FORM_CONSTANTS } from "./constants";
import Button from "src/shared/components/Button";
import { ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { TriggerType } from "src/enums/formModes.enum";
import { LeadFormData } from "src/models/leadForm.model";
import InvalidLink from "./atoms/InvalidLink";
import FormLoading from "./atoms/FormLoading";
import FormDisabled from "./atoms/FormDisabled";

import styles from "./leadForm.module.scss";

const { TITLE, SUBMIT_BTN_TEXT, LABELS, PLACEHOLDERS, FIELD_NAMES } =
  LEAD_FORM_CONSTANTS;

const LeadForm = () => {
  const { id: clubId } = useParams<{ id: string }>();

  if (!clubId) return <InvalidLink />;

  const methods = useForm({
    validationSchema: leadFormValidationSchema,
  });

  const {
    setError,
    clearErrors,
    formState: { isValid },
    reset,
  } = methods;

  const { getLeadFormStatus, submitLeadForm } = LeadFormService();
  const { validateEmail } = EmailService();
  const { getMembershipCategories } = MetaService();

  const { data: leadFormStatus, isPending: isStatusPending } = useQuery(
    getLeadFormStatus(clubId),
  );

  const { data: membershipCategoriesData, isPending: isCategoriesPending } =
    useQuery(getMembershipCategories(clubId));

  const { mutateAsync: submitLeadFormMutate, isPending: isSubmitting } =
    useMutation(submitLeadForm());

  const { mutateAsync: validateMutateAsync } = useMutation(validateEmail());

  const { handleEmailChange: debouncedEmailChange } =
    useDebouncedEmailValidation({
      validateMutateAsync,
      clubId,
      onError: (error: EmailValidationError) => {
        const errorMsg = error?.response?.data?.description;
        if (errorMsg) {
          setError(FIELD_NAMES.EMAIL_ADDRESS, {
            type: TriggerType.MANUAL,
            message: errorMsg,
          });
        }
      },
    });

  const handleEmailChange = (email: string) => {
    clearErrors(FIELD_NAMES.EMAIL_ADDRESS);
    if (!email) return;
    debouncedEmailChange(email);
  };

  const membershipCategoriesOptions = useMemo(
    () =>
      mapToSelectOptionsDynamic(membershipCategoriesData?.membershipCategories),
    [membershipCategoriesData],
  );

  const handleFormSubmit = async (values: FieldValues) => {
    const payload = {
      ...values,
      id: clubId,
    } as LeadFormData;

    await submitLeadFormMutate(payload);
    reset({});
  };

  if (isStatusPending) {
    return <FormLoading />;
  }

  if (leadFormStatus?.success !== true) {
    return <FormDisabled />;
  }

  return (
    <>
      <Row className={styles.logoContainer}>
        <img
          src={logo}
          alt={imageAlts.ashgroLogo}
          className={styles.ashgrowlogo}
        />
      </Row>
      <Row className={styles.formContainer}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>{TITLE}</h1>
          </div>

          <Form onSubmit={handleFormSubmit} methods={methods}>
            <Row gutter={[24, 16]} className={styles.formBody}>
              <Col xs={24} sm={12}>
                <InputField
                  placeholder={PLACEHOLDERS.FIRST_NAME}
                  label={LABELS.FIRST_NAME}
                  name={FIELD_NAMES.FIRST_NAME}
                  required
                />
              </Col>
              <Col xs={24} sm={12}>
                <InputField
                  placeholder={PLACEHOLDERS.LAST_NAME}
                  label={LABELS.LAST_NAME}
                  name={FIELD_NAMES.LAST_NAME}
                  required
                />
              </Col>
              <Col xs={24} sm={12}>
                <InputField
                  placeholder={PLACEHOLDERS.EMAIL_ADDRESS}
                  label={LABELS.EMAIL_ADDRESS}
                  name={FIELD_NAMES.EMAIL_ADDRESS}
                  type={INPUT_TYPE.EMAIL}
                  required
                  onChange={(e) => handleEmailChange(e.target.value)}
                />
              </Col>
              <Col xs={24} sm={12}>
                <PhoneNumberField
                  label={LABELS.PHONE_NUMBER}
                  name={FIELD_NAMES.PHONE_NUMBER}
                  placeholder={PLACEHOLDERS.PHONE_NUMBER}
                />
              </Col>

              <Col xs={24} sm={12}>
                <SelectField
                  placeholder={PLACEHOLDERS.MEMBERSHIP_INTEREST}
                  label={LABELS.MEMBERSHIP_INTEREST}
                  name={FIELD_NAMES.MEMBERSHIP_INTEREST}
                  options={membershipCategoriesOptions}
                  loading={isCategoriesPending}
                />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder={PLACEHOLDERS.ADDITIONAL_COMMENTS}
                  name={FIELD_NAMES.ADDITIONAL_COMMENTS}
                  label={LABELS.ADDITIONAL_COMMENTS}
                  className={styles.textArea}
                  rows={4}
                />
              </Col>
            </Row>

            <div className={styles.submitButtonContainer}>
              <Button
                disabled={!isValid}
                loading={isSubmitting}
                className={styles.submitButton}
                type={ButtonTypes.SECONDARY}
                htmlType={HtmlButtonType.SUBMIT}
              >
                {SUBMIT_BTN_TEXT}
              </Button>
            </div>
          </Form>
        </div>
      </Row>
    </>
  );
};

export default LeadForm;
