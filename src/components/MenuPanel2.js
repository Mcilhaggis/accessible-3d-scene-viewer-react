import React, { useEffect, useState } from 'react'

const MenuPanel2 = (props) => {
    console.log(props)
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    const moveUp = () => {
        alert('move up')
    }
    const moveDown = () => {
        alert('move down')
    }


    const moveRight = (constant) => {
        console.log(props.modelZPos,constant )
        props.setModelScale(
            props.modelZPos + constant
            )
            console.log(props.modelZPos * constant)
    }
    const moveLeft = (constant) => {
        props.setModelScale(
            props.modelZPos * constant
        )
    }
    const zoomIn = (constant) => {
        props.setModelScale(
            props.modelScale * constant
        )
    }

    const zoomOut = (constant) => {
        props.setModelScale(
            props.modelScale * constant
        )
    }

    return (
        <div className="menuContainer">
            <button className="collapseBtn" tabIndex="0" onClick={toggle}>Controls</button>
            {open && (
                <div className="toggle">
                    <button className="navigationBtn" onClick={moveUp}>Up</button>
                    <button className="navigationBtn" onClick={() => moveRight(1.1)}>Right</button>
                    <button className="navigationBtn" onClick={moveDown}>Down</button>
                    <button className="navigationBtn" onClick={() => moveLeft(0.9)}>Left</button>
                    <button className="zoomBtn" onClick={() => zoomIn(1.1)}>+</button>
                    <button className="zoomBtn" onClick={() => zoomOut(0.9)}>-</button>
                </div>
            )}
        </div>
    )
}

export default MenuPanel2