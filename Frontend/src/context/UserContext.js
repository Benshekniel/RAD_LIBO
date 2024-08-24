import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserDataProvider = ({ children }) => {
   const [userdata, setUserdata] = useState({
      id: '',
      email: '',
      role: 'student',
   });

   return (
      <UserContext.Provider value={{ userdata, setUserdata }}>
         {children}
      </UserContext.Provider>
   );
};
