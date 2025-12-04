import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import Drawer from "src/shared/components/Drawer";
import Form from "src/shared/components/Form";
import NumberIncrementer from "src/shared/components/NumberIncrementer";
import { HtmlButtonType } from "src/enums/buttons.enum";
import { GeneralSettingsDrawerProps } from "src/shared/types/clubs.type";
import { SETTINGS_LABELS, SETTINGS_FIELD_NAMES } from "./constants";

import styles from "./generalSettingsDrawer.module.scss";
import { ClubData, ClubGeneralSettings } from "src/models/club.model";
import SwitchField from "src/shared/components/SwitchField";

const GeneralSettingsDrawer: React.FC<GeneralSettingsDrawerProps> = ({
  open,
  onClose,
  clubId,
  clubData = new ClubData(),
  onSave,
  isLoading,
}) => {
  const methods = useForm<ClubGeneralSettings>({
    defaultValues: clubData?.club,
  });

  const {
    formState: { isDirty, isValid },
    reset,
    handleSubmit,
  } = methods;

  useEffect(() => {
    if (open) reset({ ...new ClubGeneralSettings() });
  }, [open, clubData?.club?.id, methods]);

  const handleFormSubmit = (data: ClubGeneralSettings) => onSave(data, clubId);

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
      okButtonProps={{ loading: isLoading, disabled: !isDirty || !isValid }}
      handleOk={handleSubmit(handleFormSubmit)}
    >
      <Form methods={methods} onSubmit={handleFormSubmit}>
        <div className={styles.generalSettingsContent}>
          <div className={styles.settingRow}>
            <span className={styles.settingLabel}>
              {SETTINGS_LABELS.leadForms}
            </span>
            <SwitchField
              name={SETTINGS_FIELD_NAMES.isLeadForms}
              className={styles.settingSwitch}
            />
          </div>

          <div className={styles.settingRow}>
            <span className={styles.settingLabel}>
              {SETTINGS_LABELS.bulkEmail}
            </span>
            <SwitchField
              name={SETTINGS_FIELD_NAMES.isBulkEmail}
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
              name={SETTINGS_FIELD_NAMES.noOfEmailTemplatesAllowed}
              min={0}
            />
          </div>

          <div className={styles.settingSection}>
            <span className={styles.sectionLabel}>
              {SETTINGS_LABELS.customChartsLabel}
            </span>
            <NumberIncrementer
              name={SETTINGS_FIELD_NAMES.noOfCustomChartsAllowed}
              min={0}
            />
          </div>
        </div>
      </Form>
    </Drawer>
  );
};

export default GeneralSettingsDrawer;
