import { TableProps as AntTableProps } from "antd";

import { ColumnsType } from "antd/es/table";

export interface BaseRecord {
  id?: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  email?: string;
}

export interface TableProps<T> {
  columns: ColumnsType<T>;
  dataSource?: T[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  hasData?: boolean;
  paginationClassName?: string;
  rowSelection?: AntTableProps<T>["rowSelection"];
  onRow?: AntTableProps<T>["onRow"];
  loading?: boolean;
  noDataComponent?: React.ReactNode;
  nameColWidth?: string | number;
  emailColWidth?: string | number;
  nameColTitle?: string;
}

export interface NameLabelProps {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface PhoneNumberLabelProps {
  phoneNumber?: string;
}

export interface UseTableSkeletonProps<T> {
  loading?: boolean;
  columns: ColumnsType<T>;
  dataSource: T[];
}
