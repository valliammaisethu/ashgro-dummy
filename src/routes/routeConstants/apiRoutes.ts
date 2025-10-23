export const ApiRoutes = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  USER_LOGIN: "/auth/login",
  USER_LOGOUT: "/auth/logout",
  FORGOT_PASSWORD: "/auth/forgotPassword",
  RESET_PASSWORD: "/auth/resetPassword",
  ATTACHMENTS: "/attachments",
  ATTACHMENTS_SPECIFIC: "/attachments/:id",
  ATTACHMENT_PRESIGNED_URL: "/attachments/get-presigned-url",
  PROSPECTS: "/prospects",
};
