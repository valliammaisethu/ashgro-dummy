import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/routeConstants/appRoutes";

const useRedirect = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate(AppRoutes.HOME);

  return {
    navigateToHome,
  };
};

export default useRedirect;
