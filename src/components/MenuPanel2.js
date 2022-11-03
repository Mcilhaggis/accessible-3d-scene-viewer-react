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

    return (
        <div className="menuContainer">
            <button className="collapseBtn" tabIndex="0" onClick={toggle}>Controls</button>
            {open && (
                <div className="toggle">
                    <button onClick={moveUp}>Up</button>
                    <button onClick={moveRight}>Right</button>
                    <button onClick={moveDown}>Down</button>
                    <button onClick={moveLeft}>Left</button>
                </div>
            )}
        </div>
    )
}

export default MenuPanel2