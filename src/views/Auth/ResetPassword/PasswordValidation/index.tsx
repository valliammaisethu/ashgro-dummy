import React from "react";
import { Icons } from "src/enums/icons.enum";
import { passwordCriteriaMap, passwordConstraintContent } from "../constants";
import styles from "../resetPassword.module.scss";

export interface PasswordValidationProps {
  password: string;
}

const getMatchedCriteria = (password: string): string[] => {
  const trimmedPassword = password.trim();
  if (!trimmedPassword) {
    return [];
  }

  return Object.entries(passwordCriteriaMap)
    .filter(([, regex]) => regex.test(trimmedPassword))
    .map(([key]) => key);
};

const PasswordValidation: React.FC<PasswordValidationProps> = ({
  password,
}) => {
  const matchedCriteria = getMatchedCriteria(password);
  const hasPasswordInput = password && password.trim() !== "";
  const isMatched = (name: string) => matchedCriteria.includes(name);

  return (
    <div className={styles.passwordCriteriaContainer}>
      {passwordConstraintContent?.map((child) => {
        const criteriaClass = hasPasswordInput
          ? isMatched(child.name)
            ? styles.passwordCriteriaMatched
            : styles.passwordCriteriaUnmatched
          : styles.passwordCriteria;

        return (
          <div key={child.id} className={criteriaClass}>
            {password && (
              <span className={styles.criteriaIcon}>
                {isMatched(child.name) ? (
                  <i className={Icons.CHECK_LINE}></i>
                ) : (
                  <i className={Icons.CLOSE_FILL}></i>
                )}
              </span>
            )}
            {child.message}
          </div>
        );
      })}
    </div>
  );
};

export default PasswordValidation;
