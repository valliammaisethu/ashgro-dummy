import React, { useEffect, useMemo } from "react";
import { Col, Divider, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import DatePicker from "src/shared/components/DatePicker";
import Form from "src/shared/components/Form";
import InputField from "src/shared/components/InputField";
import Loader from "src/shared/components/Loader";
import Modal from "src/shared/components/Modal";
import PhoneNumberField from "src/shared/components/PhoneNumberInput";
import ProfilePictureInput from "src/shared/components/ProfilePictureInput";
import SelectField from "src/shared/components/SelectField";
import TextArea from "src/shared/components/TextArea";
import useForm from "src/shared/components/UseForm";
import {
  disableFutureAndToday,
  convertDateToApiFormat,
  convertDateToDisplayFormat,
} from "src/shared/utils/dateUtils";
import { findValueByLabel } from "src/shared/utils/commonHelpers";
import { getDigitsOnly } from "src/shared/utils/parser";
import { StaffMemberDetails } from "src/models/staffMember.model";
import { FORM_CONSTANTS } from "../constants";
import { validationSchema } from "./validationSchema";
import { StaffDepartmentService } from "src/services/SettingsService/staffDepartment.service";
import { StaffMembersService } from "src/services/StaffMembersService/staffMembers.service";
import { defaultModalWidth } from "src/constants/sharedComponents";
import { Justify } from "src/enums/align.enum";
import { INPUT_TYPE } from "src/enums/inputType";
import { DateFormats } from "src/enums/dateFormats.enum";

import styles from "./staffMembersForm.module.scss";

interface MembersFormProps {
  isOpen?: boolean;
  handleModalVisibility?: () => void;
  id?: string;
}

const {
  LABELS,
  FIELD_NAMES,
  PLACEHOLDERS,
  EDIT_BTN_TXT,
  EDIT_TITLE,
  ADD_TITLE,
  ADD_BTN_TXT,
} = FORM_CONSTANTS;

const StaffMembersForm = ({
  isOpen = false,
  handleModalVisibility,
  id,
}: MembersFormProps) => {
  const methods = useForm({
    validationSchema: validationSchema,
  });
  const { handleSubmit } = methods;

  const { staffMembersList } = StaffDepartmentService();
  const { addStaffMember, staffMembersDeatils, editStaffMember } =
    StaffMembersService();

  const { data, refetch, isFetching } = useQuery(staffMembersDeatils(id));

  const { mutateAsync: addStaffMemberMutate, isPending: isAddPending } =
    useMutation(addStaffMember());
  const { mutateAsync: eddStaffMemberMutate, isPending: isEditPending } =
    useMutation(editStaffMember());
  const { data: staffDepartments, isPending } = useQuery(staffMembersList());

  const handleFormSubmit = async (values: FieldValues) => {
    const payload = {
      ...values,
      attachmentId: values?.attachmentId || undefined,
      [FIELD_NAMES.PHONE_NUMBER]: getDigitsOnly(
        values[FIELD_NAMES.PHONE_NUMBER],
      ),
      [FIELD_NAMES.BIRTH_DATE]: convertDateToApiFormat(
        values[FIELD_NAMES.BIRTH_DATE],
      ),
      [FIELD_NAMES.WORK_ANNIVERSARY]: convertDateToApiFormat(
        values[FIELD_NAMES.WORK_ANNIVERSARY],
      ),
    };

    const mutate = id ? eddStaffMemberMutate : addStaffMemberMutate;
    await mutate(payload as StaffMemberDetails);
    refetch();
    handleFormVisibility?.();
  };

  const handleFormVisibility = () => {
    methods.reset({});
    handleModalVisibility?.();
  };

  const formValues = useMemo(() => {
    if (!data || !id) return {};

    return {
      ...data,
      [FIELD_NAMES.STAFF_DEPARTMENT]: findValueByLabel(
        staffDepartments,
        data.staffDepartment,
      ),
      [FIELD_NAMES.BIRTH_DATE]: convertDateToDisplayFormat(data.birthDate),
      [FIELD_NAMES.WORK_ANNIVERSARY]: convertDateToDisplayFormat(
        data.workAnniversaryDate,
      ),
    };
  }, [data, staffDepartments]);

  // TODO: Fix the form issue and remove useEffect here
  useEffect(() => {
    methods.reset(formValues);
  }, [data]);

  return (
    <div>
      <Modal
        cancelButtonProps={{ className: "d-none" }}
        title={id ? EDIT_TITLE : ADD_TITLE}
        visible={isOpen}
        okText={id ? EDIT_BTN_TXT : ADD_BTN_TXT}
        width={defaultModalWidth}
        closeModal={handleFormVisibility}
        handleOk={handleSubmit(handleFormSubmit)}
        rootClassName={styles.staffMembersModal}
        okButtonProps={{
          loading: id ? isEditPending : isAddPending,
          className: styles.okButton,
        }}
      >
        {!!id && isFetching ? (
          <Loader />
        ) : (
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
                  placeholder={PLACEHOLDERS.STAFF_DEPARTMENT}
                  label={LABELS.STAFF_DEPARTMENT}
                  name={FIELD_NAMES.STAFF_DEPARTMENT}
                  options={staffDepartments}
                  loading={isPending}
                />
              </Col>

              <Col span={12}>
                <InputField
                  placeholder={PLACEHOLDERS.TITLE}
                  label={LABELS.TITLE}
                  name={FIELD_NAMES.TITLE}
                  required
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
              <Col span={12}>
                <DatePicker
                  placeholder={PLACEHOLDERS.BIRTH_DATE}
                  label={LABELS.BIRTH_DATE}
                  name={FIELD_NAMES.BIRTH_DATE}
                  disabledDate={disableFutureAndToday}
                  format={DateFormats.DD_MMM__YYYY}
                />
              </Col>
              <Col span={12}>
                <DatePicker
                  placeholder={PLACEHOLDERS.WORK_ANNIVERSARY}
                  label={LABELS.WORK_ANNIVERSARY}
                  name={FIELD_NAMES.WORK_ANNIVERSARY}
                  disabledDate={disableFutureAndToday}
                  format={DateFormats.DD_MMM__YYYY}
                />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder={PLACEHOLDERS.RESIDENTIAL_ADDRESS}
                  name={FIELD_NAMES.RESIDENTIAL_ADDRESS}
                  label={LABELS.RESIDENTIAL_ADDRESS}
                  className={styles.addressBox}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default StaffMembersForm;
