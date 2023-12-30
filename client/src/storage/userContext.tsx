import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from 'types';

type UserContextType = {
  user: User | undefined;
  setUser: (newValue: User | undefined) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a MyContextProvider');
  }

  return context;
};

export { UserContext, UserContextProvider, useUserContext };
