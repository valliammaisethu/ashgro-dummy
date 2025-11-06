export const NavigationRoutes = {
  HOME: "/home",
  APP_COMPONENTS: "/app-components",
  AUTH: "/auth",
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  PROSPECTS_LISTING: "/home/prospects",
  INDIVIDUAL_PROSPECT: "/home/prospects/:id",
  STAFF_MEMBER_DETAILS: "/home/staff-member/:id",
  MEMBER_DETAILS: "/home/member/:id",
  STAFF_MEMBERS: "/home/staff-members",
  MEMBERS: "/home/members",
};

export const AppRoutes = {
  HOME: "/home",
  APP_COMPONENTS: "/app-components",

  AUTH: "/auth/*",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  DASHBOARD: "/home/dashboard",
  PROSPECTS_LISTING: "/home/prospects",
  INDIVIDUAL_PROSPECT: "/home/prospects/:id",
  CALENDAR: "/home/calendar",
  MEMBERS: "/home/members",
  CLUB_STAFF: "/home/club-staff",
  SETTINGS: "/home/settings",
  STAFF_MEMBER_DETAILS: "/home/staff-member/:id",
  MEMBER_DETAILS: "/home/member/:id",
  STAFF_MEMBERS: "/home/members",
};
