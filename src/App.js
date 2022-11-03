
// Entry point of react App
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei'

import MenuPanel from './components/MenuPanel2'
import Progress from './components/Progress'
import Trailer from './components/Trailer'

import './styles.scss'
const App = () => {
    return (
        <>
            <div className="main-container" id="container1">
                <MenuPanel />
                {/* Trailer */}
                <Canvas id="scene-container">
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
                        <Trailer />
                    </Suspense>
                </Canvas>
            </div>
        </>

    )
}

export default App