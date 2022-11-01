
// Entry point of react App
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei'

import Box from './components/Box'
import Sphere from './components/AnimatedSphere'
import Trailer from './components/Trailer'

import './styles.scss'
const App = () => {
    return (
        <>
            <div>Hello World! </div>
            {/* <Canvas className="canvas">
                <OrbitControls
                    enableZoom={false}
                />
                <ambientLight
                    intensity={0.5}
                />
                <directionalLight
                    position={[-2, 5, 2]}
                    intensity={1}
                />
                <Suspense fallback={null}>
                    <Box />
                </Suspense>
            </Canvas> */}
            {/* Sphere */}
            <Canvas className="canvas">
                <OrbitControls
                    enableZoom={false}
                />
                <ambientLight
                    intensity={0.5}
                />
                <directionalLight
                    position={[-2, 5, 2]}
                    intensity={1}
                />
                <Suspense fallback={null}>
                    <Sphere />
                </Suspense>
            </Canvas>
            {/* Trailer */}
            <Canvas className="canvas">
                <OrbitControls
                    enableZoom={false}
                />
                <ambientLight
                    intensity={0.5}
                />
                <directionalLight
                    position={[-2, 5, 2]}
                    intensity={1}
                />
                <Suspense fallback={null}>
                    <Trailer />
                </Suspense>
            </Canvas>
        </>
    )
}

export default App