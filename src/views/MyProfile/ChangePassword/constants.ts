export const changePasswordConstants = {
  title: "Change Password",
};

export const labels = {
  currentPassword: "Current Password",
  newPassword: "New Password",
  confirmPassword: "Confirm Password",
};

export const fields = {
  currentPassword: "currentPassword",
  newPassword: "newPassword",
  confirmPassword: "confirmPassword",
} as const;

export const placeholders = {
  currentPassword: "Enter current password",
  newPassword: "Enter new password",
  confirmPassword: "Confirm new password",
};

export const currentPasswordValidation = "Current password is required";
export const samePasswordValidation =
  "New password cannot be the same as current password";

// Reuse validation messages from ResetPassword
export {
  newPasswordValidation,
  confirmPasswordValidation,
  matchingPasswordValidation,
} from "src/views/Auth/ResetPassword/constants";
