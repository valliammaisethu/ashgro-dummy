import React, { useState } from "react";
import Modal from "src/shared/components/Modal";
import UploadArea from "src/shared/components/UploadArea";

import styles from "./chatbotQuestionsModal.module.scss";
import { chatbotQuestionModalTitle } from "./constants";
import { Buttons } from "src/enums/buttons.enum";

interface ChatbotQuestionsModalProps {
  open: boolean;
  onClose: () => void;
}

const ChatbotQuestionsModal: React.FC<ChatbotQuestionsModalProps> = ({
  open,
  onClose,
}) => {
  const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);

  const handleFileUploaded = (fileId: string) => setUploadedFileId(fileId);

  const handleClose = () => {
    setUploadedFileId(null);
    onClose();
  };

  return (
    <Modal
      visible={open}
      closeModal={handleClose}
      title={chatbotQuestionModalTitle}
      rootClassName={styles.chatbotQuestionsModal}
      cancelButtonProps={{
        className: "d-none",
      }}
      okText={Buttons.ADD_FILE}
      okButtonProps={{
        disabled: !uploadedFileId,
      }}
    >
      <UploadArea onFileUploaded={handleFileUploaded} maxSizeMB={5} />
    </Modal>
  );
};

export default ChatbotQuestionsModal;
