import React, { useEffect, useState } from 'react'

const MenuPanel2 = (props) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    return (
        <div className="menuContainer">
            <button className="collapseBtn" tabIndex="0" onClick={toggle}>Controls</button>
            {open && (
                <div className="toggle">
                    <button className="navigationBtn" onClick={() => props.directionalMovement('up')}>Up</button>
                    <button className="navigationBtn" onClick={() => props.directionalMovement('right')}>Right</button>
                    <button className="navigationBtn" onClick={() => props.directionalMovement('down')}>Down</button>
                    <button className="navigationBtn" onClick={() => props.directionalMovement('left')}>Left</button>
                    <button className="zoomBtn" onClick={() => props.directionalMovement('zoomIn')}>+</button>
                    <button className="zoomBtn" onClick={() => props.directionalMovement('zoomOut')}>-</button>
                </div>
            )}
        </div>
    )
}

export default MenuPanel2