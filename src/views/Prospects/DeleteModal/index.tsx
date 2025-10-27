import React from "react";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import { useMutation } from "@tanstack/react-query";
import { Buttons } from "src/enums/buttons.enum";
import {
  deleteProspectDescription,
  deleteProspectTitle,
} from "../Listing/constants";

import styles from "../Listing/Components/ProspectRow/prospectRow.module.scss";

interface DeleteModalProps {
  visible: boolean;
  toggleVisibility: () => void;
  id: string;
}

const DeleteModal = (props: DeleteModalProps) => {
  const { visible, toggleVisibility, id } = props;

  const { deleteProspect } = ProspectsService();

  const { mutateAsync } = useMutation(deleteProspect());

  const handleDelete = () =>
    mutateAsync(id, {
      onSuccess: toggleVisibility,
    });

  return (
    <div>
      <Modal
        title={deleteProspectTitle}
        visible={visible}
        closeModal={toggleVisibility}
        rootClassName={styles.deleteModal}
        footer={[
          <div className={styles.footer} key={Buttons.DELETE_PERMANENTLY}>
            <Button onClick={handleDelete} className={styles.deleteButton}>
              {Buttons.DELETE_PERMANENTLY}
            </Button>
          </div>,
        ]}
      >
        {deleteProspectDescription}
      </Modal>
    </div>
  );
};

export default DeleteModal;
