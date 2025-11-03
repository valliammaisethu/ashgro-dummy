import React from "react";
import {
  IconLocationMarker,
  IconCall,
  IconEdit,
  IconEmail,
} from "obra-icons-react";
import { Col, Row } from "antd";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import Card from "src/shared/components/Card";
import ConditionalRender from "src/shared/components/ConditionalRender";
import IndividualDetailsHeader from "src/shared/components/IndividualDetailsHeader";
import Button from "src/shared/components/Button";
import ImageFrame from "src/shared/components/atoms/ImageFrame";
import { StaffMembersService } from "src/services/StaffMembersService/staffMembers.service";
import { getFullName } from "src/shared/utils/helpers";
import { Colors } from "src/enums/colors.enum";
import DeleteModal from "src/shared/components/DeleteModal";
import { footerLabels } from "./constants";

import styles from "./details.module.scss";
import { Justify } from "src/enums/align.enum";

const { birthData, department, title, workAnniversary } = footerLabels;

const Details = () => {
  const { id = "" } = useParams();

  const { staffMembersDeatils, deleteStaffMember } = StaffMembersService();

  const { data, isPending, isSuccess, isFetching } = useQuery(
    staffMembersDeatils(id),
  );

  const { mutateAsync: deleteStaffMemberMutate } =
    useMutation(deleteStaffMember());

  // TODO: To use useRedirect
  // const handleNavigateBack = () => {};

  const handlEdit = () => {};

  const handlDelete = async () => {
    await deleteStaffMemberMutate(id);
  };

  const footer = [
    { label: department, value: data?.staffDepartment },
    { label: title, value: data?.title },
    { label: workAnniversary, value: data?.workAnniversaryDate },
    { label: birthData, value: data?.birthDate },
  ];

  return (
    <>
      <IndividualDetailsHeader navigateBack={() => {}} />

      <ConditionalRender
        isPending={isPending}
        isSuccess={isSuccess}
        isFetching={isFetching}
        records={[data]}
      >
        <Card className={styles.card}>
          <Row justify={Justify.END} gutter={[10, 0]}>
            <Col>
              <Button
                onClick={handlEdit}
                icon={<IconEdit strokeWidth={1.5} />}
                className={styles.editButton}
              />
            </Col>
            <Col>
              <DeleteModal
                title={"Staff Member"}
                description={getFullName(data?.firstName, data?.lastName)}
                onDelete={handlDelete}
              />
            </Col>
          </Row>

          <div className={styles.detailsContainer}>
            <div className={styles.profileContainer}>
              <ImageFrame src={data?.profilePictureUrl} />
              <p className={styles.profileName}>
                {getFullName(data?.firstName, data?.lastName)}
              </p>
              <p className={styles.staffDepartment}>{data?.staffDepartment}</p>
            </div>
            <div>
              <p className={styles.location}>
                <IconLocationMarker color={Colors.ASHGRO_GOLD} size={22} />
                {data?.residentialAddress}
              </p>
              <div className={styles.contactDetailsContainer}>
                <span className={clsx(styles.contactDetails, styles.email)}>
                  <IconEmail color={Colors.ASHGRO_GOLD} size={22} />
                  {data?.email}
                </span>
                <span className={styles.contactDetails}>
                  <IconCall color={Colors.ASHGRO_GOLD} size={22} />
                  {data?.contactNumber}
                </span>
              </div>
            </div>
            <div className={styles.footer}>
              <p className={styles.foterHeader}>Staff Details</p>
              <div className={styles.footerDetails}>
                {footer?.map(({ label, value }) => (
                  <div key={label}>
                    <p className={styles.title}>{label}</p>
                    <p className={styles.description}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </ConditionalRender>
    </>
  );
};

export default Details;
