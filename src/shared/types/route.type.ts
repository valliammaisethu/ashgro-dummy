import { ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";

interface SingleRoute {
  path?: string;
  component?: ReactNode;
  children?: SingleRoute[];
  index?: boolean;
}

export interface RouterProps {
  path: string;
  component: ReactNode;
  children?: SingleRoute[];
}

export interface NavigateToSelectedMonth {
  navigate: NavigateFunction;
  pathname: string;
  query: object;
  date: Date;
}
