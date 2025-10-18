import { ReactNode } from "react";

interface SingleRoute {
  path?: string;
  component?: ReactNode;
  children?: SingleRoute[];
  index?: boolean;
  hideTopBar?: boolean;
}

export interface RouterProps {
  path: string;
  component: ReactNode;
  children?: SingleRoute[];
  hideTopBar?: boolean;
}
