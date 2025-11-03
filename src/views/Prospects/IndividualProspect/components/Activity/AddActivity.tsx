import React from "react";
import { IconCalendarDatesFill } from "obra-icons-react";
import dayjs from "dayjs";

import Button from "src/shared/components/Button";
import Form from "src/shared/components/Form";
import Modal from "src/shared/components/Modal";

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
import Label from "src/shared/components/Label";
import { ActivityService } from "src/services/ActivityService/activity.service";
import { ActivityPayload } from "src/models/activity.model";
import { useParams } from "react-router-dom";

interface AddActivityProps {
  isOpen: boolean;
  onClose: () => void;
  handleRefetch?: () => void;
}
const AddActivity = ({ isOpen, onClose, handleRefetch }: AddActivityProps) => {
  const methods = useForm({});

  const { id = "" } = useParams();

  const { getActivityTypes } = MetaService();

  const { data: activityTypes } = useQuery(getActivityTypes());

  const { addActivity } = ActivityService();

  const { mutateAsync: addActivityAsync, isPending } =
    useMutation(addActivity());

  const now = dayjs();

  const createdAt = now.format("YYYY-MM-DDTHH:mm:ss");

  const formattedCreatedAt = now.format("YYYY-MM-DD hh:mm A");

  const handleSubmit = async (data: ActivityPayload) => {
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
    methods.setValue("activityTypeId", undefined);
    methods.setValue("description", undefined);
  };

  return (
    <div>
      <Modal
        title={"New Activity"}
        visible={isOpen}
        width={664}
        cancelButtonProps={{ className: "d-none" }}
        closeModal={handleCloseModal}
      >
        <Form methods={methods} onSubmit={handleSubmit}>
          <p className={styles.title}>Activity Details</p>
          <div className={styles.container}>
            <Row gutter={[20, 20]} justify={Justify.SPACE_BETWEEN}>
              <Col span={12}>
                <Label>{"Activity Date & Time"}</Label>
                <div className={styles.currentDateAndTime}>
                  <p>{formattedCreatedAt}</p>
                  <IconCalendarDatesFill />
                </div>
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
              loading={isPending}
              disabled={!isActivitySelected || !isDescription}
            >
              Add Activity
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddActivity;
