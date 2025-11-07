import React, { FC } from "react";
import { IconChevronLeft, IconChevronRight } from "obra-icons-react";
import clsx from "clsx";

import { PaginationDirection } from "src/enums/paginationDirection.enum";
import Button from "src/shared/components/Button";

import styles from "./pagination.module.scss";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  className?: string;
  hasData?: boolean;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  hasData = true,
}) => {
  if (!hasData || totalPages <= 1) return null;

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const handlePageChange = (direction: PaginationDirection) => {
    let newPage = currentPage;

    if (direction === PaginationDirection.PREV && currentPage > 1) {
      newPage = currentPage - 1;
    } else if (
      direction === PaginationDirection.NEXT &&
      currentPage < totalPages
    ) {
      newPage = currentPage + 1;
    }

    if (newPage !== currentPage) onPageChange(newPage);
  };

  return (
    <div className={clsx(styles.paginationContainer, className)}>
      <Button
        className={styles.prevButton}
        disabled={isPrevDisabled}
        onClick={() => handlePageChange(PaginationDirection.PREV)}
        icon={<IconChevronLeft size={20} />}
      />
      <div className={styles.textContainer}>
        Page
        <span className={styles.active}>{currentPage}</span>
        of
        <span className={styles.end}>{totalPages}</span>
      </div>
      <Button
        className={styles.nextButton}
        onClick={() => handlePageChange(PaginationDirection.NEXT)}
        disabled={isNextDisabled}
        icon={<IconChevronRight size={20} />}
      />
    </div>
  );
};

export default Pagination;
