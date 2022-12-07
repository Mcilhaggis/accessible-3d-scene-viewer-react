// import React, {useRef, useLayoutEffect} from 'react';
// import { useThree, PerspectiveCamera } from '@react-three/fiber'



// export default function CustomCamera(props) {
//     const cameraRef = useRef()
//     const set = useThree(({ set }) => set)
//     const size = useThree(({ size }) => size)

//     useLayoutEffect(() => {
//         if (cameraRef.current) {
//             cameraRef.current.aspect = size.width / size.height
//             cameraRef.current.updateProjectionMatrix()
//         }
//     }, [size, props])

//     useLayoutEffect(() => {
//         set({ camera: cameraRef.current })
//     }, [])

//     return <PerspectiveCamera ref={cameraRef} />
// }
 