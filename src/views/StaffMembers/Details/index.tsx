import React, { useState } from "react";
import {
  IconLocationMarker,
  IconCall,
  IconEdit,
  IconEmail,
} from "obra-icons-react";
import { Col, Row } from "antd";
import clsx from "clsx";
import { generatePath, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
import { Justify } from "src/enums/align.enum";
import StaffMembersForm from "../StaffMembersForm";
import useRedirect from "src/shared/hooks/useRedirect";
import { fallbackHandler } from "src/shared/utils/commonHelpers";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { CommonService } from "src/services/CommonService.ts/common.service";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { QueryKeys } from "src/enums/cacheEvict.enum";

import styles from "./details.module.scss";

const { birthData, department, title, workAnniversary } = footerLabels;

const Details = () => {
  const { id = "" } = useParams();
  const queryClient = useQueryClient();
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const [isEditForm, setIsEditForm] = useState(false);

  const { navigateToStaffMemberList } = useRedirect();

  const { staffMembersDeatils } = StaffMembersService();

  const { data, isPending, isSuccess, isFetching } = useQuery(
    staffMembersDeatils(id),
  );

  const { deleteResource } = CommonService();

  const { mutateAsync, isPending: isDeletingPending } =
    useMutation(deleteResource());

  // TODO: To reduce redundancy
  const handleDelete = async () => {
    const path = generatePath(ApiRoutes.STAFF_MEMBER_DETAILS, { id });

    await mutateAsync(path, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: [QueryKeys.GET_STAFF_MEMBER_LIST, clubId],
        });

        navigateToStaffMemberList();
      },
    });
  };

  const footer = [
    { label: department, value: data?.staffDepartment },
    { label: title, value: data?.title },
    { label: workAnniversary, value: data?.workAnniversaryDate },
    { label: birthData, value: data?.birthDate },
  ];

  const handleModalVisibility = () => setIsEditForm((prev) => !prev);

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
              <DeleteModal
                title={"Staff Member"}
                description={getFullName(data?.firstName, data?.lastName)}
                onDelete={handleDelete}
                loading={isDeletingPending}
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
      </ConditionalRender>
    </>
  );
};

export default Details;
