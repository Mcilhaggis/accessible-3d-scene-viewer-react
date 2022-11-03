import React, { useEffect, useState } from 'react'

const MenuPanel2 = (props) => {
    console.log(props)
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    const directionalMovement = (direction) => {
        switch (direction) {
            case 'up':
                props.setModelXPos(
                    props.modelXPos * 0.9
                );
                break;
            case 'down':
                props.setModelXPos(
                    props.modelXPos * 1.1
                );
                break;
            case 'left':
                props.setModelZPos(
                    props.modelZPos * 0.9
                )
                break;
            case 'right':
                props.setModelZPos(
                    props.modelZPos * 1.1
                )
                break;
            case 'zoomIn':
                props.setModelScale(
                    props.modelScale * 1.1
                );
                break;
            case 'zoomOut':
                props.setModelScale(
                    props.modelScale * 0.9
                );
                break;
        }
    }
    return (
        <div className="menuContainer">
            <button className="collapseBtn" tabIndex="0" onClick={toggle}>Controls</button>
            {open && (
                <div className="toggle">
                    <button className="navigationBtn" onClick={() => directionalMovement('up')}>Up</button>
                    <button className="navigationBtn" onClick={() => directionalMovement('right')}>Right</button>
                    <button className="navigationBtn" onClick={() => directionalMovement('down')}>Down</button>
                    <button className="navigationBtn" onClick={() => directionalMovement('left')}>Left</button>
                    <button className="zoomBtn" onClick={() => directionalMovement('zoomIn')}>+</button>
                    <button className="zoomBtn" onClick={() => directionalMovement('zoomOut')}>-</button>
                </div>
            )}
        </div>
    )
}

export default MenuPanel2