import React, {
  useContext,
  createContext,
  useMemo,
  useState,
  useEffect,
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
    const newAuth = {
      ...auth,
      authenticated: true,
      user,
      token,
    };
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };

  const resetAuthState = () => {
    setAuth(initialValues);
    localStorage.removeItem("auth");
  };

  return {
    ...auth,
    setAuthenticated,
    resetAuthState,
  };
};

const AuthProvider = (ownProps: any) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : initialValues;
  });

  useEffect(() => {
    if (auth.authenticated) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  const value = useMemo(() => [auth, setAuth], [auth]);
  return <AuthContent.Provider value={value} {...ownProps} />;
};

export { AuthProvider, AuthContext };
