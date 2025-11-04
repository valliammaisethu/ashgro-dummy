import React, { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import Form from "src/shared/components/Form";
import SelectField from "src/shared/components/SelectField";
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

const TemplateModal = ({
  isOpen,
  onClose,
  toggleEmailModal,
}: EmailTemplateModalProps) => {
  const { getEmailTemplates } = MetaService();

  const { data: emailTemplatesData } = useQuery({
    ...getEmailTemplates(),
    enabled: isOpen,
  });

  const emailTemplateOptions = useMemo(
    () => mapToSelectOptionsDynamic(emailTemplatesData?.emailTemplates),
    [emailTemplatesData],
  );

  const handleNewEmailClick = useCallback(() => {
    toggleEmailModal(EmailModalEnum.EMAIL);
  }, [toggleEmailModal]);

  const handleNextClick = useCallback(() => {
    toggleEmailModal(EmailModalEnum.TEMPLATE);
  }, [toggleEmailModal]);

  return (
    <Modal
      title={emailConstants.templateModalTitle}
      cancelButtonProps={{
        className: "d-none",
      }}
      closeModal={onClose}
      visible={isOpen}
      onCancel={onClose}
      rootClassName={styles.emailTemplateModal}
    >
      <div className={styles.modalBody}>
        <Form>
          <SelectField
            options={emailTemplateOptions}
            name={fields.emailTemplate}
            label={labels.emailTemplate}
            placeholder={placeholders.emailTemplate}
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
      <div className={styles.modalFooter}>
        <Button
          onClick={handleNextClick}
          type={ButtonTypes.DEFAULT}
          className={styles.okButton}
        >
          {Buttons.NEXT}
        </Button>
      </div>
    </Modal>
  );
};

export default TemplateModal;
