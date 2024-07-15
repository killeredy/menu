import { useState, lazy, Suspense, useEffect,  } from "react";
import "./App.scss";
import MenuMobile from "./Componentes/Mobile/MenuMobile";
import { InternalProvider } from "./Provider/InternalProvider";
import BtnOpenClose from "./Componentes/BtnOpenClose";
import Container from "./Componentes/Container";

function App() {
  const maxWidth = 576;
  const [isMobile, setIsMobile] = useState(false);
  const MenuDesktop = lazy(() => import("./Componentes/desktop/MenuDesktop"));

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
      <InternalProvider>
        <BtnOpenClose />
        {/* <BtnStart setActionControl={() => setExternalMenu()} /> */}
        <Suspense>
          <Container>
            {isMobile ? (
              <MenuMobile />
            ) : (
              <MenuDesktop />
            )}
          </Container>
        </Suspense>
      </InternalProvider>


    </>
  );
}

export default App;
