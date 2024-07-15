import { useContext, useEffect, useState } from "react";

import "./index.scss"

import { ExternalContext } from "../../Provider/ExternalProvider";
import { IntenalContext } from "../../Provider/InternalProvider";
import StringToText from "../StringToText";
import { StatesMenu } from "../../models/StateMenu";
import Sobre from "../Sobre";

function MenuMobile() {
    const {externalMenu, setExternalMenu} = useContext(ExternalContext);
    const {menu, setMenu} = useContext(IntenalContext);
    const [currentState, setCurrentState] = useState('');
    const [openPage, setOpenPage] = useState(null);


    useEffect(() => {
        setCurrentState(externalMenu.content)
    }, [externalMenu])

    const handleChangePage = (target, item) => {
        if (item.page) {
            setOpenPage(item.page);
        } else {
            setMenu({ ...menu, nextPg: item.pagesList })
            setExternalMenu({ ...externalMenu, btnSubmenu: true })
        }

        setCurrentState(StatesMenu.closing)
    }

    const handleAnimationEnd = (index) => {
        if (index == 0) {
            if (menu.nextPg) {
                setTimeout(() => {
                    const newMenu = { ...menu };
                    newMenu.currentPg = [...menu.nextPg];
                    newMenu.nextPg = null;
                    setMenu(newMenu);
                    setCurrentState(StatesMenu.opening);
                }, 100);
            }

            if (openPage != null) {
                window.location.href = removeSlash(openPage);
            }
        }
    }

    const removeSlash = (string) => {
        return string.replace(/\\/g, "")
    }



    return (
        <>
            <div className={`la-menu2d`}  >
                <div className="la-menu2d-container">
                    {menu && (menu.currentPg.map((elem, index) => {
                        return (
                            elem.show && (
                                <div key={index} data-action="load-page" className={`la-menu2d-item-container ${currentState}`} onAnimationEndCapture={(e) => handleAnimationEnd(index)} onClick={(e) => { handleChangePage(e.target, elem) }}  >
                                    <div className="la-content-img" style={{ backgroundImage: `url(${elem.img_m})` }}>

                                    </div>
                                    <div className="content-rotate" data-action="load-page"  >
                                        <div className="content">
                                            <div className="show-content">
                                                <div>
                                                    <h2>{elem.title}</h2>
                                                    <StringToText text={elem.desc} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }))}

                    <Sobre />
                </div>
            </div>
        </>

    )
}



export default MenuMobile;