import React, { useState } from "react";

import ToggleHeader from "../components/ToggleHeader";
import {
  MEMBERSHIP_CONSTANTS,
  MembershipSection,
  memberShipTabs,
  ModalState,
  SettingFormModalModel,
  SettingItem,
} from "../constants";
import ConditionalRender from "src/shared/components/ConditionalRender";
import CardItem from "../components/CardItem";
import Modal from "src/shared/components/Modal";
import InputField from "src/shared/components/InputField";
import useForm from "src/shared/components/UseForm";
import { MemberShipService } from "src/services/SettingsService/memberShip.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import Form from "src/shared/components/Form";

import styles from "../settings.module.scss";

const MembersShip = () => {
  const { TYPE, STATUS, FIELD_LABELS, PLACEHOLDER, BUTTON_TEXT, FIEL_NAME } =
    MEMBERSHIP_CONSTANTS;

  // TODO: move strings to constants
  const [activeSection, setActiveSection] =
    useState<MembershipSection>("memberShipType");
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    mode: null,
  });

  const methods = useForm({});

  const {
    memberShipOperations,
    memberShipStatuses,
    memberShipTypeStatuses,
    deleteMember,
  } = MemberShipService();

  const {
    data: statusOptions = [],
    isFetching: typeLoading,
    isSuccess: isSourceSuccess,
  } = useQuery(memberShipStatuses());

  const {
    data: typeOptions = [],
    isFetching: isStatusLoading,
    isSuccess: isStatusSuccess,
  } = useQuery(memberShipTypeStatuses());

  const { mutateAsync: memberShipTypeOrStatusMutate, isPending } = useMutation(
    memberShipOperations(),
  );
  const { mutateAsync: deleteMemberMutate, isPending: isDeletePending } =
    useMutation(deleteMember());

  const { watch, handleSubmit, reset, setValue } = methods;

  const isMemberShipTypeSelected = activeSection === "memberShipType";

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
    await memberShipTypeOrStatusMutate({
      type: activeSection,
      name,
      id: modalState?.item?.id,
    });

    handleFormModalVisibility(null);
  };

  const handleDelete = async (item: SettingItem) => {
    await deleteMemberMutate({ type: activeSection, id: item?.id });
  };

  const sectionMap = {
    memberShipType: {
      list: typeOptions,
      loading: typeLoading,
      success: isSourceSuccess,
    },
    memberShipStatus: {
      list: statusOptions,
      loading: isStatusLoading,
      success: isStatusSuccess,
    },
  };

  const {
    list: currentList,
    loading: isLeadLoading,
    success: isLeadSuccess,
  } = sectionMap[activeSection];

  const handleSectionChange = (key: string) =>
    setActiveSection(key as MembershipSection);

  return (
    <div className={styles.selectedSettingContainer}>
      <ToggleHeader
        options={memberShipTabs}
        activeKey={activeSection}
        onChange={handleSectionChange}
        onAdd={() => handleFormModalVisibility("add")}
      />

      <ConditionalRender
        records={currentList}
        isPending={isLeadLoading}
        isSuccess={isLeadSuccess}
        className={styles.noDataScreen}
      >
        <div className={styles.cardContainer}>
          {currentList?.map((item) => (
            <CardItem
              key={item?.id}
              id={item?.id}
              label={item.label!}
              onEdit={() => handleFormModalVisibility("edit", item)}
              onDelete={() => handleDelete(item)}
              loading={isDeletePending}
              deleteTitle={isMemberShipTypeSelected ? TYPE : STATUS}
              deleteDescription={item.label!}
            />
          ))}
        </div>
      </ConditionalRender>

      <Modal
        title={
          modalState.mode === "edit"
            ? `Edit ${isMemberShipTypeSelected ? TYPE : STATUS}`
            : `New ${isMemberShipTypeSelected ? TYPE : STATUS}`
        }
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
            placeholder={PLACEHOLDER[activeSection]}
            label={FIELD_LABELS[activeSection]}
            name={FIEL_NAME}
            required
          />
        </Form>
      </Modal>
    </div>
  );
};

export default MembersShip;
