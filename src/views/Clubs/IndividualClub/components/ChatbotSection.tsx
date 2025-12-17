import React from "react";
import { ChatbotSectionProps } from "src/shared/types/clubs.type";

import styles from "../individualClub.module.scss";
import { IconAttachment, IconEdit } from "obra-icons-react";
import { Colors } from "src/enums/colors.enum";
import { Tooltip } from "antd";

const ChatbotSection = (props: ChatbotSectionProps) => {
  const { data, onEditKnowledgeBase } = props;

  const { knowledgeBaseName } = data || {};

  return (
    <div className={styles.chatbotSection}>
      <div className={styles.title}>Chatbot Knowledge Base</div>
      <Tooltip title={knowledgeBaseName}>
        <div className={styles.attachment}>
          <span className={styles.attachmentIcon}>
            <IconAttachment
              color={Colors.ASHGRO_GOLD}
              size={18}
              strokeWidth={1.25}
            />
          </span>
          <span className={styles.fileName}>{knowledgeBaseName}</span>
          <span className={styles.attachmentIcon} onClick={onEditKnowledgeBase}>
            <IconEdit
              size={18}
              strokeWidth={1.75}
              color={Colors.MODAL_CLOSE_ICON}
            />
          </span>
        </div>
      </Tooltip>
    </div>
  );
};

export default ChatbotSection;
