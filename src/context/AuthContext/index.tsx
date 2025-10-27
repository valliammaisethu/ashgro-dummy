import React, {
  useContext,
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from "react";
import { UserData, TokenData } from "src/models/user.model";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";

export interface AuthState {
  authenticated?: boolean;
  user?: UserData;
  token?: TokenData;
}

type SetAuthState = Dispatch<SetStateAction<AuthState>>;

const storedUser = localStorageHelper.getItem(LocalStorageKeys.USER);
const storedToken = localStorageHelper.getItem(LocalStorageKeys.TOKEN);

const initialValues: AuthState = {
  authenticated: !!storedToken,
  user: storedUser || new UserData(),
  token: storedToken || new TokenData(),
};

const AuthContent = createContext<[AuthState, SetAuthState] | undefined>(
  undefined,
);

const AuthContext = () => {
  const context = useContext(AuthContent);
  if (!context) {
    throw new Error(`AuthContext must be used within an AuthProvider`);
  }

  const [auth, setAuth] = context;

  const setAuthenticated = (user?: UserData, token?: TokenData) => {
    const newAuth = {
      authenticated: true,
      user,
      token,
    };
    setAuth(newAuth);

    localStorageHelper.setItem(LocalStorageKeys.USER, user);
    localStorageHelper.setItem(LocalStorageKeys.TOKEN, token);
  };

  const resetAuthState = () => {
    setAuth({
      authenticated: false,
      user: new UserData(),
      token: new TokenData(),
    });
    localStorageHelper.removeItem(LocalStorageKeys.USER);
    localStorageHelper.removeItem(LocalStorageKeys.TOKEN);
  };

  return {
    ...auth,
    setAuthenticated,
    resetAuthState,
  };
};

export const AuthProvider = ({
  values = initialValues,
  children,
}: PropsWithChildren<{ values?: AuthState }>) => {
  const [auth, setAuth] = useState<AuthState>(values);

  const value = useMemo(
    () => [auth, setAuth] as [AuthState, SetAuthState],
    [auth],
  );

  return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>;
};

export { AuthContext };
