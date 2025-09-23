import React, { useContext, createContext, useMemo, useState, Dispatch, SetStateAction } from "react";
import { User } from "../../models/user.model";

export interface AuthState {
  authenticated?: boolean;
  user?: User;
}

type SetAuthState = Dispatch<SetStateAction<AuthState>>;

type AuthContentProps = [AuthState, SetAuthState];

// Define the default context state
const initialValues: AuthState = {
  authenticated: false,
  user: new User(),
};

// Create the context
const AuthContent: any = createContext({});

// Create method to use context
const AuthContext = () => {
  const context = useContext<AuthContentProps>(AuthContent);
  if (!context) {
    throw new Error(`useMeContext must be used within a MeContextProvider`);
  }
  const [auth, setAuth] = context;
  
  const setAuthenticated = (user?: User) => {
    setAuth((auth) => ({
      ...auth,
      authenticated: true,
      user,
    }));
  };

  return {
    ...auth,
    setAuthenticated
  };
};

// Create the context provider
const AuthProvider = (ownProps: any) => {
  const [auth, setAuth] = useState<AuthState>(initialValues);
  const value = useMemo(() => [auth, setAuth], [auth]);
  return <AuthContent.Provider value={value} {...ownProps} />;
}

export { AuthProvider, AuthContext };
