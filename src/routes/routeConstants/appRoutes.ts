export const NavigationRoutes = {
  HOME: "/home",
  APP_COMPONENTS: "/app-components",

  AUTH: "/auth",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",

  PROSPECTS_LISTING: "/home/prospects",
  INDIVIDUAL_PROSPECT: "/home/prospects/:id",
};

export const AppRoutes = {
  HOME: "/home",
  APP_COMPONENTS: "/app-components",

  AUTH: "/auth/*",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  DASHBOARD: "/home/dashboard",
  PROSPECTS_LISTING: "/home/prospects",
  INDIVIDUAL_PROSPECT: "/home/prospects/:id",
  CALENDAR: "/home/calendar",
  MEMBERS: "/home/members",
  CLUB_STAFF: "/home/club-staff",
  SETTINGS: "/home/settings",
};
