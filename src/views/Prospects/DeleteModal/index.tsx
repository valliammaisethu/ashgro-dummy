import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import useRedirect from "src/shared/hooks/useRedirect";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import { Buttons } from "src/enums/buttons.enum";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import { defaultModalWidth } from "src/constants/sharedComponents";
import {
  deleteProspectDescription,
  deleteProspectTitle,
} from "../Listing/constants";

import styles from "../Listing/Components/ProspectRow/prospectRow.module.scss";
import { renderNotification } from "src/shared/utils/renderNotification";
import { deleteProspectMessages } from "src/constants/notificationMessages";
import { NotificationTypes } from "src/enums/notificationTypes";
import { replaceString } from "src/shared/utils/commonHelpers";

interface DeleteModalProps {
  visible: boolean;
  toggleVisibility: () => void;
  id: string;
  prospectName: string;
}

const DeleteModal = (props: DeleteModalProps) => {
  const { visible, toggleVisibility, id, prospectName } = props;
  const { navigateToProspects } = useRedirect();
  const { deleteProspect } = ProspectsService();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteMutate, isPending } =
    useMutation(deleteProspect());

  const handleDelete = async () =>
    await deleteMutate(id, {
      onSuccess: () => {
        const { title, description } = deleteProspectMessages;

        renderNotification(
          title,
          replaceString(description, prospectName),
          NotificationTypes.ERROR,
        );
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_PROSPECTS] });
        toggleVisibility();
        navigateToProspects();
      },
    });

  return (
    <Modal
      title={deleteProspectTitle}
      visible={visible}
      width={defaultModalWidth}
      centered
      closeModal={toggleVisibility}
      rootClassName={styles.deleteModal}
      footer={[
        <div className={styles.footer} key={Buttons.DELETE_PERMANENTLY}>
          <Button
            loading={isPending}
            onClick={handleDelete}
            className={styles.deleteButton}
          >
            {Buttons.DELETE_PERMANENTLY}
          </Button>
        </div>,
      ]}
    >
      <span className={styles.deleteModalDescription}>
        {deleteProspectDescription(prospectName)}
      </span>
    </Modal>
  );
};

export default DeleteModal;
