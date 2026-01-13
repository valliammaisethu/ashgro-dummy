import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import ToggleHeader from "../components/ToggleHeader";
import Modal from "src/shared/components/Modal";
import Form from "src/shared/components/Form";
import InputField from "src/shared/components/InputField";
import { LeadService } from "src/services/SettingsService/lead.service";
import {
  LEAD_CONSTANTS,
  LeadSection,
  leadTabs,
  ModalState,
  SettingFormModalModel,
  SettingItem,
} from "../constants";
import ConditionalRender from "src/shared/components/ConditionalRender";
import CardItem from "../components/CardItem";
import SettingsSkeleton from "src/shared/components/Skeleton/SettingsSkeleton/SettingsSkeleton";

import styles from "../settings.module.scss";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

const Lead = () => {
  const { SOURCE, STATUS, FIELD_LABELS, PLACEHOLDER, BUTTON_TEXT, FIEL_NAME } =
    LEAD_CONSTANTS;

  // TODO: move strings to constants
  const [activeSection, setActiveSection] = useState<LeadSection>("source");

  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    mode: null,
  });

  const { leadSources, leadOperations, leadStatusList, deleteLead } =
    LeadService();

  const {
    data: leadSourceOptions = [],
    isFetching: isSourceLoading,
    isSuccess: isSourceSuccess,
  } = useQuery(leadSources());

  const {
    data: leadStatusOptions = [],
    isFetching: isStatusLoading,
    isSuccess: isStatusSuccess,
  } = useQuery(leadStatusList());

  const { mutateAsync: leadSourceOrLeadStatusMutate, isPending } =
    useMutation(leadOperations());
  const {
    mutateAsync: deleteLeadSourceOrLeadStatusMutate,
    isPending: isDeletePending,
  } = useMutation(deleteLead());

  const methods = useForm();

  const { watch, handleSubmit, reset, setValue } = methods;

  const isSourceSelected = activeSection === "source";

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
    await leadSourceOrLeadStatusMutate({
      type: activeSection,
      name,
      id: modalState?.item?.id,
    });

    handleFormModalVisibility(null);
  };

  const handleDelete = async (item: SettingItem) => {
    await deleteLeadSourceOrLeadStatusMutate({
      type: activeSection,
      id: item?.id,
    });
  };

  const sectionMap = {
    source: {
      list: leadSourceOptions,
      loading: isSourceLoading,
      success: isSourceSuccess,
    },
    status: {
      list: leadStatusOptions,
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
    setActiveSection(key as LeadSection);

  return (
    <>
      <div className={styles.selectedSettingContainer}>
        <ToggleHeader
          options={leadTabs}
          activeKey={activeSection}
          onChange={handleSectionChange}
          onAdd={() => handleFormModalVisibility("add")}
        />
      </div>

      <ConditionalRender
        records={currentList}
        isPending={isLeadLoading}
        isSuccess={isLeadSuccess}
        className={styles.noDataScreen}
        showLoader={false}
      >
        <ConditionalRenderComponent
          visible={isLeadSuccess}
          fallback={<SettingsSkeleton />}
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
                deleteTitle={isSourceSelected ? SOURCE : STATUS}
                deleteDescription={item.label!}
              />
            ))}
          </div>
        </ConditionalRenderComponent>
      </ConditionalRender>

      <Modal
        title={
          modalState.mode === "edit"
            ? `Edit ${isSourceSelected ? SOURCE : STATUS}`
            : `New ${isSourceSelected ? SOURCE : STATUS}`
        }
        visible={modalState.open}
        width={500}
        cancelButtonProps={{ className: "d-none" }}
        closeModal={() => handleFormModalVisibility(null)}
        handleOk={handleSubmit(handleFormSubmit)}
        okText={BUTTON_TEXT[modalState?.mode ?? "add"]}
        okButtonProps={{ disabled: isDisabled, loading: isPending }}
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
    </>
  );
};

export default Lead;
