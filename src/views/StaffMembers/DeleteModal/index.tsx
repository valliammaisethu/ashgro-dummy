import React from "react";
import { generatePath } from "react-router-dom";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Buttons } from "src/enums/buttons.enum";
import { defaultModalWidth } from "src/constants/sharedComponents";
import { deleteModalConstants } from "../constants";
import { replaceString } from "src/shared/utils/commonHelpers";
import { StaffMemberDetails } from "src/models/staffMember.model";
import { getFullName } from "src/shared/utils/helpers";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { deleteStaffMessages } from "src/constants/notificationMessages";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";

import styles from "./deleteModal.module.scss";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import { CommonService } from "src/services/CommonService.ts/common.service";
import useRedirect from "src/shared/hooks/useRedirect";

interface DeleteModalProps {
  visible: boolean;
  toggleVisibility: () => void;
  staffMember?: StaffMemberDetails;
}

const DeleteModal = (props: DeleteModalProps) => {
  const { visible, toggleVisibility, staffMember } = props;
  const queryClient = useQueryClient();
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;
  const { navigateToStaffMemberList } = useRedirect();
  const { deleteResource: deleteStaffMember } = CommonService();

  const { mutateAsync, isPending } = useMutation(deleteStaffMember());

  const handleDelete = async () => {
    const { title, description } = deleteStaffMessages;
    const path = generatePath(ApiRoutes.STAFF_MEMBER_DETAILS, {
      id: staffMember?.id,
    });

    await mutateAsync(
      { path, title, description },
      {
        onSuccess: () => {
          queryClient.refetchQueries({
            queryKey: [QueryKeys.GET_STAFF_MEMBER_LIST, clubId],
          });
          toggleVisibility();
          navigateToStaffMemberList();
        },
      },
    );
  };

  return (
    <div>
      <Modal
        title={deleteModalConstants.title}
        visible={visible}
        width={defaultModalWidth}
        centered
        closeModal={toggleVisibility}
        rootClassName={styles.deleteModal}
        footer={[
          <div className={styles.footer} key={Buttons.DELETE_PERMANENTLY}>
            <Button
              onClick={handleDelete}
              loading={isPending}
              className={styles.deleteButton}
            >
              {Buttons.DELETE_PERMANENTLY}
            </Button>
          </div>,
        ]}
      >
        {replaceString(
          deleteModalConstants.description,
          getFullName(staffMember?.firstName, staffMember?.lastName),
        )}
      </Modal>
    </div>
  );
};

export default DeleteModal;
