import React from "react";

import Modal from "src/shared/components/Modal";
import Button from "src/shared/components/Button";
import { useMutation } from "@tanstack/react-query";
import { Buttons } from "src/enums/buttons.enum";
import { defaultModalWidth } from "src/constants/sharedComponents";
import { StaffMembersService } from "src/services/StaffMembersService/staffMembers.service";
import { deleteModalConstants } from "../constants";
import { replaceString } from "src/shared/utils/commonHelpers";
import { StaffMemberDetails } from "src/models/staffMember.model";
import { getFullName } from "src/shared/utils/helpers";

import styles from "./deleteModal.module.scss";

interface DeleteModalProps {
  visible: boolean;
  toggleVisibility: () => void;
  staffMember?: StaffMemberDetails;
}

const DeleteModal = (props: DeleteModalProps) => {
  const { visible, toggleVisibility, staffMember } = props;

  const { deleteStaffMember } = StaffMembersService();

  const { mutateAsync } = useMutation(deleteStaffMember());

  const handleDelete = async () =>
    await mutateAsync(staffMember?.id, {
      onSuccess: toggleVisibility,
    });

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
            <Button onClick={handleDelete} className={styles.deleteButton}>
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
