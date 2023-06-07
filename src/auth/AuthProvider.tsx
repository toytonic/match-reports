import { PropsWithChildren, createContext, useContext } from "react";
import { User, useUser } from "../api/useUser";

type ContextProps = {
  user?: User;
};

const AuthContext = createContext<ContextProps>({});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data: user } = useUser();

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

function useAuthContext() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuthContext };
