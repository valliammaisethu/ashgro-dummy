import React from "react";

import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { formatTablePhoneNumber } from "../../helpers";
import { PhoneNumberLabelProps } from "src/shared/types/table.type";

import styles from "../../table.module.scss";

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
