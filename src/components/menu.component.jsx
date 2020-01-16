import React, {useState} from "react";


const Menu = ({onStart, show, setShow}) => {
    
    const toggleShow = () => setShow(!show);


    return (
        <div className={show ? "menu" : "menu menu--hidden"}>
            <div className="menu__container">
                container
            </div>
            <div className="menu__toggle-btn" onClick={toggleShow}>
              {show ? "hide" : "expand"}
            </div>
            <button className="menu__start-btn" onClick={onStart}>
              Start
            </button>
        </div>
    )
}

export default Menu;