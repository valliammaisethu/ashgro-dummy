import React from "react";

import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { formatTablePhoneNumber } from "../../helpers";

import styles from "../../table.module.scss";

interface PhoneNumberLabelProps {
  phoneNumber?: string;
}

const PhoneNumberLabel = ({ phoneNumber }: PhoneNumberLabelProps) => {
  return (
    <ConditionalRenderComponent visible={!!phoneNumber} fallback={"-"}>
      <p className={styles.phoneNumberLabel}>
        {formatTablePhoneNumber(phoneNumber!)}
      </p>
    </ConditionalRenderComponent>
  );
};

export default PhoneNumberLabel;
