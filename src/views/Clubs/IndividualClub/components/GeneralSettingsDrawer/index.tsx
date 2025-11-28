import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import Drawer from "src/shared/components/Drawer";
import Form from "src/shared/components/Form";
import Switch from "src/shared/components/Switch";
import NumberIncrementer from "src/shared/components/NumberIncrementer";
import { HtmlButtonType } from "src/enums/buttons.enum";
import {
  GeneralSettingsDrawerProps,
  GeneralSettingsData,
} from "src/shared/types/clubs.type";
import { SETTINGS_LABELS, SETTINGS_FIELD_NAMES } from "./constants";

import styles from "./generalSettingsDrawer.module.scss";

const GeneralSettingsDrawer: React.FC<GeneralSettingsDrawerProps> = ({
  open,
  onClose,
  clubId,
  webFormsEnabled,
  bulkEmailEnabled,
  emailTemplatesAllowed,
  customChartsAllowed,
  onSave,
  isLoading,
}) => {
  const methods = useForm<GeneralSettingsData>({
    defaultValues: {
      webFormsEnabled: webFormsEnabled ?? false,
      bulkEmailEnabled: bulkEmailEnabled ?? false,
      emailTemplatesAllowed: emailTemplatesAllowed ?? 0,
      customChartsAllowed: customChartsAllowed ?? 0,
    },
  });

  useEffect(() => {
    if (open)
      methods.reset({
        webFormsEnabled: webFormsEnabled ?? false,
        bulkEmailEnabled: bulkEmailEnabled ?? false,
        emailTemplatesAllowed: emailTemplatesAllowed ?? 0,
        customChartsAllowed: customChartsAllowed ?? 0,
      });
  }, [
    open,
    webFormsEnabled,
    bulkEmailEnabled,
    emailTemplatesAllowed,
    customChartsAllowed,
    methods,
  ]);

  const handleFormSubmit = (data: GeneralSettingsData) => onSave(data, clubId);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={SETTINGS_LABELS.title}
      width={384}
      rootClassName={styles.generalSettingsDrawer}
      okText={SETTINGS_LABELS.saveChanges}
      cancelButtonProps={{
        className: "d-none",
      }}
      okButtonHtmlType={HtmlButtonType.SUBMIT}
      okButtonProps={{ loading: isLoading }}
      handleOk={() => methods.handleSubmit(handleFormSubmit)()}
    >
      <Form methods={methods} onSubmit={handleFormSubmit}>
        <div className={styles.generalSettingsContent}>
          <div className={styles.settingRow}>
            <span className={styles.settingLabel}>
              {SETTINGS_LABELS.webForms}
            </span>
            <Switch
              name={SETTINGS_FIELD_NAMES.webFormsEnabled}
              className={styles.settingSwitch}
            />
          </div>

          <div className={styles.settingRow}>
            <span className={styles.settingLabel}>
              {SETTINGS_LABELS.bulkEmail}
            </span>
            <Switch
              name={SETTINGS_FIELD_NAMES.bulkEmailEnabled}
              className={styles.settingSwitch}
            />
          </div>
        </div>
        <div className={styles.additionalSettings}>
          <div className={styles.settingSection}>
            <span className={styles.sectionLabel}>
              {SETTINGS_LABELS.emailTemplatesLabel}
            </span>
            <NumberIncrementer
              name={SETTINGS_FIELD_NAMES.emailTemplatesAllowed}
              min={0}
              max={100}
            />
          </div>

          <div className={styles.settingSection}>
            <span className={styles.sectionLabel}>
              {SETTINGS_LABELS.customChartsLabel}
            </span>
            <NumberIncrementer
              name={SETTINGS_FIELD_NAMES.customChartsAllowed}
              min={0}
              max={100}
            />
          </div>
        </div>
      </Form>
    </Drawer>
  );
};

export default GeneralSettingsDrawer;
