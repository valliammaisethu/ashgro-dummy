import { generatePath, useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const {
  HOME,
  LOGIN,
  FORGOT_PASSWORD,
  INDIVIDUAL_PROSPECT,
  PROSPECTS_LISTING,
  MEMBER_DETAILS,
  MEMBERS,
} = NavigationRoutes;

const useRedirect = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate(HOME);

  const navigateToLogin = () => navigate(LOGIN);

  const navigateToForgotPassword = () => navigate(FORGOT_PASSWORD);

  const navigateToProspects = () => navigate(PROSPECTS_LISTING);

  const navigateToIndividualProspect = (id: string) =>
    navigate(generatePath(INDIVIDUAL_PROSPECT, { id }));

  const navigateToMemberDetails = (id?: string) =>
    navigate(generatePath(MEMBER_DETAILS, { id }));

  const navigateToMembers = () => navigate(MEMBERS);

  return {
    navigateToHome,
    navigateToLogin,
    navigateToForgotPassword,
    navigateToProspects,
    navigateToIndividualProspect,
    navigateToMemberDetails,
    navigateToMembers,
  };
};

export default useRedirect;
