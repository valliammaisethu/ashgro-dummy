import React, { PropsWithChildren } from "react";
import { useNetwork } from "../../hooks/useNetwork";
import Offline from "../Offline";

interface RequireNetworkProps {}

const RequireNetwork = ({
  children,
}: PropsWithChildren<RequireNetworkProps>) => {
  const {
    networkStatus: { isOnline },
  } = useNetwork();

  return (
    <div className="network-status-wrapper">
      <Offline isOffline={!isOnline} />
      {children}
    </div>
  );
};

export default RequireNetwork;
