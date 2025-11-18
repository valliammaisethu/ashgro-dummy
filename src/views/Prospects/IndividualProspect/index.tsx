import React, { Fragment, useState } from "react";
import { IconDelete, IconEdit } from "obra-icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Select } from "antd";

import Header from "./Header";
import StatusTag from "../Listing/Atoms/StatusTag";
import ProspectForm from "../ProspectForm";
import Card from "src/shared/components/Card";
import Button from "src/shared/components/Button";
import ProspectInfo from "./components/ProspectInfo";
import ConditionalRender from "src/shared/components/ConditionalRender";
import DetailSection from "./components/DetailSection";
import ActivitySection from "./components/ActivitySection";
import { PROSPECT_LABELS, DetailSectionType } from "./constants";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import useDrawer from "src/shared/hooks/useDrawer";
import { MetaService } from "src/services/MetaService/meta.service";
import DeleteModal from "../DeleteModal";

import MemberConversionModal from "../MemberConversionModal";
import { getFullName } from "src/shared/utils/helpers";
import NewEmailModal from "src/views/Email/NewEmailModal";
import { SelectedEmailModel } from "src/models/email.model";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";

import styles from "./individualProspect.module.scss";

const IndividualProspect = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;
  const { viewProspect, editProspect } = ProspectsService();
  const { id = "" } = useParams();
  const { data, isPending, isSuccess, isFetching, refetch } = useQuery(
    viewProspect(id),
  );

  const { getLeadStatuses } = MetaService();

  const { data: leadStatusOptions } = useQuery(getLeadStatuses());

  const { mutateAsync: updateProspectMutate, isPending: isUpdatingStatus } =
    useMutation(editProspect());

  const [isEdit, setIsEdit] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<SelectedEmailModel>(
    new SelectedEmailModel(),
  );

  const { visible, toggleVisibility } = useDrawer();

  const { visible: deleteModalVisible, toggleVisibility: toggleDeleteModal } =
    useDrawer();

  const { visible: emailModalVisible, toggleVisibility: toggleEmailModal } =
    useDrawer();

  const {
    visible: memberConversionModalVisible,
    toggleVisibility: toggleMemberConversionModal,
  } = useDrawer();

  const handleEdit = () => {
    setIsEdit(true);
    toggleVisibility();
  };

  const handleConvertToMember = () => toggleMemberConversionModal();

  const handleRefetch = () => refetch();

  const handleEmailModal = () => {
    setSelectedEmail({
      email: data?.prospect?.email,
      id: String(data?.prospect?.id),
      name: data?.prospect?.firstName,
    });
    toggleEmailModal();
  };

  const handleStatusChange = async (statusName: string) => {
    const selectedStatus = leadStatusOptions?.leadStatuses?.find(
      (status) => status.statusName === statusName,
    );
    if (selectedStatus?.id && id) {
      await updateProspectMutate({
        prospect: {
          id,
          leadStatusId: selectedStatus.id,
          clubId,
        },
      });
      refetch();
    }
  };

  return (
    <div className={styles.individualProspect}>
      <Header onEmail={handleEmailModal} onConvert={handleConvertToMember} />
      <ConditionalRender
        isPending={isPending}
        isSuccess={isSuccess}
        isFetching={isFetching}
        records={[data?.prospect]}
      >
        <Card className={styles.card}>
          <div className={styles.leftSide}>
            <div className={styles.header}>
              <Select
                value={data?.prospect?.leadStatus || undefined}
                className={styles.statusSelect}
                placeholder="Select a status"
                onChange={handleStatusChange}
                loading={isUpdatingStatus}
              >
                {leadStatusOptions?.leadStatuses?.map(
                  ({ id, statusName = "" }) => (
                    <Select.Option key={id} value={statusName}>
                      <StatusTag label={statusName} />
                    </Select.Option>
                  ),
                )}
              </Select>
              <Button
                onClick={handleEdit}
                icon={<IconEdit strokeWidth={1.5} />}
                className={styles.editButton}
              />
              <Button
                onClick={toggleDeleteModal}
                icon={<IconDelete strokeWidth={1.5} />}
                className={styles.deleteButton}
              />
            </div>
            <div className={styles.content}>
              <ProspectInfo
                data={data?.prospect}
                onRefetch={handleRefetch}
                clubId={clubId}
              />
              <div className={styles.bottom}>
                <DetailSection
                  title={PROSPECT_LABELS.leadDetails}
                  data={data?.prospect}
                  type={DetailSectionType.LEAD_DETAILS}
                />
                <DetailSection
                  title={PROSPECT_LABELS.feesAndDues}
                  data={data?.prospect}
                  type={DetailSectionType.FEES_AND_DUES}
                />
              </div>
            </div>
          </div>
          <div className={styles.rightSide}>
            <ActivitySection
              activities={data?.prospect.activityDetails}
              activityCount={data?.prospect.activityDetails.length}
              handleRefetch={handleRefetch}
            />
          </div>
        </Card>
      </ConditionalRender>
      {isEdit && !isFetching ? (
        <ProspectForm
          prospectId={String(data?.prospect?.id)}
          isEdit={isEdit}
          visible={visible}
          onClose={toggleVisibility}
        />
      ) : (
        <Fragment />
      )}
      <MemberConversionModal
        visible={memberConversionModalVisible}
        onClose={toggleMemberConversionModal}
        memberName={getFullName(
          data?.prospect?.firstName,
          data?.prospect?.lastName,
        )}
      />
      <DeleteModal
        visible={deleteModalVisible}
        toggleVisibility={toggleDeleteModal}
        id={id}
        prospectName={getFullName(
          data?.prospect?.firstName,
          data?.prospect?.lastName,
        )}
      />
      <NewEmailModal
        selectedEmails={[selectedEmail]}
        isOpen={emailModalVisible}
        onClose={toggleEmailModal}
      />
    </div>
  );
};

export default IndividualProspect;
