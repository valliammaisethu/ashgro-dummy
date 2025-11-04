import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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

import styles from "./details.module.scss";

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

const Details = () => {
  const { id = "" } = useParams();

  const { deleteResource } = CommonService();
  const { MembersDetails } = MembersService();

  const { data, isPending, isSuccess, isFetching } = useQuery(
    MembersDetails(id),
  );

  const { mutateAsync: deleteStaffMemberMutate } =
    useMutation(deleteResource());

  const handlDelete = async () => {
    const path = generatePath(ApiRoutes.MEMBER_DETAILS, { id });
    await deleteStaffMemberMutate(path);
  };

  const memberDetails = [
    { label: LEAD_SOURCE, value: data?.leadSource },
    { label: MEMBERSHIP_TYPE, value: data?.membershipCategory },
    { label: RESIGNATION_DATE, value: data?.resignationDate },
  ];

  const feesAndDues = [
    { label: MONTHLY_DUES, value: data?.monthlyDues },
    { label: INITIAL_FEE, value: data?.initiationFee },
  ];
  return (
    <>
      <IndividualDetailsHeader
        navigateBack={() => {}}
        onEmailClick={() => {}}
      />

      <ConditionalRender
        isPending={isPending}
        isSuccess={isSuccess}
        isFetching={isFetching}
        records={[data]}
      >
        <Card className={styles.card}>
          <Row justify={Justify.START}>
            <Col span={14} className={styles.leftSide}>
              <Row justify={Justify.END} gutter={[10, 0]}>
                <Col>
                  <Button
                    onClick={() => {}}
                    icon={<IconEdit strokeWidth={1.5} />}
                    className={styles.editButton}
                  />
                </Col>
                <Col>
                  <DeleteModal
                    title={title}
                    description={getFullName(data?.firstName, data?.lastName)}
                    onDelete={handlDelete}
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
                      {data?.joinedDate}
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
                      <IconLabel icon={IconCall} label={data?.contactNumber} />
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
                        <p className={styles.description}>{value}</p>
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
                        <p className={styles.description}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
            <Col span={10} className={styles.rightSide}>
              <ActivitySection />
            </Col>
          </Row>
        </Card>
      </ConditionalRender>
    </>
  );
};

export default Details;
