import React from "react";

import styles from "../../individualClub.module.scss";

interface IconTextProps {
  icon: React.ReactNode;
  text?: string;
  className?: string;
}

const IconText: React.FC<IconTextProps> = ({ icon, text = "", className }) => {
  return (
    <div className={styles.iconContainer}>
      {icon}
      <span className={className}>{text}</span>
    </div>
  );
};

export default IconText;
