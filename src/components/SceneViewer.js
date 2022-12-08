
// Entry point of react App
import React, { Suspense, useState, useEffect, useRef, useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Bounds, useBounds, Html } from '@react-three/drei'
import { A11yAnnouncer, A11y, useA11y, useUserPreferences } from '@react-three/a11y'


import MenuPanel from './MenuPanel'
import Progress from './Progress'
import Model from './Model'

import '../styles.scss'
const SceneViewer = () => {

    const [a11yMessage, setA11yMessage] = useState('test');
    const [modelScale, setModelScale] = useState(1);
    const [modelXPos, setModelXPos] = useState(0);
    const [modelYPos, setModelYPos] = useState(0);
    const [modelZPos, setModelZPos] = useState(0);
    const [keypressDirection, setKeyPressDirection] = useState(null)
    const { a11yPrefersState } = useUserPreferences()


    let targetDefault = [0, 5, 8]
    const [targetLocation, setTargetLocation] = useState(targetDefault);


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
            position={targetLocation}
        />
    }
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

                        <OrbitControls
                        // target={targetLocation}
                        />
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
                                    startPressed={false}
                                    activationMsg="I am the FIRST shape"
                                    deactivationMsg=""
                                // actionCall={() => (setTargetLocation([0, 8, 8]))}

                                >
                                    <Model
                                        position={[-2, 0, 0]}
                                        labelContent="I am the FIRST shape"
                                    // setTargetLocation={setTargetLocation}

                                    />
                                </A11y>
                                <A11y
                                    role="togglebutton"
                                    startPressed={false}
                                    activationMsg="I am the SECOND shape"
                                    deactivationMsg=""
                                >
                                    <Model
                                        position={[0, -2, -3]}
                                        labelContent="I am the SECOND shape"
                                    // setTargetLocation={setTargetLocation}
                                    />

                                </A11y>
                                <A11y
                                    role="togglebutton"
                                    startPressed={false}
                                    // description="I am the THIRD shape"
                                    activationMsg="I am the THIRD shape"
                                    deactivationMsg=""
                                >
                                    <Model
                                        position={[1, 2, 1]}
                                        labelContent="I am the THIRD shape"
                                        // setTargetLocation={setTargetLocation}
                                        setA11yMessage={setA11yMessage}

                                    />
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