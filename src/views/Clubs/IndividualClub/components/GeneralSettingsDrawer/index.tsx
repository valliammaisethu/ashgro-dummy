import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Drawer from "src/shared/components/Drawer";
import Form from "src/shared/components/Form";
import NumberIncrementer from "src/shared/components/NumberIncrementer";
import { GeneralSettingsDrawerProps } from "src/shared/types/clubs.type";
import { SETTINGS_LABELS, SETTINGS_FIELD_NAMES } from "./constants";
import { ClubSettingsTypes } from "src/enums/clubSettingsTypes.enum";

import styles from "./generalSettingsDrawer.module.scss";
import { ClubGeneralSettings } from "src/models/club.model";
import SwitchField from "src/shared/components/SwitchField";
import WarningModal from "../WarningModal";

const GeneralSettingsDrawer: React.FC<GeneralSettingsDrawerProps> = ({
  open,
  onClose,
  clubId,
  clubData = new ClubGeneralSettings(),
  onSave,
  isLoading,
}) => {
  const methods = useForm<ClubGeneralSettings>({
    defaultValues: clubData,
  });

  const { getValues, formState, reset, handleSubmit } = methods;

  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (open) {
      reset(clubData);
    }
  }, [open]);

  const checkIfReducingValues = () => {
    const values = getValues();
    if (!clubData) return false;

    const isReducingTemplates =
      (values.noOfEmailTemplatesAllowed ?? 0) <
      (clubData.noOfEmailTemplatesAllowed ?? 0);

    const isReducingCharts =
      (values.noOfCustomChartsAllowed ?? 0) <
      (clubData?.noOfCustomChartsAllowed ?? 0);

    return isReducingTemplates || isReducingCharts;
  };

  const handleFormSubmit = () => {
    if (checkIfReducingValues()) {
      setShowWarning(true);
      return;
    }

    onSave(getValues(), clubId);
  };

  const handleOverrideSave = () => {
    setShowWarning(false);
    onSave(getValues(), clubId);
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        title={SETTINGS_LABELS.title}
        width={384}
        rootClassName={styles.generalSettingsDrawer}
        okText={SETTINGS_LABELS.saveChanges}
        cancelButtonProps={{ className: "d-none" }}
        okButtonProps={{
          loading: isLoading,
          disabled: !formState.isDirty || !formState.isValid,
        }}
        handleOk={handleSubmit(handleFormSubmit)}
      >
        <Form methods={methods}>
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

      <WarningModal
        open={showWarning}
        type={ClubSettingsTypes.TEMPLATES}
        isLoading={isLoading}
        onClose={() => setShowWarning(false)}
        onSave={handleOverrideSave}
      />
    </>
  );
};

export default GeneralSettingsDrawer;
