import { createContext, useState } from "react";
import { StatesMenu } from "../models/StateMenu";

export const ExternalContext =  createContext();

export function ExternalProvider({children}){

    const [externalMenu, setExternal] = useState({
        btnMenu: StatesMenu.close,
        btnSubmenu: false,
        menu: StatesMenu.close,
        content: StatesMenu.close,
    });


    const setExternalMenu = (e) =>{
        setExternal(e)
    }

    return (
        <ExternalContext.Provider value={{externalMenu, setExternalMenu}}>
            {children}
        </ExternalContext.Provider>
    )
}