import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import CardItem from "../components/CardItem";
import {
  ModalState,
  SettingFormModalModel,
  SettingItem,
  STAFF_MEMBERS_CONSTANTS,
} from "../constants";
import useForm from "src/shared/components/UseForm";
import { StaffDepartmentService } from "src/services/SettingsService/staffDepartment.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import ConditionalRender from "src/shared/components/ConditionalRender";
import Modal from "src/shared/components/Modal";
import Form from "src/shared/components/Form";
import InputField from "src/shared/components/InputField";
import { Justify } from "src/enums/align.enum";
import { ButtonTypes } from "src/enums/buttons.enum";

import styles from "./staffDepartment.module.scss";
import settingStyles from "../settings.module.scss";

const StaffDepartment = () => {
  const { TITLE, PLACE_HOLDER, BUTTON_TEXT, FIEL_NAME, EDIT_TITLE, ADD_TITLE } =
    STAFF_MEMBERS_CONSTANTS;

  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    mode: null,
  });

  const methods = useForm({});

  const { staffMembersList, staffDepartmentOperations, deleteStaffDepartment } =
    StaffDepartmentService();

  const {
    data: staffDepartments = [],
    isLoading,
    isSuccess,
  } = useQuery(staffMembersList());

  const { mutateAsync: staffDepartmentOperationsMutate, isPending } =
    useMutation(staffDepartmentOperations());

  const { mutateAsync: deleteMemberMutate, isPending: isDeletePending } =
    useMutation(deleteStaffDepartment());

  const { watch, handleSubmit, reset, setValue } = methods;

  const isDisabled = !watch(FIEL_NAME)?.trim();

  const handleFormModalVisibility = (
    mode: SettingFormModalModel,
    item?: SettingItem,
  ) => {
    if (!mode) {
      reset();
      setModalState({ open: false, mode: null });
      return;
    }

    if (mode === "edit" && item) {
      setValue(FIEL_NAME, item.label || "");
    } else {
      reset();
    }

    setModalState({ open: true, mode, item });
  };

  const handleFormSubmit = async ({ name = "" }: SettingItem) => {
    await staffDepartmentOperationsMutate({
      type: "staffDepartment",
      name,
      id: modalState?.item?.id,
    });

    handleFormModalVisibility(null);
  };

  const handleDelete = async (item: SettingItem) => {
    await deleteMemberMutate({ type: "staffDepartment", id: item?.id });
  };

  return (
    <div className={settingStyles.selectedSettingContainer}>
      <Row justify={Justify.END}>
        <Col>
          <Button
            type={ButtonTypes.PRIMARY}
            icon={<PlusOutlined />}
            className={styles.addButton}
            onClick={() => handleFormModalVisibility("add")}
          >
            Add
          </Button>
        </Col>
      </Row>
      <ConditionalRender
        records={staffDepartments}
        isPending={isLoading}
        isSuccess={isSuccess}
        className={styles.noDataScreen}
      >
        <div className={settingStyles.cardContainer}>
          {staffDepartments?.map((item) => (
            <CardItem
              key={item?.id}
              id={item?.id}
              label={item.label!}
              onEdit={() => handleFormModalVisibility("edit", item)}
              onDelete={() => handleDelete(item)}
              loading={isDeletePending}
              deleteTitle={TITLE}
              deleteDescription={item.label!}
            />
          ))}
        </div>
      </ConditionalRender>

      <Modal
        title={modalState.mode === "edit" ? EDIT_TITLE : ADD_TITLE}
        visible={modalState.open}
        width={500}
        cancelButtonProps={{ className: "d-none" }}
        closeModal={() => handleFormModalVisibility(null)}
        handleOk={handleSubmit(handleFormSubmit)}
        okText={BUTTON_TEXT[modalState?.mode ?? "add"]}
        okButtonProps={{
          disabled: isDisabled,
          loading: isPending,
        }}
      >
        <Form methods={methods}>
          <InputField
            placeholder={PLACE_HOLDER}
            label={TITLE}
            name={FIEL_NAME}
            required
          />
        </Form>
      </Modal>
    </div>
  );
};

export default StaffDepartment;
