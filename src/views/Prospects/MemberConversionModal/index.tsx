import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { MemberConversionModalProps } from "src/shared/types/prospects.type";
import { Buttons } from "src/enums/buttons.enum";
import { defaultModalWidth } from "src/constants/sharedComponents";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import Modal from "src/shared/components/Modal";
import { memberConversionModalConstants } from "./constants";

import styles from "./memberConversionModal.module.scss";

const { title, description } = memberConversionModalConstants;

const MemberConversionModal = (props: MemberConversionModalProps) => {
  const { onClose, visible, memberName } = props;

  const { id = "" } = useParams();
  const { convertToMember } = ProspectsService();

  const { mutateAsync } = useMutation(convertToMember());

  const handleConvertToMember = () =>
    mutateAsync(id, {
      onSuccess: onClose,
    });

  return (
    <Modal
      rootClassName={styles.memberModal}
      closeModal={onClose}
      visible={visible}
      onCancel={onClose}
      centered
      title={title}
      width={defaultModalWidth}
      okText={Buttons.YES_CONVERT}
      handleOk={handleConvertToMember}
      cancelButtonProps={{
        className: "d-none",
      }}
    >
      <div className={styles.description}>{description(memberName)}</div>
    </Modal>
  );
};

export default MemberConversionModal;
