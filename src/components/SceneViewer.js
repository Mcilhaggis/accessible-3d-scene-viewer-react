
// Entry point of react App
import React, { Suspense, useState, useEffect, useRef, useLayoutEffect } from "react";
import { Canvas, camera, setDefaultCamera, Camera, PerspectiveCamera, useThree } from "@react-three/fiber"
import { OrbitControls, Bounds, useBounds, Html, KeyboardControls } from '@react-three/drei'

import MenuPanel from './MenuPanel'
import Progress from './Progress'
import Model from './Model'
// import CustomCamera from './CustomCamera'

import '../styles.scss'
const SceneViewer = () => {
    const [modelScale, setModelScale] = useState(0.021);
    const [modelZPos, setModelZPos] = useState(4.5);
    const [modelXPos, setModelXPos] = useState(0);
    const [keypressDirection, setKeyPressDirection] = useState(null)

    useEffect(() => {
        console.log(keypressDirection)
        directionalMovement(keypressDirection);
    }, [keypressDirection]); // 

    // let modelName = 'castle'

    // addEventListener('keyup', (e) => {
    //     e.preventDefault()

    //     // check what key was pressed...
    //     if (e.code === 'ArrowRight' || e.code === 'ArrowLeft' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
    //         props.setKeyPressDirection(e.code.substring(5).toLowerCase())
    //     } else if (e.code === 'NumpadAdd' || e.code === 'NumpadSubtract') {
    //         props.setKeyPressDirection(e.code.substring(6).toLowerCase())
    //     } else { return }
    // });


    const directionalMovement = (direction) => {
        console.log(direction)
        switch (direction) {
            case 'down':
                console.log('down')

                setModelXPos(
                    modelXPos + 1
                );
                setKeyPressDirection(null)
                break;
            case 'up':
                setModelXPos(
                    modelXPos - 0.01
                );
                setKeyPressDirection(null)
                break;
            case 'left':
                setModelZPos(
                    modelZPos - 0.01
                )
                setKeyPressDirection(null)
                break;
            case 'right':
                setModelZPos(
                    modelZPos + 0.1
                )
                setKeyPressDirection(null)
                break;
            case 'add':
                setModelScale(
                    modelScale + 1.1
                );
                setKeyPressDirection(null)
                break;
            case 'subtract':
                setModelScale(
                    modelScale - 0.9
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
    const shapeRef = useRef()

    function Dodecahedron({ ...props }) {
        const [clicked, click] = useState(false)

        return (
            <mesh {...props}
                ref={shapeRef}
                onClick={(event) => {
                    click(!clicked)
                }}
            >
                <dodecahedronGeometry />

                <meshStandardMaterial roughness={0.75} emissive="#404057" />
                {clicked && (
                    <Html distanceFactor={10}>
                        <div className="content">
                            {props.labelContent}

                        </div>
                    </Html>
                )}
            </mesh>
        )
    }

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
        position={[modelXPos, 0, modelZPos]} />
    }



    return (
        <>
            <div className="main-container" id="container1"
            >
                <MenuPanel
                    directionalMovement={directionalMovement}

                />
                <Canvas id="scene-container"
                    tabIndex='0'
                    onKeyDown={(e) => {
                        let slicedkeyCode = e.key.slice(5)
                        directionalMovement(slicedkeyCode)
                    }
                    }
                >

                    <CustomCamera 
                    // position={[modelXPos, modelZPos, modelScale]}
                     />
                    <mesh >

                        <gridHelper />

                        {/* <OrbitControls /> */}
                        <ambientLight
                            intensity={0.5}
                        />
                        <directionalLight
                            position={[-2, 5, 2]}
                            intensity={1}
                        />
                        <Suspense fallback={<Progress />}>
                            <group ref={ref}>
                                <Dodecahedron
                                    position={[-2, 0, 0]}
                                    labelContent="shape 1" />
                                <Dodecahedron
                                    position={[0, -2, -3]}
                                    labelContent="shape 2" />
                            </group>

                        </Suspense>
                    </mesh>

                </Canvas>

            </div>
        </>

    )
}

export default SceneViewer