import { createContext } from "react";
import { useState } from "react";

export const RegisterOrganizationContext = createContext();

const RegisterOrganizationContextProvider = ({children}) => {

    const [orgName, setOrgName] = useState("");
    const [orgEmail, setOrgEmail] = useState("");
    const [orgAddress, setOrgAddress] = useState("")

    const value = {orgName, orgEmail, orgAddress, setOrgName, setOrgEmail, setOrgAddress}

    return ( 
        <RegisterOrganizationContext.Provider value={value}>
            {children}
        </RegisterOrganizationContext.Provider>
     );
}
 
export default RegisterOrganizationContextProvider;