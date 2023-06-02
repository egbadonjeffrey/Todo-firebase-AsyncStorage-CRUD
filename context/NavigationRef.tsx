import React, { createContext, ReactNode, useContext, useRef } from "react";
import { NavigationContainerRef } from "@react-navigation/native";

type NavigationContextType = {
  navigationRef: React.RefObject<NavigationContainerRef<any>>;
};

const NavigationContext = createContext<NavigationContextType>({
  navigationRef: React.createRef<NavigationContainerRef<any>>(),
});

export const useNavigationContext = () => useContext(NavigationContext);

interface MyContextProviderProps {
  children: ReactNode;
}

export const NavigationContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  return (
    <NavigationContext.Provider value={{ navigationRef }}>
      {children}
    </NavigationContext.Provider>
  );
};
