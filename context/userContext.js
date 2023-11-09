
import { createContext, useState } from "react";

export const userContext = createContext({});



export const UserContextProvider = ({children})=>{
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        countryCode: null,
        mobile: null,
        checked: false,
      });

      const updateFormData = (field, value) => {
        setFormData({
          ...formData,
          [field]: value,
        });
      };


    return(
        <userContext.Provider value={{ formData, updateFormData}}>
            { children}
        </userContext.Provider>
    )
}