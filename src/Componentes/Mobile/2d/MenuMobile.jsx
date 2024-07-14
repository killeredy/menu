import { useEffect, useState } from "react";
import "./index.scss"
import { div } from "three/examples/jsm/nodes/Nodes.js";
import BtnStart from "../../BtnStart";
import BtnOpenClose from "../../BtnOpenClose";
import StringToText from "../../StringToText";

function MenuMobile({ menu, setMenu }) {
    const [classOpen, setClassOpen] = useState('idle');
    const [listPage, setListPage] = useState(menu.paginasCurrent);
    const [status, setStauts] = useState('');
    const [nextPages, setNextPages] = useState(null);
    const [url, setUrl] = useState(null);
    
    const handleChangePage = (item) => {
        if (item.page_id == 0) {
            setNextPages(item.pagesList);
            setStauts('subPage');
        } else {
            setStauts('openPage');
            setUrl(item.page);

        }
        setClassOpen('close')
    }

    const handleBackMenu = () => {
        setClassOpen('backMenu')
        setStauts('backMenu')
        // console.log("change to back");
    }

    const handleChangeMenu = () => {
        if (classOpen == "closeMenu") {
            setClassOpen('open')
        } else {
            setClassOpen('closeMenu')

        }
    }

    const AnimationEnd = () => {
        // console.log(status);

        setTimeout(() => {
            switch (status) {
                case 'openPage':
                    window.location.href = url;
                    break;
                case 'subPage':
                    setListPage(nextPages);
                    setClassOpen('openSub');
                    break;
    
                case 'backMenu':
                    setListPage(menu.listPaginas);
                    setClassOpen('open')
                    break;
    
                default:
                    break;
            }
            
        }, 1000);
    }

    const handleStart = () => {
        setTimeout(() => {
            setClassOpen("open");
        }, 1000)
    }


    return (
        <>
            {classOpen == "idle" && menu_data.is_home ? (
                <>
                    <BtnStart setActionControl={(e) => handleStart()} />
                </>

            ) : (
                <>
                    <div className={`menu2d ${classOpen != "closeMenu" && classOpen != "idle" ? "show" : ""}`}  >
                        <div className="menu2d-container">
                            {listPage && (listPage.map((elem, index) => {
                                return (
                                    elem.show && (
                                        <div key={index} className={`line-container ${classOpen}`} style={{ backgroundImage: `url(${elem.img_m})` }}  onAnimationEnd={(e)=>AnimationEnd()}  onClick={() => { handleChangePage(elem) }}>
                                            <div className="content-rotate" >
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
                            <div style={{width: '100%', display: 'flex', justifyContent: "center", pointerEvents: "all"}}>
                                <a href={`${menu.sobre.page}`}>
                                    <button className="btn-sobre" > {menu.sobre.title}  </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <BtnOpenClose showBack={classOpen == "openSub"} handleBackMenu={(e) => handleBackMenu(e)} openMenu={classOpen != "open"} handleChangeMenu={(e) => handleChangeMenu(e)} />
                </>

            )}

        </>
    )
}



export default MenuMobile;