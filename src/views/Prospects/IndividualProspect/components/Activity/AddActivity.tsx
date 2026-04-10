import React, { useEffect } from "react";
import dayjs from "dayjs";
import Button from "src/shared/components/Button";
import Form from "src/shared/components/Form";
import Modal from "src/shared/components/Modal";
import DatePicker from "src/shared/components/DatePicker";

import styles from "./activity.module.scss";
import { Col, Row } from "antd";
import { Justify } from "src/enums/align.enum";
import TextArea from "src/shared/components/TextArea";
import { ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import useForm from "src/shared/components/UseForm";
import { submitButtonKey } from "src/views/Prospects/ProspectForm/constants";
import SelectField from "src/shared/components/SelectField";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";
import { MetaService } from "src/services/MetaService/meta.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ActivityService } from "src/services/ActivityService/activity.service";
import { ActivityPayload } from "src/models/activity.model";
import { ActivityDetails } from "src/models/viewProspect.model";
import { useParams } from "react-router-dom";
import { DateFormats } from "src/enums/dateFormats.enum";

interface AddActivityProps {
  isOpen: boolean;
  onClose: () => void;
  handleRefetch?: () => void;
  selectedActivity?: ActivityDetails | null;
}

const { YYYY_MM_DD_T_HH_MM_SS, DD_MMM_YYYY__HH_MM_A } = DateFormats;

// TODO: create common component for activity and use for prospects and members

const AddActivity = ({
  isOpen,
  onClose,
  handleRefetch,
  selectedActivity = null,
}: AddActivityProps) => {
  const isEdit = !!selectedActivity;
  const activityId = selectedActivity?.id;

  const methods = useForm({});

  const { reset } = methods;

  useEffect(() => {
    if (!isOpen) return;
    if (isEdit && selectedActivity) {
      const { activityTypeId, description, id, createdAt } = selectedActivity;
      const localCreatedAt = createdAt
        ? dayjs.utc(createdAt).local().toISOString()
        : dayjs().toISOString();
      reset({ activityTypeId, description, id, createdAt: localCreatedAt });
    } else {
      reset({ createdAt: dayjs().toISOString() });
    }
  }, [isOpen]);

  const { id = "" } = useParams();

  const { getActivityTypes } = MetaService();

  const { data: activityTypes } = useQuery(getActivityTypes());

  const { addActivity, editActivity } = ActivityService();

  const { mutateAsync: addActivityAsync, isPending: isAdding } =
    useMutation(addActivity());

  const { mutateAsync: editActivityAsync, isPending: isUpdating } =
    useMutation(editActivity());

  const isLoading = isAdding || isUpdating;

  const handleSubmit = async (data: ActivityPayload) => {
    const createdAt = dayjs(data.createdAt).utc().format(YYYY_MM_DD_T_HH_MM_SS);
    if (isEdit) {
      await editActivityAsync({ ...data, createdAt, id, activityId });
      handleRefetch?.();
      handleCloseModal();
      return;
    }
    await addActivityAsync({ ...data, createdAt, id });
    handleRefetch?.();
    handleCloseModal();
  };

  const [isActivitySelected, isDescription] = methods.watch([
    "activityTypeId",
    "description",
  ]);

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div>
      <Modal
        title={isEdit ? "Edit Activity" : "New Activity"}
        visible={isOpen}
        width={664}
        cancelButtonProps={{ className: "d-none" }}
        closeModal={handleCloseModal}
      >
        <Form methods={methods} onSubmit={handleSubmit}>
          <p className={styles.title}>Activity Details</p>
          <div className={styles.container}>
            <Row
              gutter={[20, 20]}
              justify={Justify.SPACE_BETWEEN}
              align="bottom"
            >
              <Col span={12}>
                <DatePicker
                  name="createdAt"
                  label="Activity Date & Time"
                  format={DD_MMM_YYYY__HH_MM_A}
                  showTime={{ use12Hours: true, format: "hh:mm A" }}
                  placeholder="Select date & time"
                  changeOnScroll
                />
              </Col>
              <Col span={12}>
                <SelectField
                  placeholder={"Select activity type"}
                  label={"Activity Type"}
                  name={"activityTypeId"}
                  options={mapToSelectOptionsDynamic(
                    activityTypes?.activityTypes,
                  )}
                />
              </Col>
            </Row>
            <Row className={styles.description}>
              <Col span={24}>
                <TextArea
                  placeholder={"Description"}
                  name={"description"}
                  label={"Activity Description"}
                  className={styles.activityDescription}
                />
              </Col>
            </Row>
          </div>

          <div className={styles.modalFooter}>
            <Button
              key={submitButtonKey}
              type={ButtonTypes.DEFAULT}
              className={styles.okButton}
              htmlType={HtmlButtonType.SUBMIT}
              loading={isLoading}
              disabled={!isActivitySelected || !isDescription}
            >
              {isEdit ? "Save" : "Add Activity"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddActivity;
