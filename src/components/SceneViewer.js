
// Entry point of react App
import React, { Suspense, useState, useEffect, useRef, useLayoutEffect, componentDidMount } from "react";
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, useBounds } from '@react-three/drei'
import { A11yAnnouncer, useUserPreferences } from '@react-three/a11y'

import MenuPanel from './MenuPanel'
import Progress from './Progress'
import Model from './Model'

import '../styles.scss'
const SceneViewer = (props) => {
    let arrOfModels;
    const [modelScale, setModelScale] = useState(1);
    const [modelXPos, setModelXPos] = useState(0);
    const [modelYPos, setModelYPos] = useState(0);
    const [modelZPos, setModelZPos] = useState(0);
    const ref = useRef()
    let targetDefault = [0, 70, 80]
    const [targetLocation, setTargetLocation] = useState(targetDefault);
    const [keypressDirection, setKeyPressDirection] = useState(null)
    const [objectFocus, setObjectFocus] = useState(null)
    const { a11yPrefersState } = useUserPreferences()
    const [configData, setConfigData] = useState([]);
    let responseClone;
    console.log('test')
    const getData = () => {
        fetch(props.config
            , {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  }
            }
        )
            .then(function (response) {
                responseClone = response.clone(); // 2
                return response.json();
            })
            .then(function (myJson) {
                setConfigData(myJson)
            }), function (rejectionReason) { // 3
                console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
                responseClone.text() // 5
                    .then(function (bodyText) {
                        console.log('Received the following instead of valid JSON:', bodyText); // 6
                    });
            }

    }
    useEffect(() => {
        getData()
    }, [])

    if (configData['models'] != undefined) {
        arrOfModels = configData['models']
    }


    // arrOfModels= configData
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
            <div className="main-container" id={`container` + props.id}>
                <MenuPanel
                    directionalMovement={directionalMovement}
                    navigateObjWithMenu={navigateObjWithMenu}
                />

                <Canvas id={`scene-container-` + props.id}
                    className='canvasItem'
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

                                {arrOfModels && arrOfModels.map((model, index) => {
                                    return (
                                        <Model
                                            key={`Model-` + index}
                                            index={index}
                                            position={model.position}
                                            jsonData={arrOfModels[index].meshes}
                                            labelContent={model.meshes[index]}
                                            labelDistance={10}
                                            config={configData}
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