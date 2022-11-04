
// Entry point of react App
import React, { Suspense, useState, useEffect } from "react";
import { Canvas, camera } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei'

import MenuPanel from './components/MenuPanel'
import Progress from './components/Progress'
import Model from './components/Model'

import './styles.scss'

const App = () => {

    const [modelScale, setModelScale] = useState(0.021);
    const [modelZPos, setModelZPos] = useState(4.5);
    const [modelXPos, setModelXPos] = useState(3);

    const [keypressDirection, setKeyPressDirection] = useState(null)

    useEffect(() => {
        directionalMovement(keypressDirection);
        console.log('keypres changed its', keypressDirection)
      }, [keypressDirection]); // 


    const directionalMovement = (direction) => {
        switch (direction) {
            case 'up':
                setModelXPos(
                    modelXPos + 0.01
                );
                setKeyPressDirection(null)
                break;
            case 'down':
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
                    modelZPos + 0.01
                )
                setKeyPressDirection(null)
                break;
            case 'add':
                setModelScale(
                    modelScale * 1.1
                );
                setKeyPressDirection(null)
                break;
            case 'subtract':
                setModelScale(
                    modelScale * 0.9
                );
                setKeyPressDirection(null)
                break;
            default:
                return;
        }
    }


    return (
        <>
            <div className="main-container" id="container1">
                <MenuPanel
                    directionalMovement={directionalMovement}
                />
                {/* Trailer */}
                <Canvas
                    id="scene-container"
                    camera={{ position: [0, 0, 4.5] }}
                >
                    <OrbitControls
                    // enableZoom={false}
                    />
                    <ambientLight
                        intensity={0.5}
                    />
                    <directionalLight
                        position={[-2, 5, 2]}
                        intensity={1}
                    />
                    <Suspense fallback={<Progress />}>
                        <Model
                            modelScale={modelScale}
                            setModelScale={setModelScale}

                            modelZPos={modelZPos}
                            setModelZPos={setModelZPos}

                            modelXPos={modelXPos}
                            setModelXPos={setModelXPos}

                            keypressDirection={keypressDirection}
                            setKeyPressDirection={setKeyPressDirection}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </>

    )
}

export default App