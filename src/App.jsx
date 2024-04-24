import { useState, lazy, Suspense, useEffect, createContext } from "react";
import "./App.scss";



function App() {
  const [menu, setMenu] = useState({
    listPaginas: "",
    paginasCurrent: "",
    showMenuPage: false,
    stage: 0,
    callback: "",   
  });


  const Menu3D = lazy(() => import("./Componentes/Menu3D"));


  const HandleShowMenuPage = () => {
    setMenu({...menu, showMenuPage: true});
  };
 

  useEffect(() => {
    fetch(url + "/wp-json/lamenu/v1/menu-pgs")
      .then((response) => response.json())
      .then((data) => {
        const newMenu = { ...menu };
        newMenu.listPaginas = data;
        newMenu.paginasCurrent = data;
        setMenu(newMenu);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {menu.listPaginas && (
        <Suspense>
          <div className={`menu-3d-content ${menu.showMenuPage ? "show" : ""}`}>
            <Menu3D menu={menu} setMenu={(e)=> setMenu(e)}
            />
          </div>
        </Suspense>
      )}

      {!menu.showMenuPage && (
        <div className="home-pictures">
          <button onClick={() => HandleShowMenuPage()}>
            <h2>Start</h2>
          </button>
        </div>
      )}
    </>
  );
}

export default App;
