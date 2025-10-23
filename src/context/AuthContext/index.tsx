import React, {
  useContext,
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { TokenData, UserData } from "src/models/user.model";

export interface AuthState {
  authenticated?: boolean;
  user?: UserData;
  token?: TokenData;
}

type SetAuthState = Dispatch<SetStateAction<AuthState>>;

type AuthContentProps = [AuthState, SetAuthState];

const initialValues: AuthState = {
  authenticated: false,
  user: new UserData(),
  token: new TokenData(),
};

const AuthContent: any = createContext({});

const AuthContext = () => {
  const context = useContext<AuthContentProps>(AuthContent);

  if (!context) {
    throw new Error(`useMeContext must be used within a MeContextProvider`);
  }
  const [auth, setAuth] = context;

  const setAuthenticated = (user?: UserData, token?: TokenData) => {
    setAuth((auth) => ({
      ...auth,
      authenticated: true,
      user,
      token,
    }));
  };

  const resetAuthState = () => {
    setAuth(initialValues);
  };

  return {
    ...auth,
    setAuthenticated,
    resetAuthState,
  };
};

const AuthProvider = (ownProps: any) => {
  const [auth, setAuth] = useState<AuthState>(initialValues);
  const value = useMemo(() => [auth, setAuth], [auth]);
  return <AuthContent.Provider value={value} {...ownProps} />;
};

export { AuthProvider, AuthContext };
