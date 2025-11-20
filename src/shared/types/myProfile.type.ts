export interface MyProfileContentProps {
  onClose: () => void;
  onCloseEditProfile: () => void;
}

export interface EditProfileProps {
  visible: boolean;
  onClose: () => void;
}

export interface ProfileState {
  myProfileVisible: boolean;
  editProfileVisible: boolean;
}
