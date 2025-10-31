import React, { useEffect, useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import Drawer from "src/shared/components/Drawer";
import Button from "src/shared/components/Button";
import SelectField from "src/shared/components/SelectField";
import Form from "src/shared/components/Form";
import useForm from "src/shared/components/UseForm";
import DateRangePickerField from "src/shared/components/DateRangePicker";
import { MetaService } from "src/services/MetaService/meta.service";
import { fields, labels, placeholders, title } from "./constants";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";
import { Buttons, HtmlButtonType } from "src/enums/buttons.enum";
import { ProspectFilterProps } from "src/shared/types/prospects.type";

import styles from "./filters.module.scss";

const Filters = (props: ProspectFilterProps) => {
  const { onSubmit, visible, toggleVisibility, defaultValues } = props;
  const { getLeadStatuses, getLeadSources } = MetaService();

  const leadStatusesQuery = useMemo(
    () => ({ ...getLeadStatuses(), enabled: visible }),
    [visible],
  );
  const leadSourcesQuery = useMemo(
    () => ({ ...getLeadSources(), enabled: visible }),
    [visible],
  );

  const { data: leadStatuses } = useQuery(leadStatusesQuery);
  const { data: leadSources } = useQuery(leadSourcesQuery);

  const methods = useForm({
    defaultValues: {
      [fields.followUpDateRange]:
        defaultValues?.[fields.followUpDateRange] || [],
      [fields.leadStatus]: defaultValues?.[fields.leadStatus] || [],
      [fields.leadSource]: defaultValues?.[fields.leadSource] || [],
    },
  });

  const { watch, setValue, reset } = methods;

  useEffect(() => {
    if (visible) {
      reset({
        [fields.followUpDateRange]:
          defaultValues?.[fields.followUpDateRange] || [],
        [fields.leadStatus]: defaultValues?.[fields.leadStatus] || [],
        [fields.leadSource]: defaultValues?.[fields.leadSource] || [],
      });
    }
  }, [visible, defaultValues, reset]);

  const leadStatusWatch = watch(fields.leadStatus);
  const leadSourceWatch = watch(fields.leadSource);

  const handleClearLeadStatus = () => setValue(fields.leadStatus, []);
  const handleClearLeadSource = () => setValue(fields.leadSource, []);

  const handleSubmit = (values: FieldValues) => {
    onSubmit(values);
  };

  const resetValues = () => {
    reset({
      [fields.followUpDateRange]: [],
      [fields.leadStatus]: [],
      [fields.leadSource]: [],
    });
  };

  return (
    <Drawer
      width={504}
      title={title}
      open={visible}
      closable
      onClose={toggleVisibility}
    >
      <div className={styles.body}>
        <Form onSubmit={handleSubmit} methods={methods}>
          <div className={styles.container}>
            <div className={styles.title}>{labels.followUpDateRange}</div>
            <div className={styles.datepicker}>
              <DateRangePickerField name={fields.followUpDateRange} />
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.title}>
              <span>{labels.leadStatus}</span>
              {leadStatusWatch.length > 0 && (
                <span onClick={handleClearLeadStatus} className={styles.clear}>
                  {Buttons.CLEAR}
                </span>
              )}
            </div>
            <div className={styles.subContainer}>
              <SelectField
                label={labels.leadStatus}
                showCheckboxes
                options={mapToSelectOptionsDynamic(leadStatuses?.leadStatuses)}
                name={fields.leadStatus}
                placeholder={placeholders.leadStatus}
              />
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.title}>
              <span>{labels.leadSource}</span>
              {leadSourceWatch.length > 0 && (
                <span onClick={handleClearLeadSource} className={styles.clear}>
                  {Buttons.CLEAR}
                </span>
              )}
            </div>
            <div className={styles.subContainer}>
              <SelectField
                label={labels.leadSource}
                showCheckboxes
                options={mapToSelectOptionsDynamic(leadSources?.leadSources)}
                name={fields.leadSource}
                placeholder={placeholders.leadSource}
              />
            </div>
          </div>

          <div className={styles.drawerFooter}>
            <div className={styles.cancelButton}>
              <Button className={styles.cancelButton} onClick={resetValues}>
                {Buttons.CLEAR_FILTERS}
              </Button>
            </div>
            <div>
              <Button
                htmlType={HtmlButtonType.SUBMIT}
                className={styles.confirmButton}
              >
                {Buttons.APPLY_FILTERS}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default Filters;
