import React from "react";
import Drawer from "src/shared/components/Drawer";
import {
  fields,
  labels,
  memberFiltersConstants,
  placeholders,
} from "./constants";
import { MemberFiltersProps } from "src/shared/types/members.type";

import styles from "./filters.module.scss";
import Form from "src/shared/components/Form";
import useForm from "src/shared/components/UseForm";
import { FieldValues } from "react-hook-form";
import DateRangePickerField from "src/shared/components/DateRangePicker";
import { Buttons, HtmlButtonType } from "src/enums/buttons.enum";
import SelectField from "src/shared/components/SelectField";
import Button from "src/shared/components/Button";

const { title } = memberFiltersConstants;

const MemberFilters = (props: MemberFiltersProps) => {
  const { visible, toggleVisibility } = props;

  const methods = useForm({});

  const { watch, setValue, reset } = methods;

  const handleSubmit = (values: FieldValues) => {};

  const leadSourceWatch = watch(fields.leadSource);
  const membershipStatus = watch(fields.membershipStatusIds);
  const membershipCategory = watch(fields.membershipCategoriesIds);

  const handleClear = (field: string) => () => setValue(field, []);

  const resetValues = () =>
    reset({
      [fields.followUpDateRange]: [],
      [fields.membershipStatusIds]: [],
      [fields.membershipCategoriesIds]: [],
      [fields.leadSource]: [],
    });

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
            <div className={styles.title}>{labels.membershipStatus}</div>
            <div className={styles.subContainer}>
              <SelectField
                label={labels.membershipStatus}
                options={[]}
                name={fields.membershipStatusIds}
                placeholder={placeholders.membershipStatus}
                showClear={membershipStatus?.length > 0}
                onClear={handleClear(fields.membershipStatusIds)}
              />
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.title}>{labels.membershipType}</div>
            <div className={styles.subContainer}>
              <SelectField
                label={labels.membershipType}
                options={[]}
                name={fields.membershipCategoriesIds}
                placeholder={placeholders.membershipType}
                showClear={membershipCategory?.length > 0}
                onClear={handleClear(fields.membershipCategoriesIds)}
              />
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.title}>{labels.leadSource}</div>
            <div className={styles.subContainer}>
              <SelectField
                label={labels.leadSource}
                showCheckboxes
                options={[]}
                name={fields.leadSource}
                placeholder={placeholders.leadSource}
                showClear={leadSourceWatch?.length > 0}
                onClear={handleClear(fields.leadSource)}
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

export default MemberFilters;
