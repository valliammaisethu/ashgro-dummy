import { generatePath, useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const {
  HOME,
  LOGIN,
  FORGOT_PASSWORD,
  INDIVIDUAL_PROSPECT,
  PROSPECTS_LISTING,
  MEMBER_DETAILS,
  STAFF_MEMBER_DETAILS,
  CLUB_STAFF,
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

  const navigateToStaffMemberDetails = (id?: string) =>
    navigate(generatePath(STAFF_MEMBER_DETAILS, { id }));

  const navigateToStaffMemberList = () => navigate(generatePath(CLUB_STAFF));

  const navigateToMembers = () => navigate(MEMBERS);

  return {
    navigateToHome,
    navigateToLogin,
    navigateToForgotPassword,
    navigateToProspects,
    navigateToIndividualProspect,
    navigateToMemberDetails,
    navigateToStaffMemberDetails,
    navigateToStaffMemberList,
    navigateToMembers,
  };
};

export default useRedirect;
