
import React, { useState, useRef } from 'react';
import { useA11y } from '@react-three/a11y'
import { Html } from '@react-three/drei'

export default function Model({ ...props }) {
    const shapeRef = useRef()
    const [clicked, setClicked] = useState(false)
    // Using this allows the focussed and hover state to be rendered visible
    const a11y = useA11y()
    return (
        <mesh {...props}
            ref={shapeRef}
            onClick={(e) => { setClicked(!clicked) }}
     
        >
            {/* This is where I think the model would need to be imported seperately, everything else on this page is behaviour for interacting with the mesh  */}
            <props.geometry />
            
            <meshStandardMaterial
                roughness={0.75}
                color={clicked || a11y.pressed ? "brown" : a11y.focus ? "blue" : a11y.hover ? "yellow" : "green"}
                emissive={clicked || a11y.pressed ? "brown" : a11y.focus ? "blue" : a11y.hover ? "yellow" : "green"}
            />

            {clicked || a11y.pressed && (
                <Html distanceFactor={props.labelDistance}>
                    <div
                        className="content"
                        tabIndex="-1"
                    >
                        {props.labelContent}
                    </div>
                </Html>
            )
            }
        </mesh>
    )
}

