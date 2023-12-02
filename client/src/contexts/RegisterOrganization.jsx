import { createContext } from "react";
import { useState } from "react";

export const RegisterOrganizationContext = createContext();

const RegisterOrganizationContextProvider = ({children}) => {

    return ( 
        <RegisterOrganizationContext.Provider>
            {children}
        </RegisterOrganizationContext.Provider>
     );
}
 
export default RegisterOrganizationContextProvider;