import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  fields,
  labels,
  memberFiltersConstants,
  placeholders,
} from "./constants";
import { MemberFiltersProps } from "src/shared/types/members.type";
import { Buttons, HtmlButtonType } from "src/enums/buttons.enum";
import { QueryParamKeys } from "src/enums/queryParams.enum";
import Form from "src/shared/components/Form";
import Drawer from "src/shared/components/Drawer";
import useForm from "src/shared/components/UseForm";
import DateRangePickerField from "src/shared/components/DateRangePicker";
import SelectField from "src/shared/components/SelectField";
import Button from "src/shared/components/Button";
import { MetaService } from "src/services/MetaService/meta.service";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";

import styles from "./filters.module.scss";

const { title } = memberFiltersConstants;

const MemberFilters = (props: MemberFiltersProps) => {
  const { visible, toggleVisibility, onSubmit, defaultValues } = props;

  const methods = useForm({
    values: {
      [fields.followUpDateRange]:
        defaultValues?.[fields.followUpDateRange] || [],
      [fields.membershipCategoriesIds]:
        defaultValues?.[fields.membershipCategoriesIds] || [],
      [fields.membershipStatusIds]:
        defaultValues?.[fields.membershipStatusIds] || [],
      [fields.leadSource]: defaultValues?.[fields.leadSource] || [],
    },
  });

  const { watch, setValue, reset } = methods;
  const { getLeadSources, getMembershipCategories, getMembershipStatuses } =
    MetaService();

  const { data: leadSourcesData, isPending: leadSourcesPending } = useQuery({
    ...getLeadSources({
      filter: QueryParamKeys.MEMBERS,
    }),
    enabled: visible,
  });

  const {
    data: membershipCategoriesData,
    isPending: membershipCategoriesPending,
  } = useQuery({
    ...getMembershipCategories(),
    enabled: visible,
  });

  const { data: membershipStatusesData, isPending: membershipStatusesPending } =
    useQuery({
      ...getMembershipStatuses({
        filter: QueryParamKeys.MEMBERS,
      }),
      enabled: visible,
    });

  const membershipCategoriesOptions = useMemo(
    () =>
      mapToSelectOptionsDynamic(membershipCategoriesData?.membershipCategories),
    [membershipCategoriesData],
  );

  const leadSourcesOptions = useMemo(
    () => mapToSelectOptionsDynamic(leadSourcesData?.leadSources),
    [leadSourcesData],
  );

  const membershipStatusOptions = useMemo(
    () => mapToSelectOptionsDynamic(membershipStatusesData?.leadStatuses),
    [membershipStatusesData],
  );

  const handleSubmit = (values: FieldValues) => onSubmit(values);

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
                options={membershipStatusOptions}
                showCheckboxes
                loading={membershipStatusesPending}
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
                options={membershipCategoriesOptions}
                showCheckboxes
                loading={membershipCategoriesPending}
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
                options={leadSourcesOptions}
                loading={leadSourcesPending}
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
