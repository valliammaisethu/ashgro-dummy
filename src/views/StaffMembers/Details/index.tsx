import React, { useState } from "react";
import {
  IconLocationMarker,
  IconCall,
  IconEdit,
  IconEmail,
  IconDelete,
} from "obra-icons-react";
import { Col, Row } from "antd";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Card from "src/shared/components/Card";
import ConditionalRender from "src/shared/components/ConditionalRender";
import IndividualDetailsHeader from "src/shared/components/IndividualDetailsHeader";
import Button from "src/shared/components/Button";
import ImageFrame from "src/shared/components/atoms/ImageFrame";
import { StaffMembersService } from "src/services/StaffMembersService/staffMembers.service";
import { getFullName } from "src/shared/utils/helpers";
import { Colors } from "src/enums/colors.enum";
import { footerLabels } from "./constants";
import { Justify } from "src/enums/align.enum";
import StaffMembersForm from "../StaffMembersForm";
import useRedirect from "src/shared/hooks/useRedirect";
import { fallbackHandler } from "src/shared/utils/commonHelpers";

import styles from "./details.module.scss";
import DeleteModal from "../DeleteModal";
import useDrawer from "src/shared/hooks/useDrawer";

const { birthData, department, title, workAnniversary } = footerLabels;

const Details = () => {
  const { id = "" } = useParams();

  const [isEditForm, setIsEditForm] = useState(false);

  const [deleteStaff, setDeleteStaff] = useState(false);

  const { navigateToStaffMemberList } = useRedirect();

  const { staffMembersDeatils } = StaffMembersService();

  const { data, isPending, isSuccess, isFetching } = useQuery(
    staffMembersDeatils(id),
  );

  const footer = [
    { label: department, value: data?.staffDepartment },
    { label: title, value: data?.title },
    { label: workAnniversary, value: data?.workAnniversaryDate },
    { label: birthData, value: data?.birthDate },
  ];

  const handleModalVisibility = () => setIsEditForm((prev) => !prev);

  const handleDeleteForm = () => setDeleteStaff((prev) => !prev);

  const { toggleVisibility, visible } = useDrawer();

  return (
    <>
      <IndividualDetailsHeader navigateBack={navigateToStaffMemberList} />

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
                onClick={handleModalVisibility}
                icon={<IconEdit strokeWidth={1.5} />}
                className={styles.editButton}
              />
            </Col>
            <Col>
              <Button
                onClick={handleDeleteForm}
                icon={<IconDelete strokeWidth={1.5} />}
                className={styles.editButton}
              />
            </Col>
            <DeleteModal
              visible={visible}
              toggleVisibility={toggleVisibility}
              staffMember={data}
            />
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
                {fallbackHandler(data?.residentialAddress)}
              </p>
              <div className={styles.contactDetailsContainer}>
                <span className={clsx(styles.contactDetails, styles.email)}>
                  <IconEmail color={Colors.ASHGRO_GOLD} size={22} />
                  {data?.email}
                </span>
                <span className={styles.contactDetails}>
                  <IconCall color={Colors.ASHGRO_GOLD} size={22} />
                  {data?.contactNumber ? `+1 ${data?.contactNumber}` : "-"}
                  {/* to add +1 fallback here */}
                </span>
              </div>
            </div>
            <div className={styles.footer}>
              <p className={styles.foterHeader}>Staff Details</p>
              <div className={styles.footerDetails}>
                {footer?.map(({ label, value }) => (
                  <div key={label}>
                    <p className={styles.title}>{label}</p>
                    <p className={styles.description}>
                      {fallbackHandler(value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        {isEditForm && (
          <StaffMembersForm
            isOpen={isEditForm}
            handleModalVisibility={handleModalVisibility}
            id={id}
          />
        )}
        {deleteStaff && (
          <DeleteModal
            visible={deleteStaff}
            toggleVisibility={handleDeleteForm}
            staffMember={data}
          />
        )}
      </ConditionalRender>
    </>
  );
};

export default Details;
