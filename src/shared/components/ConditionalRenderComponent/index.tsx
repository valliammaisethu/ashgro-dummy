import React, { PropsWithChildren, ReactNode } from "react";
import Loader from "../Loader";
import { LoaderSizes } from "src/enums/LoaderSizes";

import styles from "./conditionalRenderComponent.module.scss";

interface ConditionalRenderComponentProps {
  hideFallback?: boolean;
  visible?: boolean;
  size?: LoaderSizes;
  fallback?: ReactNode;
}

const ConditionalRenderComponent: React.FC<
  PropsWithChildren<ConditionalRenderComponentProps>
> = ({
  visible,
  children,
  hideFallback = false,
  size = LoaderSizes.LARGE,
  fallback = (
    <div className={styles.loader}>
      <Loader size={size} />
    </div>
  ),
}) => <>{visible ? children : hideFallback ? null : fallback}</>;

export default ConditionalRenderComponent;
