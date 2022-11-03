import React from 'react'
import { Html, useProgress } from '@react-three/drei'


export default function Loader() {
    console.log("loader running ")
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}