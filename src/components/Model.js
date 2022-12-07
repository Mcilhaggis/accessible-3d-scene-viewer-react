
import React, { useState, useRef } from 'react';
import { useA11y} from '@react-three/a11y'
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
            <dodecahedronGeometry />
            <meshStandardMaterial
                roughness={0.75}
                color={a11y.focus || a11y.hover ? "yellow" : "green"}
                emissive={a11y.focus ? "#cc4444" : a11y.hover ? "yellow" : "green"}
            />

            {clicked || a11y.pressed && (
                <Html distanceFactor={10}>
                    <div className="content"
                        tabIndex="0">
                        {props.labelContent}

                    </div>
                </Html>
            )
            }
        </mesh>
    )
}

