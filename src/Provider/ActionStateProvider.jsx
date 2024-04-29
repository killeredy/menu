import { createContext, useState } from "react";

export const ActionContext =  createContext();

export function ActionStateProvider({children}){
    const [actionControl, setActionControl] = useState('idle');
    const changeAction = (e) =>{
        console.log('mudou')
        setActionControl(e)
    }
    return (
        <ActionContext.Provider value={{actionControl, changeAction}}>
            {children}
        </ActionContext.Provider>
    )
}