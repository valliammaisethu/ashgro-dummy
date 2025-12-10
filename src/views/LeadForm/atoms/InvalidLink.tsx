import React from "react";
import { Row } from "antd";

import logo from "src/assets/images/logo.webp";
import { imageAlts } from "src/constants/imageAlts";
import { LEAD_FORM_CONSTANTS } from "../constants";

import styles from "../leadForm.module.scss";

const InvalidLink = () => {
  return (
    <>
      <Row className={styles.logoContainer}></Row>
      <Row className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <img
            src={logo}
            alt={imageAlts.ashgroLogo}
            className={styles.ashgrowlogo}
          />
          <p className={styles.errorMessage}>
            {LEAD_FORM_CONSTANTS.INVALID_LINK}
          </p>
        </div>
      </Row>
    </>
  );
};

export default InvalidLink;
