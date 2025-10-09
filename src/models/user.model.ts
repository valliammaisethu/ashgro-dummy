import { serializable, object } from "serializr";
import { ResponseModel } from "./response.model";

export class LoginRequest {
  @serializable
  email?: string;

  @serializable
  password?: string;

  @serializable
  rememberMe?: boolean;
}
export class UserData {
  @serializable
  id?: string;

  @serializable
  firstName?: string;

  @serializable
  lastName?: string;

  @serializable
  role?: string;

  @serializable
  clubId?: string;

  @serializable
  clubName?: string;
}

export class TokenData {
  @serializable
  accessToken?: string;

  @serializable
  refreshToken?: string;

  @serializable
  id?: string;
}
export class LoginData {
  @serializable(object(TokenData))
  token?: TokenData;

  @serializable(object(UserData))
  user?: UserData;
}

export class LoginResponse extends ResponseModel {
  @serializable(object(LoginData))
  data?: LoginData;
}
