import { generatePath, useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const { HOME, LOGIN, FORGOT_PASSWORD, INDIVIDUAL_PROSPECT } = NavigationRoutes;

const useRedirect = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate(HOME);

  const navigateToLogin = () => navigate(LOGIN);

  const navigateToForgotPassword = () => navigate(FORGOT_PASSWORD);

  const navigateToIndividualProspect = (id: string) =>
    navigate(generatePath(INDIVIDUAL_PROSPECT, { id }));

  return {
    navigateToHome,
    navigateToLogin,
    navigateToForgotPassword,
    navigateToIndividualProspect,
  };
};

export default useRedirect;
