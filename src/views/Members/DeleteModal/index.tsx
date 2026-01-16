import React from "react";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Buttons } from "src/enums/buttons.enum";
import { defaultModalWidth } from "src/constants/sharedComponents";
import { replaceString } from "src/shared/utils/commonHelpers";
import { deleteModalConstants } from "../constant";
import { getFullName } from "src/shared/utils/helpers";
import { Member } from "src/models/members.model";
import { CommonService } from "src/services/CommonService.ts/common.service";
import { generatePath } from "react-router-dom";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import useRedirect from "src/shared/hooks/useRedirect";

import styles from "./deleteModal.module.scss";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import { deleteMembersMessages } from "src/constants/notificationMessages";

interface DeleteModalProps {
  visible: boolean;
  toggleVisibility: () => void;
  member?: Member;
}

// TODO: Use common delete modal
const DeleteModal = (props: DeleteModalProps) => {
  const { visible, toggleVisibility, member } = props;
  const { navigateToMembers } = useRedirect();
  const queryClient = useQueryClient();
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const { deleteResource } = CommonService();

  const { mutateAsync: deleteStaffMemberMutate, isPending } =
    useMutation(deleteResource());

  const handleDelete = async () => {
    const path = generatePath(ApiRoutes.MEMBER_DETAILS, { id: member?.id });

    const name = getFullName(member?.firstName, member?.lastName);

    await deleteStaffMemberMutate(
      {
        path: path,
        title: deleteMembersMessages.title,
        description: replaceString(deleteMembersMessages.description, name),
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries({
            queryKey: [QueryKeys.GET_MEMBERS, clubId],
          });

          navigateToMembers();
          toggleVisibility();
        },
      },
    );
  };

  return (
    <div>
      <Modal
        title={"Delete Member"}
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
        <p className={styles.modalDescription}>
          {replaceString(
            deleteModalConstants.description,
            getFullName(member?.firstName, member?.lastName),
          )}
        </p>
      </Modal>
    </div>
  );
};

export default DeleteModal;
