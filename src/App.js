
// Entry point of react App
import React, { Suspense, useState } from "react";
import { Canvas, camera } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei'

import MenuPanel from './components/MenuPanel2'
import Progress from './components/Progress'
import Model from './components/Model'

import './styles.scss'

const App = () => {

    const [modelScale, setModelScale] = useState(0.021);
    const [modelZPos, setModelZPos] = useState(4.5);



    return (
        <>
            <div className="main-container" id="container1">
                <MenuPanel
                    modelScale={modelScale}
                    setModelScale={setModelScale}
                    modelZPos={modelZPos}
                    setModelZPos={setModelZPos}
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
                        />
                    </Suspense>
                </Canvas>
            </div>
        </>

    )
}

export default App