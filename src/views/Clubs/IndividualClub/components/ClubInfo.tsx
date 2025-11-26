import React from "react";
import { IconCall, IconEmail, IconLocationMarker } from "obra-icons-react";
import { useQuery } from "@tanstack/react-query";

import { AttachmentService } from "src/services/AttachmentService/attachment.service";
import { formatDate } from "src/shared/utils/dateUtils";
import { ClubInfoProps } from "src/shared/types/clubs.type";
import IconText from "src/shared/components/atoms/IconText";
import { CLUB_LABELS } from "../constants";
import { Colors } from "src/enums/colors.enum";
import { DateFormats } from "src/enums/dateFormats.enum";

import styles from "../individualClub.module.scss";
import { fallbackHandler } from "src/shared/utils/commonHelpers";

const ClubInfo: React.FC<ClubInfoProps> = ({ data }) => {
  const {
    name,
    numberOfMembers,
    address,
    contactNumber,
    onboardingDate,
    email,
    attachmentId,
  } = data || {};

  const { getAttachmentPreview } = AttachmentService();

  const { data: attachmentPreview } = useQuery(
    getAttachmentPreview(attachmentId),
  );

  return (
    <div className={styles.top}>
      <div className={styles.left}>
        <img src={attachmentPreview} className={styles.clubImage} alt={name} />
      </div>
      <div className={styles.right}>
        <div className={styles.nameContainer}>
          <div className={styles.name}>{name}</div>
          <div className={styles.memberBadge}>
            {numberOfMembers} {CLUB_LABELS.members}
          </div>
        </div>
        <div className={styles.details}>
          <span className={styles.dateTitle}>{CLUB_LABELS.onBoardedDate}</span>
          <span className={styles.date}>
            {fallbackHandler(
              formatDate(onboardingDate, DateFormats.DD_MMM__YYYY),
            )}
          </span>
        </div>
        <div className={styles.contactInfo}>
          <IconText
            icon={<IconLocationMarker color={Colors.ASHGRO_GOLD} size={20} />}
            text={address}
            className={styles.address}
          />
        </div>
        <div className={styles.contactInfo}>
          <IconText
            icon={<IconEmail color={Colors.ASHGRO_GOLD} size={20} />}
            text={email}
            className={styles.mail}
          />
          {contactNumber && (
            <IconText
              icon={<IconCall color={Colors.ASHGRO_GOLD} size={20} />}
              text={contactNumber}
              className={styles.phone}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubInfo;
