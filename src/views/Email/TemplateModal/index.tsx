import React, { useMemo } from "react";
import Modal from "src/shared/components/Modal";
import { EmailTemplateModalProps } from "src/shared/types/email.type";
import styles from "../email.module.scss";
import Button from "src/shared/components/Button";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";
import { emailConstants, fields, labels, placeholders } from "./constants";
import Form from "src/shared/components/Form";
import SelectField from "src/shared/components/SelectField";
import { MetaService } from "src/services/MetaService/meta.service";
import { useQuery } from "@tanstack/react-query";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";

const TemplateModal = ({ isOpen, onClose }: EmailTemplateModalProps) => {
  const { getEmailTemplates } = MetaService();

  const emailTemplatesQuery = useMemo(
    () => ({ ...getEmailTemplates(), enabled: isOpen }),
    [isOpen],
  );

  const { data: emailTemplates } = useQuery(emailTemplatesQuery);
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
            options={mapToSelectOptionsDynamic(emailTemplates?.emailTemplates)}
            name={fields.emailTemplate}
            label={labels.emailTemplate}
            placeholder={placeholders.emailTemplate}
          />
        </Form>
        <div className={styles.or}>or</div>
        <Button type={ButtonTypes.TEXT} className={styles.newEmailButton}>
          {Buttons.NEW_EMAIL}
        </Button>
      </div>
      <div className={styles.modalFooter}>
        <Button type={ButtonTypes.DEFAULT} className={styles.okButton}>
          {Buttons.NEXT}
        </Button>
      </div>
    </Modal>
  );
};

export default TemplateModal;
