import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Col, Row } from "antd";
import {
  IconEdit,
  IconCakeAlt,
  IconLocationMarker,
  IconEmail,
  IconCall,
} from "obra-icons-react";
import { generatePath, useParams } from "react-router-dom";

import { Justify } from "src/enums/align.enum";
import { CommonService } from "src/services/CommonService.ts/common.service";
import Button from "src/shared/components/Button";
import ConditionalRender from "src/shared/components/ConditionalRender";
import DeleteModal from "src/shared/components/DeleteModal";
import IndividualDetailsHeader from "src/shared/components/IndividualDetailsHeader";
import { getFullName } from "src/shared/utils/helpers";
import { MembersService } from "src/services/MembersService/members.service";
import ActivitySection from "./ActivitySection";
import ImageFrame from "src/shared/components/atoms/ImageFrame";
import IconLabel from "src/shared/components/atoms/IconLabel";
import { detailsConstants } from "./constants";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import useRedirect from "src/shared/hooks/useRedirect";
import { QueryKeys } from "src/enums/cacheEvict.enum";

import styles from "./details.module.scss";
import { fallbackHandler } from "src/shared/utils/commonHelpers";
import MembersForm from "../MembersForm";
import { MemberShipService } from "src/services/SettingsService/memberShip.service";
import { defaultCountryCode } from "src/constants/common";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import NewEmailModal from "src/views/Email/NewEmailModal";
import { SelectedEmailModel } from "src/models/email.model";
import useDrawer from "src/shared/hooks/useDrawer";
import { formatDate } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import { formatAndSetPhoneNumber } from "src/shared/utils/phoneNumberUtils";
import { getPhoneNumber } from "src/views/Prospects/IndividualProspect/utils";
import { EmailTemplate } from "src/models/meta.model";
import { EmailModalEnum } from "src/views/Email/TemplateModal/constants";
import TemplateModal from "src/views/Email/TemplateModal";
import StatusDropdown from "src/shared/components/StatusDropdown";

const {
  footer: {
    LEAD_SOURCE,
    INITIAL_FEE,
    MEMBERSHIP_TYPE,
    MONTHLY_DUES,
    RESIGNATION_DATE,
  },
  title,
  feesAndDuesLabel,
  joinedDate,
  memberDetailsLabel,
} = detailsConstants;

const { GET_MEMBERS } = QueryKeys;

const Details = () => {
  const { id = "" } = useParams();
  const [isEditForm, setIsEditForm] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<SelectedEmailModel>(
    new SelectedEmailModel(),
  );
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>();
  const queryClient = useQueryClient();

  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const { visible: emailModalVisible, toggleVisibility: toggleEmailModal } =
    useDrawer();

  const { navigateToMembers } = useRedirect();

  const { MembersDetails, updateMemberStatus } = MembersService();
  const { memberShipStatuses } = MemberShipService();
  const { deleteResource } = CommonService();

  const { data: memberShipStatusesOptions = [] } =
    useQuery(memberShipStatuses());

  const {
    data,
    isLoading: isPending,
    isSuccess,
    refetch,
  } = useQuery(MembersDetails(id));

  const { mutateAsync: deleteStaffMemberMutate } =
    useMutation(deleteResource());
  const { mutateAsync: updateMemberStatusMutate, isPending: isUpdatingStatus } =
    useMutation(updateMemberStatus());

  const handleDelete = async () => {
    const path = generatePath(ApiRoutes.MEMBER_DETAILS, { id });

    await deleteStaffMemberMutate(
      {
        path: path,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [GET_MEMBERS] });
          queryClient.refetchQueries({ queryKey: [GET_MEMBERS, clubId] });

          navigateToMembers();
        },
      },
    );
  };

  const {
    visible: templateModalVisible,
    toggleVisibility: toggleTemplateModal,
  } = useDrawer();

  const memberDetails = [
    { label: LEAD_SOURCE, value: data?.leadSource },
    { label: MEMBERSHIP_TYPE, value: data?.membershipCategory },
    { label: RESIGNATION_DATE, value: data?.resignationDate },
  ];

  const feesAndDues = [
    { label: MONTHLY_DUES, value: data?.monthlyDues },
    { label: INITIAL_FEE, value: data?.initiationFee },
  ];

  const handleModalVisibility = () => setIsEditForm((prev) => !prev);

  const handleStatusChange = async (value: string) => {
    await updateMemberStatusMutate({
      memberId: data?.id,
      membershipStatusId: value,
    });
    refetch();
  };

  const handleEmailTemplateModal = (
    type: EmailModalEnum,
    template?: EmailTemplate,
  ) => {
    setSelectedTemplate(type === EmailModalEnum.EMAIL ? undefined : template);
    setSelectedEmail({
      email: data?.email,
      id: String(data?.id),
      name: data?.firstName,
    });
    toggleTemplateModal();
    toggleEmailModal();
  };

  return (
    <>
      <IndividualDetailsHeader
        navigateBack={navigateToMembers}
        onEmailClick={toggleTemplateModal}
        isPending={isPending}
      />

      <ConditionalRender
        isPending={isPending}
        isSuccess={isSuccess}
        records={[data]}
      >
        <Card className={styles.card}>
          <Row justify={Justify.START}>
            <Col span={14} className={styles.leftSide}>
              <Row justify={Justify.END} gutter={[10, 0]}>
                <Col>
                  <StatusDropdown
                    value={data?.membershipStatus}
                    options={
                      memberShipStatusesOptions?.map((option) => ({
                        statusName: option.label,
                        id: option.value,
                        color: option.color,
                      })) || []
                    }
                    onChange={handleStatusChange}
                    loading={isUpdatingStatus}
                  />
                </Col>
                <Col>
                  <Button
                    onClick={handleModalVisibility}
                    icon={<IconEdit strokeWidth={1.5} />}
                    className={styles.editButton}
                  />
                </Col>
                <Col>
                  <DeleteModal
                    title={title}
                    description={getFullName(data?.firstName, data?.lastName)}
                    onDelete={handleDelete}
                  />
                </Col>
              </Row>

              <Row className={styles.profileContainer}>
                <Col span={8}>
                  <ImageFrame src={data?.profilePictureUrl} />
                </Col>
                <Col span={16}>
                  <p className={styles.fullName}>
                    {getFullName(data?.firstName, data?.lastName)}
                  </p>
                  <div>
                    <span className={styles.joinedDatelabel}>{joinedDate}</span>
                    <span className={styles.joinedDate}>
                      {fallbackHandler(
                        formatDate(data?.joinedDate, DateFormats.DD_MMM__YYYY),
                      )}
                    </span>
                  </div>
                  <div className={styles.basicInfo}>
                    <IconLabel icon={IconCakeAlt} label={data?.birthDate} />
                    <IconLabel
                      icon={IconLocationMarker}
                      label={data?.residentialAddress}
                    />
                    <div className={styles.basicFooterInfo}>
                      <IconLabel icon={IconEmail} label={data?.email} isEmail />
                      <IconLabel
                        icon={IconCall}
                        label={formatAndSetPhoneNumber(
                          getPhoneNumber(
                            defaultCountryCode,
                            data?.contactNumber,
                          ),
                        )}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <div className={styles.membersDetails}>
                <div>
                  <p className={styles.membersDetailsLabel}>
                    {memberDetailsLabel}
                  </p>
                  <div className={styles.footerDetails}>
                    {memberDetails?.map(({ label, value }) => (
                      <div key={label}>
                        <p className={styles.title}>{label}</p>
                        <p className={styles.description}>
                          {fallbackHandler(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={styles.membersDetailsLabel}>
                    {feesAndDuesLabel}
                  </p>
                  <div className={styles.footerDetails}>
                    {feesAndDues?.map(({ label, value }) => (
                      <div key={label}>
                        <p className={styles.title}>{label}</p>
                        <p className={styles.description}>
                          $ {fallbackHandler(value, true)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
            <Col span={10} className={styles.rightSide}>
              <ActivitySection
                activities={data?.activityDetails}
                activityCount={data?.activityDetails?.length}
                refetch={refetch}
                isPending={isPending}
                isSuccess={isSuccess}
              />
            </Col>
          </Row>
        </Card>
        {isEditForm && (
          <MembersForm
            isOpen={isEditForm}
            handleModalVisibility={handleModalVisibility}
            id={id}
          />
        )}
      </ConditionalRender>
      <NewEmailModal
        selectedEmails={[selectedEmail]}
        isOpen={emailModalVisible}
        onClose={toggleEmailModal}
        selectedTemplate={selectedTemplate}
      />
      <TemplateModal
        isOpen={templateModalVisible}
        onClose={toggleTemplateModal}
        toggleEmailModal={handleEmailTemplateModal}
      />
    </>
  );
};

export default Details;
