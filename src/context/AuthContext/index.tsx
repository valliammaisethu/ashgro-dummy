import React, {
  useContext,
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useEffect,
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

const getInitialValues = (): AuthState => {
  const storedUser = localStorageHelper.getItem(LocalStorageKeys.USER);
  const rawToken = localStorage.getItem(LocalStorageKeys.TOKEN);

  let parsedToken = null;
  if (rawToken) {
    try {
      parsedToken = JSON.parse(rawToken);
    } catch {
      parsedToken = rawToken;
    }
  }

  const hasToken = Boolean(
    parsedToken && String(parsedToken).trim().length > 0,
  );

  return {
    authenticated: hasToken,
    user: storedUser || new UserData(),
    token: parsedToken || new TokenData(),
  };
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

  const rawToken = localStorage.getItem(LocalStorageKeys.TOKEN);

  let parsedToken = null;
  if (rawToken) {
    try {
      parsedToken = JSON.parse(rawToken);
    } catch {
      parsedToken = rawToken;
    }
  }

  const actualAuthenticated = Boolean(
    parsedToken && String(parsedToken).trim().length > 0,
  );

  useEffect(() => {
    if (auth.authenticated !== actualAuthenticated) {
      setAuth(getInitialValues());
    }
  }, [auth.authenticated, actualAuthenticated, setAuth]);

  const setAuthenticated = (user?: UserData, token?: TokenData) => {
    const newAuth = {
      authenticated: true,
      user,
      token,
    };
    setAuth(newAuth);
    localStorageHelper.setItem(LocalStorageKeys.USER, user);
    localStorageHelper.setItem(LocalStorageKeys.TOKEN, token?.accessToken);
    localStorageHelper.setItem(
      LocalStorageKeys.REFRESH_TOKEN,
      token?.refreshToken,
    );
  };

  const resetAuthState = () => {
    setAuth({
      authenticated: false,
      user: new UserData(),
      token: new TokenData(),
    });
    localStorageHelper.clearData();
  };

  return {
    ...auth,
    authenticated: actualAuthenticated,
    setAuthenticated,
    resetAuthState,
  };
};

export const AuthProvider = ({
  values,
  children,
}: PropsWithChildren<{ values?: AuthState }>) => {
  const [auth, setAuth] = useState<AuthState>(values || getInitialValues());

  const value = useMemo(
    () => [auth, setAuth] as [AuthState, SetAuthState],
    [auth],
  );

  return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>;
};

export { AuthContext };
