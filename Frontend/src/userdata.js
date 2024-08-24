import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserDataProvider = ({ children }) => {
   const [user_data, setUserdata] = useState({
      id: '',
      name: '',
      email: '',
      password: '',
   });

   const [isregistered, setregister] = useState(false)

   return (
      <UserContext.Provider value={{ user_data, setUserdata }}>
         {children}
      </UserContext.Provider>
   );
};
