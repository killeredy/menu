import { useContext } from "react";
import { IntenalContext } from "../../Provider/InternalProvider";

export default function Sobre({menu}) {

    const removeSlash = (string) => {
        return string.replace(/\\/g, "")
    }



    return (
        <div >
            <div style={{ width: '100%', display: 'flex', justifyContent: "center", pointerEvents: "all" }}>
                <a href={`${removeSlash(menu.sobre.page)}`}>
                    <button className="btn-sobre" > {menu.sobre.title}  </button>
                </a>
            </div>
            <div style={{ display: 'flex', gap: '10px',  justifyContent: "center", marginTop: '20px' }}>
                {menu.sobre.social_media.length > 0 && (
                    menu.sobre.social_media.map((elem, index) => {
                        return (
                            <div key={index}>
                                <a href={elem.url}>
                                    <img src={elem.img} title={elem.label} width={'80px'} height={'80px'}  style={{objectFit: "contain"}} />
                                </a>
                            </div>
                        )
                    })
                )}

            </div>
        </div>
    )
}