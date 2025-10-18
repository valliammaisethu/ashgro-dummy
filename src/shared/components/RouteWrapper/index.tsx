import React, { useEffect } from "react";
import { useTopBar } from "../../contexts/TopBarContext";

interface RouteWrapperProps {
  children: React.ReactNode;
  hideTopBar?: boolean;
}

const RouteWrapper = ({ children, hideTopBar = false }: RouteWrapperProps) => {
  const { setHideTopBar } = useTopBar();

  useEffect(() => {
    setHideTopBar(hideTopBar);
  }, [hideTopBar, setHideTopBar]);

  return <>{children}</>;
};

export default RouteWrapper;
