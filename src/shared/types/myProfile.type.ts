import { ModalType } from "src/views/MyProfile/constants";

export interface MyProfileContentProps {
  onOpenModal: (type: ModalType) => void;
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
