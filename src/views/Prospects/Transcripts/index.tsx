import React from "react";
import { Avatar } from "antd";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

import Drawer from "src/shared/components/Drawer";
import ConditionalRender from "src/shared/components/ConditionalRender";
import { ProspectsService } from "src/services/ProspectsService/prospects.service";
import { formatDate } from "src/shared/utils/dateUtils";
import { getInitials } from "src/shared/utils/helpers";
import { DateFormats } from "src/enums/dateFormats.enum";
import defaultProfile from "src/assets/images/default-profile.webp";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { TRANSCRIPTS_CONSTANTS } from "./transcripts.constants";
import Loader from "src/shared/components/Loader";
import { usePaginatedQuery } from "src/shared/hooks/usePaginatedQuery";
import { useInfiniteScroll } from "src/shared/hooks/useInfiniteScroll";
import {
  TranscriptData,
  TranscriptSession,
} from "src/models/transcripts.model";
import { QueryParams } from "src/models/queryParams.model";
import { LoaderSizes } from "src/enums/LoaderSizes";
import { QueryKeys } from "src/enums/cacheEvict.enum";

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

const { GET_TRANSCRIPTS } = QueryKeys;

const Transcripts = ({ visible, onClose, userId }: TranscriptsProps) => {
  const { getTranscripts } = ProspectsService();

  const {
    items = [],
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isSuccess,
  } = usePaginatedQuery<TranscriptData, Partial<QueryParams>>({
    queryKey: [GET_TRANSCRIPTS],
    fetchPage: (pageParams) => getTranscripts(pageParams),
    params: { id: userId },
  });

  const { handleScroll } = useInfiniteScroll({
    hasNextPage,
    isFetching,
    fetchNextPage,
  });

  const allSessions = items?.flatMap((item) => item?.sessions || []);

  const { firstName, lastName, clubLogoUrl = "" } = items?.[0]?.club || {};

  return (
    <Drawer
      open={visible}
      onClose={onClose}
      title={DRAWER_TITLE}
      width={DRAWER_WIDTH}
      footer={null}
      maskClosable={false}
    >
      <ConditionalRender
        isPending={isLoading}
        isSuccess={isSuccess}
        records={allSessions}
        emptyDescription={EMPTY_DESCRIPTION}
      >
        <div className={styles.transcriptContainer} onScroll={handleScroll}>
          {allSessions?.map((session: TranscriptSession) => (
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
                      <Avatar
                        size={AVATAR_SIZE}
                        className={styles.botMsg}
                        src={clubLogoUrl}
                      >
                        {getInitials(firstName, lastName)}
                      </Avatar>
                    </ConditionalRenderComponent>

                    <div className={styles.messageContent}>
                      <div
                        className={clsx(styles.messageBubble, {
                          [styles.userBubble]: !isUser,
                          [styles.botBubble]: isUser,
                        })}
                      >
                        <p>
                          <ReactMarkdown
                            components={{
                              ul: ({ children }) => (
                                <ul className={styles.messageList}>
                                  {children}
                                </ul>
                              ),
                            }}
                          >
                            {message}
                          </ReactMarkdown>
                        </p>
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
          <Loader loading={isFetching && !isLoading} size={LoaderSizes.SMALL} />
        </div>
      </ConditionalRender>
    </Drawer>
  );
};

export default Transcripts;
