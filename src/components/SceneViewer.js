
// Entry point of react App
import React, { Suspense, useState, useEffect, useRef, useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Bounds, useBounds, Html } from '@react-three/drei'
import { A11yAnnouncer, A11y, useA11y, useUserPreferences } from '@react-three/a11y'


import MenuPanel from './MenuPanel'
import Progress from './Progress'
import Model from './Model'

import Models from '../json/modelJSON.json'

import '../styles.scss'
const SceneViewer = () => {
    let arrOfModels = Models.models

    const [modelScale, setModelScale] = useState(1);
    const [modelXPos, setModelXPos] = useState(0);
    const [modelYPos, setModelYPos] = useState(0);
    const [modelZPos, setModelZPos] = useState(0);
    const ref = useRef()
    let targetDefault = [0, 5, 8]
    const [targetLocation, setTargetLocation] = useState(targetDefault);
    const [keypressDirection, setKeyPressDirection] = useState(null)
    const [objectFocus, setObjectFocus] = useState(null)
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
    function navigateObjWithMenu(direction) {
        // console.log(direction)
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
                    navigateObjWithMenu={navigateObjWithMenu}
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

                                {/* {arrOfModels.map((model, index) => {
                                    return (<A11y
                                        key={index}
                                        role="togglebutton"
                                        startPressed={false}
                                        activationMsg={model.activationMsg}
                                        deactivationMsg=""
                                        tabindex="1"
                                    >
                                        <Model
                                            key={index}
                                            position={model.position}
                                            labelContent={model.labelContent}
                                            labelDistance={model.labelDistance}
                                            geometry={model.geometry}
                                        />
                                    </A11y>
                                    )
                                })} */}

                                {arrOfModels.map((model, index) => {
                                    return (
                                        <Model
                                            key={`Model-` + index}
                                            position={model.position}
                                            labelContent={model.labelContent}
                                            labelDistance={model.labelDistance}
                                            meshes={model.meshes}
                                            gltfFile={model.gltf}
                                        />
                                    )
                                })}




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