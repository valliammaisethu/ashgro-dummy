import React from "react";
import { Row } from "antd";
import { IconCircleClose } from "obra-icons-react";

import logo from "src/assets/images/logo.webp";
import { imageAlts } from "src/constants/imageAlts";
import { Colors } from "src/enums/colors.enum";
import { LEAD_FORM_CONSTANTS } from "../constants";

import styles from "../leadForm.module.scss";

const { LINK_NOT_WORKING, FORM_DISABLED_MESSAGE } = LEAD_FORM_CONSTANTS;

const FormDisabled = () => {
  return (
    <>
      <Row className={styles.logoContainer}>
        <img
          src={logo}
          alt={imageAlts.ashgroLogo}
          className={styles.ashgrowlogo}
        />
      </Row>
      <Row className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <IconCircleClose
            size={64}
            color={Colors.ASHGRO_NAVY}
            strokeWidth={1.5}
          />
          <h2 className={styles.errorTitle}>{LINK_NOT_WORKING}</h2>
          <p className={styles.errorMessage}>{FORM_DISABLED_MESSAGE}</p>
        </div>
      </Row>
    </>
  );
};

export default FormDisabled;
