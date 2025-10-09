import { AntdButtonType, ButtonTypes } from "../../enums/buttonType";

export const mapToAntdType = (type?: ButtonTypes): AntdButtonType => {
  switch (type) {
    case ButtonTypes.PRIMARY:
      return AntdButtonType.PRIMARY;
    case ButtonTypes.DASHED:
      return AntdButtonType.DASHED;
    case ButtonTypes.DEFAULT:
      return AntdButtonType.DEFAULT;
    case ButtonTypes.TEXT:
      return AntdButtonType.TEXT;
    case ButtonTypes.LINK:
      return AntdButtonType.LINK;
    default:
      return AntdButtonType.DEFAULT;
  }
};
