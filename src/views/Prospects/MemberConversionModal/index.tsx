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
import useRedirect from "src/shared/hooks/useRedirect";

const { title, description } = memberConversionModalConstants;

const MemberConversionModal = (props: MemberConversionModalProps) => {
  const { onClose, visible, memberName } = props;
  const { navigateToProspects } = useRedirect();
  const { id = "" } = useParams();
  const { convertToMember } = ProspectsService();

  const { mutateAsync, isPending } = useMutation(convertToMember());

  const handleConvertToMember = () =>
    mutateAsync(id, {
      onSuccess: () => {
        onClose();
        navigateToProspects();
      },
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
      okButtonProps={{
        loading: isPending,
      }}
      cancelButtonProps={{
        className: "d-none",
      }}
    >
      <div className={styles.description}>{description(memberName)}</div>
    </Modal>
  );
};

export default MemberConversionModal;
