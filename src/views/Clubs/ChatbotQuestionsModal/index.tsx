import React, { useEffect, useState } from "react";
import Modal from "src/shared/components/Modal";
import UploadArea from "src/shared/components/UploadArea";

import styles from "./chatbotQuestionsModal.module.scss";
import { chatbotQuestionModalTitle } from "./constants";
import { Buttons } from "src/enums/buttons.enum";
import { ClubService } from "src/services/ClubService/club.service";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface ChatbotQuestionsModalProps {
  open: boolean;
  onClose: () => void;
  existingFileS3Key?: string;
  existingFileName?: string;
}

const ChatbotQuestionsModal: React.FC<ChatbotQuestionsModalProps> = ({
  open,
  onClose,
  existingFileS3Key,
  existingFileName,
}) => {
  const { uploadKnowledgeBase } = ClubService();
  const { id = "" } = useParams();
  const { mutateAsync: uploadFileMutate, isPending: isUploading } = useMutation(
    uploadKnowledgeBase(),
  );

  const [uploadedFileId, setUploadedFileId] = useState<string>();

  useEffect(() => {
    if (open && existingFileS3Key) {
      setUploadedFileId(existingFileS3Key);
    }
  }, [open, existingFileS3Key]);

  const handleFileUploaded = (fileId: string) => setUploadedFileId(fileId);

  const handleClose = () => {
    setUploadedFileId("");
    onClose();
  };

  const handleUpload = async () =>
    await uploadFileMutate(
      {
        attachmentId: uploadedFileId,
        clubId: id,
      },
      {
        onSuccess: handleClose,
      },
    );

  return (
    <Modal
      visible={open}
      closeModal={handleClose}
      title={chatbotQuestionModalTitle}
      rootClassName={styles.chatbotQuestionsModal}
      cancelButtonProps={{
        className: "d-none",
      }}
      handleOk={handleUpload}
      okText={Buttons.ADD_FILE}
      okButtonProps={{
        disabled: !uploadedFileId,
        loading: isUploading,
      }}
    >
      <UploadArea
        onFileUploaded={handleFileUploaded}
        maxSizeMB={5}
        existingFileS3Key={existingFileS3Key}
        existingFileName={existingFileName}
      />
    </Modal>
  );
};

export default ChatbotQuestionsModal;
