import { ReactNode } from "react";

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
