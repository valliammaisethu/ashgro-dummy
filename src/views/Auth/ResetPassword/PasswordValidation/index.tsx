import React from "react";
import { passwordCriteriaMap, passwordConstraintContent } from "../constants";
import styles from "../resetPassword.module.scss";
import { IconCheck, IconClose } from "obra-icons-react";
import { Colors } from "src/enums/colors.enum";

export interface PasswordValidationProps {
  password?: string;
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
  password = "",
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
                  <IconCheck
                    color={Colors.TICK_COLOR}
                    size={14}
                    strokeWidth={1.25}
                  />
                ) : (
                  <IconClose
                    color={Colors.ERROR_NOTIFICATION}
                    size={14}
                    strokeWidth={1.25}
                  />
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
