import { useState, lazy, Suspense, useEffect } from "react";
import "./App.scss";
import MenuMobile from "./Componentes/Mobile/2d/MenuMobile";

function App() {
  const [menu, setMenu] = useState({
    listPaginas: [],
    paginasCurrent: [],
    sobre: "",
  });
  const maxWidth = 576;
  const [isMobile, setIsMobile] = useState(false);
  const MenuDesktop = lazy(() => import("./Componentes/desktop/MenuDesktop"));

  useEffect(() => {
        const newMenu = { ...menu };
        newMenu.listPaginas = menu_data.data;
        newMenu.paginasCurrent = menu_data.data;
        newMenu.sobre = menu_data.data.filter((elem) => {
          return elem.show != true;
        })[0]
        setMenu(newMenu);
  }, []);


  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= maxWidth);
  };

  return (
    <>
      {menu.listPaginas.length >0  && ( 
          <Suspense>
            {isMobile ? (
              <MenuMobile menu={menu} setMenu={(e) => setMenu(e)} />
            ) : (
              <MenuDesktop menu={menu} setMenu={(e) => setMenu(e)} />
            )}
          </Suspense>
      )}
    </>
  );
}

export default App;
