import React from "react";
import { CheckboxChangeEvent } from "antd";

import { getFullName } from "src/shared/utils/helpers";
import Checkbox from "src/shared/components/Checkbox";
import AvatarFallback from "src/shared/components/AvatarFallback";
import { stopPropagation } from "src/shared/utils/eventUtils";

import styles from "./profile.module.scss";

interface ProfileProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  profilePictureUrl?: string;
  onSelectChange?: (checked: boolean) => void;
  contactNumber?: string;
  showCheckbox?: boolean;
  isSelected?: boolean;
}

const Profile: React.FC<ProfileProps> = ({
  firstName,
  lastName,
  email,
  address,
  profilePictureUrl,
  showCheckbox,
  isSelected,
  contactNumber,
  onSelectChange,
}) => {
  const handleCheckboxChange = (e?: CheckboxChangeEvent) => {
    e?.stopPropagation();
    onSelectChange?.(e?.target.checked ?? false);
  };

  return (
    <div className={styles.profileRow}>
      <div className={styles.profileInfo}>
        {showCheckbox && (
          <div className={styles.checkboxCol} onClick={stopPropagation}>
            <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
          </div>
        )}
        <AvatarFallback
          src={profilePictureUrl}
          name={getFullName(firstName, lastName)}
          size={40}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <p className={styles.name}>{getFullName(firstName, lastName)}</p>
          <div className={styles.contactInfo}>
            {email && <p className={styles.email}>{email}</p>}
            {address && <p className={styles.address}>{address}</p>}
            {contactNumber && (
              <div className={styles.contactNumber}>
                <span className={styles.phone}>{contactNumber}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
