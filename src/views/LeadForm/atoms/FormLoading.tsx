import React from "react";
import { Row } from "antd";

import logo from "src/assets/images/logo.webp";
import { imageAlts } from "src/constants/imageAlts";
import Loader from "src/shared/components/Loader";

import styles from "../leadForm.module.scss";

const FormLoading = () => {
  return (
    <>
      <Row className={styles.logoContainer}>
        <img
          src={logo}
          alt={imageAlts.ashgroLogo}
          className={styles.ashgrowlogo}
        />
      </Row>
      <Row className={styles.formContainer}>
        <Loader />
      </Row>
    </>
  );
};

export default FormLoading;
