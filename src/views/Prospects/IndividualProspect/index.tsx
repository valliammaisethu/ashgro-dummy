import React, { Fragment, useState, useMemo } from "react";
import { IconDelete, IconEdit } from "obra-icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Select } from "antd";

import Header from "./Header";
import ProspectForm from "../ProspectForm";
import Card from "src/shared/components/Card";
import Button from "src/shared/components/Button";
import ProspectInfo from "./components/ProspectInfo";
import ConditionalRender from "src/shared/components/ConditionalRender";
import DetailSection from "./components/DetailSection";
import ActivitySection from "./components/ActivitySection";
import {
  selectStatus,
  selectStatusClassName,
} from "src/constants/sharedComponents";
import {
  PROSPECT_LABELS,
  DetailSectionType,
  getProspectMeetingEvent,
} from "./constants";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import useDrawer from "src/shared/hooks/useDrawer";
import DeleteModal from "../DeleteModal";

import MemberConversionModal from "../MemberConversionModal";
import { getFullName } from "src/shared/utils/helpers";
import NewEmailModal from "src/views/Email/NewEmailModal";
import { SelectedEmailModel } from "src/models/email.model";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import TemplateModal from "src/views/Email/TemplateModal";
import { EmailModalEnum } from "src/views/Email/TemplateModal/constants";
import { EmailTemplate } from "src/models/meta.model";
import BookMeeting from "src/views/Calender/BookMeeting";
import { LeadService } from "src/services/SettingsService/lead.service";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

import styles from "./individualProspect.module.scss";
import clsx from "clsx";

const IndividualProspect = () => {
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;
  const { viewProspect, editProspect } = ProspectsService();
  const { id = "" } = useParams();
  const {
    data,
    isLoading: isPending,
    isSuccess,
    refetch,
  } = useQuery(viewProspect(id));

  const { leadStatusList } = LeadService();
  const { data: leadStatusesData = [] } = useQuery(leadStatusList());

  const leadStatusOptions = useMemo(
    () =>
      leadStatusesData?.map((status) => ({
        ...status,
        statusName: status?.label,
      })),
    [leadStatusesData],
  );

  const { mutateAsync: updateProspectMutate, isPending: isUpdatingStatus } =
    useMutation(editProspect());

  const [isEdit, setIsEdit] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<SelectedEmailModel>(
    new SelectedEmailModel(),
  );
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>();
  const { visible, toggleVisibility } = useDrawer();

  const { visible: deleteModalVisible, toggleVisibility: toggleDeleteModal } =
    useDrawer();

  const { visible: emailModalVisible, toggleVisibility: toggleEmailModal } =
    useDrawer();

  const {
    visible: memberConversionModalVisible,
    toggleVisibility: toggleMemberConversionModal,
  } = useDrawer();

  const {
    visible: templateModalVisible,
    toggleVisibility: toggleTemplateModal,
  } = useDrawer();

  const { visible: bookMeetingVisible, toggleVisibility: toggleBookMeeting } =
    useDrawer();

  const handleEdit = () => {
    setIsEdit(true);
    toggleVisibility();
  };

  const handleConvertToMember = () => toggleMemberConversionModal();

  const handleRefetch = () => refetch();

  const handleStatusChange = async (statusName: string) => {
    const selectedStatus = leadStatusOptions?.find(
      (status) => status?.id === statusName,
    );
    if (selectedStatus?.id && id) {
      await updateProspectMutate({
        prospect: {
          id,
          leadStatusId: selectedStatus?.id,
          clubId,
        },
      });
      refetch();
    }
  };

  const handleEmailTemplateModal = (
    type: EmailModalEnum,
    template?: EmailTemplate,
  ) => {
    setSelectedTemplate(type === EmailModalEnum.EMAIL ? undefined : template);
    setSelectedEmail({
      email: data?.prospect?.email,
      id: String(data?.prospect?.id),
      name: data?.prospect?.firstName,
    });
    toggleTemplateModal();
    toggleEmailModal();
  };

  return (
    <div className={styles.individualProspect}>
      <Header
        isFetchingProfile={isPending}
        onEmail={toggleTemplateModal}
        onConvert={handleConvertToMember}
        onBookMeeting={toggleBookMeeting}
      />
      <ConditionalRender
        isPending={isPending}
        isSuccess={isSuccess}
        records={[data?.prospect]}
      >
        <Card className={styles.card}>
          <div className={styles.leftSide}>
            <div className={styles.header}>
              <Select
                value={data?.prospect?.leadStatus || undefined}
                options={leadStatusOptions?.map((opt) => ({
                  label: opt.statusName,
                  value: opt.id,
                }))}
                onChange={handleStatusChange}
                loading={isUpdatingStatus}
                className={clsx(selectStatusClassName, styles.selectStatus)}
                placeholder={selectStatus}
              />
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
                <ConditionalRenderComponent
                  visible={!!data?.prospect?.additionalComments}
                  hideFallback
                >
                  <div className={styles.commentContentContainer}>
                    <p className={styles.title}>
                      {PROSPECT_LABELS.additionalComments}
                    </p>
                    <p className={styles.content}>
                      {data?.prospect?.additionalComments}
                    </p>
                  </div>
                </ConditionalRenderComponent>
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
      {isEdit && !isPending ? (
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
      <TemplateModal
        isOpen={templateModalVisible}
        onClose={toggleTemplateModal}
        toggleEmailModal={handleEmailTemplateModal}
      />
      <NewEmailModal
        selectedEmails={[selectedEmail]}
        isOpen={emailModalVisible}
        onClose={toggleEmailModal}
        selectedTemplate={selectedTemplate}
      />
      <BookMeeting
        isOpen={bookMeetingVisible}
        onClose={toggleBookMeeting}
        calendarEvent={getProspectMeetingEvent({
          id,
          firstName: data?.prospect?.firstName,
          lastName: data?.prospect?.lastName,
        })}
      />
    </div>
  );
};

export default IndividualProspect;
