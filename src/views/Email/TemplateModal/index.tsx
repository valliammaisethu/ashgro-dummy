import React, { useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import Form from "src/shared/components/Form";
import SelectField from "src/shared/components/SelectField";
import useForm from "src/shared/components/UseForm";
import { EmailTemplateModalProps } from "src/shared/types/email.type";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";
import { MetaService } from "src/services/MetaService/meta.service";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";
import {
  emailConstants,
  EmailModalEnum,
  fields,
  labels,
  placeholders,
} from "./constants";

import styles from "../email.module.scss";
import { Spin } from "antd";

const TemplateModal = ({
  isOpen,
  onClose,
  toggleEmailModal,
}: EmailTemplateModalProps) => {
  const { getEmailTemplates } = MetaService();

  const { data: emailTemplatesData, isPending } = useQuery({
    ...getEmailTemplates(),
    enabled: isOpen,
  });

  const emailTemplateOptions = useMemo(
    () => mapToSelectOptionsDynamic(emailTemplatesData?.emailTemplates),
    [emailTemplatesData],
  );

  const methods = useForm({
    defaultValues: {
      [fields.emailTemplate]: undefined,
    },
  });

  const { watch, reset } = methods;
  const emailTemplateWatch = watch(fields.emailTemplate);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const handleNewEmailClick = useCallback(() => {
    toggleEmailModal(EmailModalEnum.EMAIL);
  }, [toggleEmailModal]);

  const handleNextClick = useCallback(() => {
    const selectedTemplate = emailTemplatesData?.emailTemplates?.find(
      (template) => template.id === emailTemplateWatch,
    );
    toggleEmailModal(EmailModalEnum.TEMPLATE, selectedTemplate);
  }, [toggleEmailModal, emailTemplatesData, emailTemplateWatch]);

  const closeModal = useCallback(() => {
    methods.reset({});
    onClose();
  }, [onClose, methods]);

  return (
    <Modal
      title={emailConstants.templateModalTitle}
      cancelButtonProps={{
        className: "d-none",
      }}
      handleOk={handleNextClick}
      closeModal={closeModal}
      visible={isOpen}
      okText={Buttons.NEXT}
      okButtonProps={{
        disabled: !emailTemplateOptions.length || !emailTemplateWatch,
      }}
      onCancel={closeModal}
      rootClassName={styles.emailTemplateModal}
    >
      <div className={styles.modalBody}>
        <Form methods={methods}>
          <SelectField
            options={emailTemplateOptions}
            name={fields.emailTemplate}
            label={labels.emailTemplate}
            placeholder={placeholders.emailTemplate}
            loading={isPending}
            suffixIcon={
              <span>
                {isPending && <Spin indicator={<LoadingOutlined />} />}
              </span>
            }
          />
        </Form>
        <div className={styles.or}>or</div>
        <Button
          onClick={handleNewEmailClick}
          type={ButtonTypes.TEXT}
          className={styles.newEmailButton}
        >
          {Buttons.NEW_EMAIL}
        </Button>
      </div>
    </Modal>
  );
};

export default TemplateModal;
