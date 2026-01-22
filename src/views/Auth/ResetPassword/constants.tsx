export const resetPasswordConstants = {
  title: "Reset Password",
};

export const labels = {
  newPassword: "New Password",
  confirmPassword: "Confirm Password",
};

export const fields = {
  newPassword: "newPassword",
  confirmPassword: "confirmPassword",
} as const;

export const placeholders = {
  newPassword: "Enter new password",
  confirmPassword: "Confirm new password",
};

export const passwordConstraintContent: {
  id: number;
  name: string;
  message: string;
}[] = [
  {
    id: 1,
    name: "minLength",
    message: "Minimum 8 characters",
  },
  {
    id: 2,
    name: "uppercase",
    message: "At least 1 uppercase letter",
  },
  {
    id: 3,
    name: "lowercase",
    message: "At least 1 lowercase letter",
  },

  {
    id: 4,
    name: "number",
    message: "At least 1 number",
  },
  {
    id: 5,
    name: "special",
    message: "At least 1 special character",
  },
];

export const passwordCriteriaMap: Record<string, RegExp> = {
  minLength: /^.{8,}$/,
  number: /\d/,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  special: /[!@#$%^&*(),.?":{}|<>]/,
};

export const newPasswordValidation =
  "Password can’t be longer than 25 characters";

export const confirmPasswordValidation = "Confirm password is required";
export const matchingPasswordValidation = "Passwords do not match";
