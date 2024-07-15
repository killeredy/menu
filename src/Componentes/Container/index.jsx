
import { useContext } from "react";
import { ExternalContext } from "../../Provider/ExternalProvider";
import "./index.scss";
import { StatesMenu } from "../../models/StateMenu";
export default function Container({children}){
    const {externalMenu , setExternalMenu }= useContext(ExternalContext)

    const handleClose =(e) =>{

        if(e.target.classList.contains('la-menu-container') ) {
            let externalState = "";
            let internalState = "";
            if(e.target.classList.contains('closing')){
                externalState = StatesMenu.close;
            }else if(e.target.classList.contains('opening')){
                externalState = StatesMenu.open;
                internalState = StatesMenu.opening; 
            }
    
            const newExt  = {...externalMenu};
            newExt.menu =  externalState;
            newExt.content =  internalState;
            setExternalMenu(newExt);
        }
    }

    return(
        <div className={`la-menu-container ${externalMenu.menu}`} onAnimationEnd={(e)=> handleClose(e)}>
            {children}
        </div>
    )
}