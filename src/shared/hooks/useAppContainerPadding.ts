import { useEffect } from "react";

export const useAppContainerPadding = (paddingBottom: string = "0") => {
  useEffect(() => {
    const appContainer = document.querySelector(
      '[class*="appContainer"]',
    ) as HTMLElement;

    if (appContainer) {
      const originalPadding = appContainer.style.paddingBottom;
      appContainer.style.paddingBottom = paddingBottom;

      return () => {
        if (appContainer) {
          appContainer.style.paddingBottom = originalPadding;
        }
      };
    }
  }, [paddingBottom]);
};
