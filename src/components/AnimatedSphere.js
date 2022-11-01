import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function AnimatedSphere() {
    return (
        <Sphere visible 
        args={[1, 100, 200]}
        scale={2}
         >
            <MeshDistortMaterial 
            color="yellow"
            atach="material"
            distort={0.6}
            roughness={1}
            />
         </Sphere>
    )
}