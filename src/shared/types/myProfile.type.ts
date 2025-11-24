export interface MyProfileContentProps {
  onClose: () => void;
  onCloseEditProfile: () => void;
  onCloseChangePassword: () => void;
}

export interface EditProfileProps {
  visible: boolean;
  onClose: () => void;
}

export interface ChangePasswordProps {
  visible: boolean;
  onClose: () => void;
}

export interface ProfileState {
  myProfileVisible: boolean;
  editProfileVisible: boolean;
  changePasswordVisible: boolean;
}
