function BtnOpenClose({showBack, handleBackMenu, openMenu, handleChangeMenu}){
    return (
        <div className="btn-content">
              <button className={`back ${showBack ? "show" : ""}`} onClick={() => handleBackMenu()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
              </button>
              <button className={`open ${openMenu ? "" :  "show"  }`} onClick={() => handleChangeMenu()}>
                  <div className="line-menu-content">
                    <div className="line-menu line-top"></div>
                    <div className="line-menu line-midle"></div>
                    <div className="line-menu line-bottom"></div>
                  </div>
                
              </button>
          </div>
    )
}

export default BtnOpenClose;