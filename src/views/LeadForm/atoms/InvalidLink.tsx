import React from "react";
import { Row } from "antd";

import logo from "src/assets/images/logo.webp";
import invalidLogo from "src/assets/images/lead-forms.webp";
import { imageAlts } from "src/constants/imageAlts";
import { LEAD_FORM_CONSTANTS } from "../constants";

import styles from "../leadForm.module.scss";

const { OOPS, INVALID_LINK } = LEAD_FORM_CONSTANTS;

const InvalidLink = () => {
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
          <img
            src={invalidLogo}
            alt={imageAlts.leadForm}
            className={styles.leadFormDisabled}
          />
          <h2 className={styles.errorTitle}>{OOPS}</h2>
          <p className={styles.errorMessage}>{INVALID_LINK}</p>
        </div>
      </Row>
    </>
  );
};

export default InvalidLink;
