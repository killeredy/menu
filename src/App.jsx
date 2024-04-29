import { useState, lazy, Suspense, useEffect} from "react";
import "./App.scss";



function App() {
  const [menu, setMenu] = useState({
    listPaginas: [],
    paginasCurrent: [],
    sobre: ""
  });
  
  
  const Menu3D = lazy(() => import("./Componentes/Menu3D"));

  useEffect(() => {
    fetch(url + "/wp-json/lamenu/v1/menu-pgs")
      .then((response) => response.json())
      .then((data) => {
        const newMenu = { ...menu };
        newMenu.listPaginas = data;
        newMenu.paginasCurrent = data;
        

        newMenu.sobre =  data.filter((elem) =>{
          return elem.show !=  true;
        } )[0]



        setMenu(newMenu);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {menu.listPaginas && (
        <Suspense>
            <Menu3D menu={menu} setMenu={(e)=> setMenu(e)} />        
        </Suspense>
      )}
    </>
  );
}

export default App;
