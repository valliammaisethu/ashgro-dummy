import React, { createContext, useContext, useState, ReactNode } from "react";

interface TopBarContextType {
  hideTopBar: boolean;
  setHideTopBar: (hide: boolean) => void;
}

const TopBarContext = createContext<TopBarContextType | undefined>(undefined);

export const TopBarProvider = ({ children }: { children: ReactNode }) => {
  const [hideTopBar, setHideTopBar] = useState(false);

  return (
    <TopBarContext.Provider value={{ hideTopBar, setHideTopBar }}>
      {children}
    </TopBarContext.Provider>
  );
};

export const useTopBar = () => {
  const context = useContext(TopBarContext);
  if (context === undefined) {
    throw new Error("useTopBar must be used within a TopBarProvider");
  }
  return context;
};
