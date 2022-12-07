
// Entry point of react App
import React, { Suspense, useState, useEffect, useRef, useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Bounds, useBounds, Html } from '@react-three/drei'
import { A11yAnnouncer, A11y, useA11y, useUserPreferences } from '@react-three/a11y'
import MenuPanel from './MenuPanel'
import Progress from './Progress'
import Model from './Model'
// import CustomCamera from './CustomCamera'

import '../styles.scss'
import { AlwaysStencilFunc } from "three";
const SceneViewer = () => {
    const [modelScale, setModelScale] = useState(1);
    const [modelXPos, setModelXPos] = useState(0);
    const [modelYPos, setModelYPos] = useState(0);
    const [modelZPos, setModelZPos] = useState(0);
    const [keypressDirection, setKeyPressDirection] = useState(null)
    const { a11yPrefersState } = useUserPreferences()

    useEffect(() => {
        directionalMovement(keypressDirection);
    }, [keypressDirection]);

    {/* The X axis is red. The Y axis is green. The Z axis is blue. */ }
    const directionalMovement = (direction) => {
        switch (direction) {
            case 'down':
                setModelXPos(
                    modelXPos + 0.02
                );
                setKeyPressDirection(null)
                break;
            case 'up':
                setModelXPos(
                    modelXPos - 0.02
                );
                setKeyPressDirection(null)
                break;
            case 'left':
                setModelYPos(
                    modelYPos - 0.02
                )
                setKeyPressDirection(null)
                break;
            case 'right':
                setModelYPos(
                    modelYPos + 0.02
                )
                setKeyPressDirection(null)
                break;
            case 'add':
                setModelScale(
                    modelScale + 0.02
                );
                setKeyPressDirection(null)
                break;
            case 'subtract':
                setModelScale(
                    modelScale - 0.02
                );
                setKeyPressDirection(null)
                break;
            default:
                return;
        }
    }

    function SelectToZoom({ children }) {
        const api = useBounds()
        return (
            <group
                onClick={(e) => (e.stopPropagation(),
                    e.delta <= 2 && api.refresh(e.object).fit())
                }
                onPointerMissed={
                    (e) => e.button === 0 && api.refresh().fit()
                }

            >
                {children}
            </group>
        )
    }
    const ref = useRef()

    // function Dodecahedron({ ...props }) {
    //     const [clicked, setClicked] = useState(false)
    //     // Using this allows the focussed and hover state to be rendered visible
    //     const a11y = useA11y()



    //     return (
    //         // // Wrap the items that should recieve focus in the A11y tag
    //         // <A11y
    //         //     role="button"
    //         //     // This would be unique to each item on the canvas to indicate what it is or does
    //         //     description="Show label"
    //         //     // Is equal to title text and appears on hover of the item
    //         //     showAltText
    //         // >
    //         <mesh {...props}
    //             ref={shapeRef}
    //             onClick={(e) => { setClicked(!clicked) }}
    //         >
    //             <dodecahedronGeometry />
    //             <meshStandardMaterial
    //                 roughness={0.75}
    //                 color={a11y.focus || a11y.hover ? "yellow" : "green"}
    //                 emissive={a11y.focus ? "#cc4444" : a11y.hover ? "yellow" : "green"}
    //             />

    //             {clicked || a11y.pressed && (
    //                 <Html distanceFactor={10}>
    //                     <div className="content"
    //                         tabIndex="0">
    //                         {props.labelContent}

    //                     </div>
    //                 </Html>
    //             )
    //             }
    //         </mesh>
    //         // </A11y >
    //     )
    // }

    function keypressDiscover() {
        // addEventListener('keyup', (e) => {
        e.preventDefault()
        console.log(e)
        // check what key was pressed...
        if (e.code === 'ArrowRight' || e.code === 'ArrowLeft' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
            setKeyPressDirection(e.code.substring(5).toLowerCase())
        } else if (e.code === 'NumpadAdd' || e.code === 'NumpadSubtract') {
            setKeyPressDirection(e.code.substring(6).toLowerCase())
        } else { return }
        // });
    }

    function CustomCamera(props) {
        const cameraRef = useRef()
        const set = useThree(({ set }) => set)
        const size = useThree(({ size }) => size)
        useLayoutEffect(() => {
            if (cameraRef.current) {
                cameraRef.current.aspect = size.width / size.height
                cameraRef.current.updateProjectionMatrix()
            }
        }, [size, props])

        useLayoutEffect(() => {
            set({ camera: cameraRef.current })
        }, [])

        return <perspectiveCamera ref={cameraRef}
            position={[0, 5, 8]}
        />
    }
    console.log(Model)
    return (
        <>
            <div className="main-container" id="container1">
                <MenuPanel
                    directionalMovement={directionalMovement}
                />

                <Canvas id="scene-container"
                    tabIndex='0'
                    onKeyDown={(e) => {
                        if (e.key === "-") {
                            directionalMovement('subtract')
                        } else if (e.key === "+") {
                            directionalMovement('add')
                        } else {
                            let slicedkeyCode = e.key.slice(5)
                            directionalMovement(slicedkeyCode.toLowerCase())
                        }
                    }}
                >
                    <axesHelper args={[50]} />
                    <CustomCamera />
                    <mesh >
                        <gridHelper />

                        <OrbitControls />
                        <ambientLight
                            intensity={0.5}
                        />
                        <directionalLight
                            position={[-2, 5, 2]}
                            intensity={1}
                        />
                        <Suspense fallback={<Progress />}>
                            <group ref={ref}
                            // Rotate the model group as a whole
                                rotation={[modelXPos, modelZPos, modelYPos]}
                                scale={modelScale} >
                                {/* Wrap the items that should recieve focus in the A11y tag */}
                                <A11y
                                    role="togglebutton"
                                    // This would be unique to each item on the canvas to indicate what it is or does
                                    description="I am the first shape"
                                    startPressed={false}
                                >
                                    <Model
                                        position={[-2, 0, 0]}
                                        labelContent="I am the first shape"
                                    />
                                </A11y>
                                <A11y
                                    role="togglebutton"

                                    description="I am the second shape"
                                    startPressed={false}
                                >
                                    <Model
                                        position={[0, -2, -3]}
                                        labelContent="I am the second shape" />
                                </A11y>
                                <A11y
                                    role="togglebutton"
                                    description="I am the THIRD shape"
                                    startPressed={false}
                                >
                                    <Model
                                        position={[1, 2, 1]}
                                        labelContent="I am the THIRD shape" />
                                </A11y>

                            </group>

                        </Suspense>
                    </mesh>

                </Canvas>
                <A11yAnnouncer />

            </div>
        </>

    )
}

export default SceneViewer