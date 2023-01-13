import React from 'react'
import { Html, useProgress } from '@react-three/drei'


export default function Progress() {
    // reinstating the percentage loader causes a bad steState render to occur
    // const { progress } = useProgress()
    return <Html center>Loading...</Html>
}