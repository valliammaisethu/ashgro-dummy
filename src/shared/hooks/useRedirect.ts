import { useNavigate } from "react-router-dom";

import { NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const { HOME, FORGOT_PASSWORD } = NavigationRoutes;

const useRedirect = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate(HOME);

  const navigateToForgotPassword = () => navigate(FORGOT_PASSWORD);

  return {
    navigateToHome,
    navigateToForgotPassword,
  };
};

export default useRedirect;
