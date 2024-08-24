import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserDataProvider = ({ children }) => {
   const [user_data, setUserdata] = useState({
      id: '',
      email: '',
      role: 'User',
   });

   return (
      <UserContext.Provider value={{ user_data, setUserdata }}>
         {children}
      </UserContext.Provider>
   );
};
