import React from "react";
import { ChatbotSectionProps } from "src/shared/types/clubs.type";

import styles from "../individualClub.module.scss";
import { IconAttachment, IconDelete, IconEdit } from "obra-icons-react";
import { Colors } from "src/enums/colors.enum";

const ChatbotSection = (props: ChatbotSectionProps) => {
  const { data, onEditKnowledgeBase } = props;

  // TODO: Get actual file name from API response
  const fileName = data?.logoUrl
    ? "Knowledge_Base_File.pdf"
    : "No file uploaded";

  return (
    <div className={styles.chatbotSection}>
      <div className={styles.title}>Chatbot Knowledge Base</div>
      <div className={styles.attachment}>
        <span className={styles.attachmentIcon}>
          <IconAttachment
            color={Colors.ASHGRO_GOLD}
            size={18}
            strokeWidth={1.25}
          />
        </span>
        <span className={styles.fileName}>{fileName}</span>
        <span className={styles.attachmentIcon} onClick={onEditKnowledgeBase}>
          <IconEdit
            size={18}
            strokeWidth={1.75}
            color={Colors.MODAL_CLOSE_ICON}
          />
        </span>
        <span className={styles.attachmentIcon} onClick={() => {}}>
          <IconDelete
            size={18}
            strokeWidth={1.75}
            color={Colors.MODAL_CLOSE_ICON}
          />
        </span>
      </div>
    </div>
  );
};

export default ChatbotSection;
