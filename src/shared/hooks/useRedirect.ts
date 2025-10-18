import { useNavigate } from "react-router-dom";

import { NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const { HOME, LOGIN, FORGOT_PASSWORD } = NavigationRoutes;

const useRedirect = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate(HOME);

  const navigateToLogin = () => navigate(LOGIN);

  const navigateToForgotPassword = () => navigate(FORGOT_PASSWORD);

  return {
    navigateToHome,
    navigateToLogin,
    navigateToForgotPassword,
  };
};

export default useRedirect;
