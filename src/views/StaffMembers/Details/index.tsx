import React, { useState } from "react";
import { IconCall, IconEdit, IconEmail, IconDelete } from "obra-icons-react";
import { Col, Row } from "antd";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TextTooltip from "src/shared/components/atoms/TextTooltip";

import Card from "src/shared/components/Card";
import ConditionalRender from "src/shared/components/ConditionalRender";
import IndividualDetailsHeader from "src/shared/components/IndividualDetailsHeader";
import Button from "src/shared/components/Button";
import ImageFrame from "src/shared/components/atoms/ImageFrame";
import IconLabel from "src/shared/components/atoms/IconLabel";
import { StaffMembersService } from "src/services/StaffMembersService/staffMembers.service";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { getFullName } from "src/shared/utils/helpers";
import { formatDateValue } from "src/shared/utils/dateUtils";
import { Colors } from "src/enums/colors.enum";
import { footerLabels } from "./constants";
import { Justify } from "src/enums/align.enum";
import StaffMembersForm from "../StaffMembersForm";
import DeleteModal from "../DeleteModal";
import useRedirect from "src/shared/hooks/useRedirect";
import { fallbackHandler } from "src/shared/utils/commonHelpers";

import styles from "./details.module.scss";

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
    {
      label: workAnniversary,
      value: formatDateValue(data?.workAnniversaryDate),
    },
    { label: birthData, value: formatDateValue(data?.birthDate) },
  ];

  const handleModalVisibility = () => setIsEditForm((prev) => !prev);

  const handleDeleteForm = () => setDeleteStaff((prev) => !prev);

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
          </Row>

          <div className={styles.detailsContainer}>
            <div className={styles.profileContainer}>
              <ImageFrame src={data?.profilePictureUrl} />
              <TextTooltip
                text={getFullName(data?.firstName, data?.lastName)}
                className={styles.profileName}
              />
            </div>
            <div>
              <div className={styles.contactDetailsContainer}>
                <IconLabel
                  icon={IconEmail}
                  label={data?.email}
                  color={Colors.ASHGRO_GOLD}
                  size={22}
                  className={clsx(
                    styles.contactDetails,
                    styles.email,
                    styles.removeMargin,
                  )}
                  isEmail
                />
                <IconLabel
                  icon={IconCall}
                  label={
                    data?.contactNumber ? `+1 ${data?.contactNumber}` : "-"
                  }
                  color={Colors.ASHGRO_GOLD}
                  size={22}
                  className={clsx(styles.contactDetails, styles.removeMargin)}
                />
              </div>
            </div>
            <div className={styles.footer}>
              <p className={styles.foterHeader}>Staff Details</p>
              <div className={styles.footerDetails}>
                {footer?.map(({ label, value }) => (
                  <div key={label}>
                    <p className={styles.title}>{label}</p>
                    <TextTooltip
                      className={styles.description}
                      text={fallbackHandler(value)}
                    />
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
        <ConditionalRenderComponent visible={deleteStaff} hideFallback>
          <DeleteModal
            visible={deleteStaff}
            toggleVisibility={handleDeleteForm}
            staffMember={data}
          />
        </ConditionalRenderComponent>
      </ConditionalRender>
    </>
  );
};

export default Details;
