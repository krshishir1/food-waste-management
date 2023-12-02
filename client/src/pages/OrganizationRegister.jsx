import RegisterOrganizationContextProvider from "../contexts/RegisterOrganization";
import RegisterOrganizationDetails from "../components/RegisterOrganizationDetails";

import { RegisterOrganizationContext } from "../contexts/RegisterOrganization";

const OrganizationRegister = () => {
    return ( 
        <>
            <RegisterOrganizationContextProvider>
                <RegisterOrganizationDetails />
            </RegisterOrganizationContextProvider>
        </>
     );
}
 
export default OrganizationRegister;