import { generatePath, useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../routes/routeConstants/appRoutes";
import { updateLocationMonthQuery } from "src/views/Calender/utils/calendarUtils";
import { NavigateToSelectedMonth } from "../types/route.type";

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
  DASHBOARD,
  INDIVIDUAL_CLUB,
  CALENDER,
  CLUBS,
} = NavigationRoutes;

const useRedirect = () => {
  const navigate = useNavigate();

  const navigateBack = () => navigate(-1);

  const navigateToDashboard = () => navigate(DASHBOARD);

  const navigateToHome = () => navigate(HOME);

  const navigateToLogin = () => navigate(LOGIN);

  const navigateToForgotPassword = () => navigate(FORGOT_PASSWORD);

  const navigateToProspects = () => navigate(PROSPECTS_LISTING);

  const navigateToCalendar = () => navigate(CALENDER);

  const navigateToClubs = () => navigate(CLUBS);

  const navigateToIndividualProspect = (id: string) =>
    navigate(generatePath(INDIVIDUAL_PROSPECT, { id }));

  const navigateToMemberDetails = (id?: string) =>
    navigate(generatePath(MEMBER_DETAILS, { id }));

  const navigateToStaffMemberDetails = (id?: string) =>
    navigate(generatePath(STAFF_MEMBER_DETAILS, { id }));

  const navigateToStaffMemberList = () => navigate(generatePath(CLUB_STAFF));

  const navigateToMembers = () => navigate(MEMBERS);

  const navigateToInvidualClub = (id?: string) =>
    navigate(generatePath(INDIVIDUAL_CLUB, { id }));

  const navigateToMonth = ({
    navigate,
    pathname,
    query,
    date,
  }: NavigateToSelectedMonth) => {
    const search = updateLocationMonthQuery(query, date);

    navigate(
      {
        pathname,
        search,
      },
      { replace: true },
    );
  };

  return {
    navigateToHome,
    navigateToDashboard,
    navigateBack,
    navigateToLogin,
    navigateToForgotPassword,
    navigateToProspects,
    navigateToIndividualProspect,
    navigateToMemberDetails,
    navigateToStaffMemberDetails,
    navigateToStaffMemberList,
    navigateToMembers,
    navigateToInvidualClub,
    navigateToMonth,
    navigateToCalendar,
    navigateToClubs,
  };
};

export default useRedirect;
