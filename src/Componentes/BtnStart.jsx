function BtnStart({ setActionControl }){
    
    return (
        <div className="home-pictures">
        <button onClick={() => setActionControl('openMenu')}>
          <h2>Start</h2>
        </button>
      </div>
    )
}

export default BtnStart;