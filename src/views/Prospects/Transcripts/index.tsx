import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "antd";
import clsx from "clsx";

import Drawer from "src/shared/components/Drawer";
import ConditionalRender from "src/shared/components/ConditionalRender";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import { formatDate } from "src/shared/utils/dateUtils";
import { DateFormats } from "src/enums/dateFormats.enum";
import defaultProfile from "src/assets/images/default-profile.webp";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { TRANSCRIPTS_CONSTANTS } from "./transcripts.constants";

import styles from "./transcripts.module.scss";

interface TranscriptsProps {
  visible: boolean;
  onClose: () => void;
  userId: string;
}

const {
  AVATAR_SIZE,
  DRAWER_TITLE,
  DRAWER_WIDTH,
  EMPTY_DESCRIPTION,
  PROFILE_ALT_TEXT,
} = TRANSCRIPTS_CONSTANTS;

const Transcripts = ({ visible, onClose, userId }: TranscriptsProps) => {
  const { getTranscripts } = ProspectsService();

  const { data, isLoading, isSuccess } = useQuery({
    ...getTranscripts(userId),
    enabled: visible && !!userId,
  });

  return (
    <Drawer
      open={visible}
      onClose={onClose}
      title={DRAWER_TITLE}
      width={DRAWER_WIDTH}
      footer={null}
    >
      <ConditionalRender
        isPending={isLoading}
        isSuccess={isSuccess}
        records={data?.sessions}
        emptyDescription={EMPTY_DESCRIPTION}
      >
        <div className={styles.transcriptContainer}>
          {data?.sessions?.map((session) => (
            <div key={session.id} className={styles.sessionContainer}>
              {session?.conversations?.map(
                ({ id, isUser, message, createdAt }) => (
                  <div
                    key={id}
                    className={clsx(styles.messageRow, {
                      [styles.userRow]: !isUser,
                      [styles.botRow]: isUser,
                    })}
                  >
                    <ConditionalRenderComponent visible={!isUser} hideFallback>
                      <Avatar size={AVATAR_SIZE} className={styles.botMsg}>
                        {/* TODO: To check with BE to send first name and last name */}
                        {data?.club?.clubName}
                      </Avatar>
                    </ConditionalRenderComponent>

                    <div className={styles.messageContent}>
                      <div
                        className={clsx(styles.messageBubble, {
                          [styles.userBubble]: !isUser,
                          [styles.botBubble]: isUser,
                        })}
                      >
                        {message}
                      </div>
                      <span className={styles.timestamp}>
                        {formatDate(createdAt, DateFormats.HH_MM_A)}
                      </span>
                    </div>

                    <ConditionalRenderComponent visible={isUser} hideFallback>
                      <img
                        src={defaultProfile}
                        className={styles.messageAvatar}
                        alt={PROFILE_ALT_TEXT}
                      />
                    </ConditionalRenderComponent>
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
      </ConditionalRender>
    </Drawer>
  );
};

export default Transcripts;
