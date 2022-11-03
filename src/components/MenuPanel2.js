import React, { useEffect, useState } from 'react'

const MenuPanel2 = () => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    const moveUp = () => {
        alert('move up')
    }
    const moveRight = () => {
        alert('move right')
    }
    const moveDown = () => {
        alert('move down')
    }
    const moveLeft = () => {
        alert('move left')
    }
    const zoomIn = () => {
        alert('zoom in')
    }
    const zoomOut = () => {
        alert('zoom out')
    }

    return (
        <div className="menuContainer">
            <button className="collapseBtn" tabIndex="0" onClick={toggle}>Controls</button>
            {open && (
                <div className="toggle">
                    <button className="navigationBtn" onClick={moveUp}>Up</button>
                    <button className="navigationBtn" onClick={moveRight}>Right</button>
                    <button className="navigationBtn" onClick={moveDown}>Down</button>
                    <button className="navigationBtn" onClick={moveLeft}>Left</button>
                    <button className="zoomBtn" onClick={zoomIn}>+</button>
                    <button className="zoomBtn" onClick={zoomOut}>-</button>
                </div>
            )}
        </div>
    )
}

export default MenuPanel2