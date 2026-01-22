import { useState } from "react";

const useDrawer = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const toggleVisibility = () => setVisible((prev) => !prev);

  return {
    visible,
    show,
    hide,
    toggleVisibility,
  };
};

export default useDrawer;
