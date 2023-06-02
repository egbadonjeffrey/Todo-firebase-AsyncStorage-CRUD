import React, { ReactNode, useState } from "react";

interface MyContextData {
  username: string | null;
  refresh: boolean;
}

interface MyContextActions {
  setUsername: (name: string | null) => void;
  setRefresh: (name: boolean) => void;
}

interface MyContextProviderProps {
  children: ReactNode;
}

type MyContextType = MyContextData & MyContextActions;

const MyContext = React.createContext<MyContextType>({
  username: "",
  refresh: false,
  setUsername: () => {},
  setRefresh: () => {},
});

const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [refresh, setRefresh] = useState(false);

  const contextValue: MyContextType = {
    username,
    refresh,
    setUsername,
    setRefresh,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
