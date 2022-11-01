import React from 'react';

// import { useLoader } from '@react-three/fiber';
// import { TextureLoader } from 'three/src/loaders/TextureLoader';
// import texture from '../img/walltexture.jpg';

export default function Box() {
    // Needs a loder and an imput 
    // const colorMap = useLoader(TextureLoader, texture)
    return (
        // class that represents polygon mesh objects -  geometry and a material 
        <mesh
            rotation={[90, 0, 20]}
        >
            <boxGeometry
                attach="geometry"
                args={[3, 3, 3]}
            />
            <meshNormalMaterial
            attach="material"
            />
        </mesh>
    )
}