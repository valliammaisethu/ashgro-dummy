import React from "react";
import { CardProps } from "src/shared/types/sharedComponents.type";
import styles from "./card.module.scss";
import clsx from "clsx";

const Card = (props: CardProps) => {
  const { children, className } = props;
  return <div className={clsx(styles.card, className)}>{children}</div>;
};

export default Card;
