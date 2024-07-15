import { createContext, useEffect, useState } from "react";

export const IntenalContext =  createContext();

export function InternalProvider({children}){
    const [menu, setMenu] = useState({});
    const [listPages, setListPages]  = useState({});
    const [config3d, setConfig3D] = useState({});



    useEffect(() => {
        const {data } =  {...menu_data};
        const newListPage =  data;
        const newMenu = {
            currentPg: data,
            nextPg: null,
            sobre: data.filter((elem) => {
              return elem.show != true;
            })[0],
        }

        setConfig3D({assets: menu_data.path_assets, models: menu_data.path_model});
        setMenu(newMenu);
        setListPages(newListPage);
  }, []);

    return (
        <IntenalContext.Provider value={{menu, setMenu, listPages, config3d}}>
            {menu.currentPg && (children)}
        </IntenalContext.Provider>
    )
}