import React, { Fragment, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import styles from "../settings.module.scss";
import ToggleHeader from "../components/ToggleHeader";
import EmailTemplateModal from "./Modal";
import { EmailTemplateService } from "src/services/SettingsService/emailTemplate.service";
import ConditionalRender from "src/shared/components/ConditionalRender";
import CardItem from "../components/CardItem";
import { EmailTemplate } from "src/models/meta.model";
import { EMAIL_TEMPLATE_CONSTANTS } from "../constants";

const EmailTemplates = () => {
  const { TITLE } = EMAIL_TEMPLATE_CONSTANTS;

  const [modalState, setModalState] = useState<{
    open: boolean;
    selectedTemplate?: EmailTemplate;
  }>({
    open: false,
  });

  const { emailTemplateList, deleteEmailTemplate } = EmailTemplateService();

  const {
    data: emailTemplates = [],
    isFetching: isLoading,
    isSuccess,
  } = useQuery(emailTemplateList());

  const { mutateAsync: deleteTemplateMutate, isPending: isDeletePending } =
    useMutation(deleteEmailTemplate());

  const handleOpenModal = (template?: EmailTemplate) => {
    setModalState({ open: true, selectedTemplate: template });
  };

  const handleCloseModal = () => {
    setModalState({ open: false, selectedTemplate: undefined });
  };

  const handleDelete = async (template: EmailTemplate) => {
    await deleteTemplateMutate({
      type: "emailTemplate",
      id: template?.id,
    });
  };

  return (
    <Fragment>
      <div className={styles.selectedSettingContainer}>
        <ToggleHeader onAdd={() => handleOpenModal()} />
      </div>

      <ConditionalRender
        records={emailTemplates}
        isPending={isLoading}
        isSuccess={isSuccess}
      >
        <div className={styles.cardContainer}>
          {emailTemplates?.map((template) => (
            <CardItem
              key={template?.id}
              id={template?.id}
              label={template.title!}
              onEdit={() => handleOpenModal(template)}
              onDelete={() => handleDelete(template)}
              loading={isDeletePending}
              deleteTitle={TITLE}
              deleteDescription={template.title!}
            />
          ))}
        </div>
      </ConditionalRender>

      <EmailTemplateModal
        onClose={handleCloseModal}
        open={modalState.open}
        selectedTemplate={modalState.selectedTemplate}
      />
    </Fragment>
  );
};

export default EmailTemplates;
