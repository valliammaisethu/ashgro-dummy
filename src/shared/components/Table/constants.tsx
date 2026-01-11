import React from "react";
import { ColumnsType } from "antd/es/table";
import NameLabel from "./atoms/NameLabel";

import styles from "./table.module.scss";

export const commonColumns: ColumnsType = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "15%",
    render: (_, record) => (
      <NameLabel
        firstName={record?.firstName}
        lastName={record?.lastName}
        avatarUrl={record?.profilePictureUrl}
      />
    ),
  },
  {
    title: "Email Address",
    dataIndex: "email",
    key: "email",
    width: "20%",
    render: (_, record) => <p className={styles.emailLabel}>{record?.email}</p>,
  },
];

export const defaultTableProps = {
  rowKey: "id",
  tableLayout: "fixed",
  pagination: false,
  scroll: { x: "100%", y: "calc(100vh - 28rem)" },
} as const;
