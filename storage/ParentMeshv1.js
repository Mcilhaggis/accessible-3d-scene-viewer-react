// import React, { useRef, useState } from 'react'
// import { useGLTF } from '@react-three/drei'
// import { A11y, useA11y } from '@react-three/a11y'
// import { Html } from '@react-three/drei'
// // import ChildMesh from './ChildMesh'



// let gltf;
// export default function ParentModel(props) {
//   gltf = props.gltfFile
//   let meshArr = props.meshes
//   const { nodes, materials } = useGLTF(props.gltfFile)
//   const [clicked, setClicked] = useState(false)
//   const meshRef = useRef()

//   // Using this allows the focussed and hover state to be rendered visible
//   const a11y = useA11y()
//   console.log(a11y)
//   return (
//     <group {...props} dispose={null} scale={50}>
//       {meshArr.map((mesh, index) => {
//         {console.log(a11y)}
//         return (
//           <A11y
//           key={index}
//             role="togglebutton"
//             startPressed={false}
//             activationMsg={mesh.A11yMessage}
//             deactivationMsg=""
//             tabindex="0"
          
//           >
//             <mesh
//               onClick={(e) => {
//                 e.stopPropagation()
//                 console.log("parent clicked")
//                 setClicked(!clicked)
      
//               }}
//               key={`containerMesh` + index}
//               geometry={nodes[mesh.geometry]["geometry"]}
//               material={materials[mesh.material]}
//               ref={meshRef}
//             >

//               {clicked || a11y.focus || a11y.hover || a11y.pressed ? <meshStandardMaterial
//                 attach="material"
//                 color={clicked || a11y.pressed ? "purple" : a11y.focus ? "blue" : a11y.hover ? "grey" : "green"}
//               /> : ""}


//               {/* Should have || A11y clicked but not wokring correctly- redcues clickable space to the absolute div that holds the alabels original position */}
//               {clicked && (

//                 <Html distanceFactor={mesh.labelDistance}>
//                   <div
//                     className="content"
//                     tabIndex="-1"
//                   >
//                     {mesh.labelContent}
//                   </div>
//                 </Html>
//               )}
//               {/* duplicate code for tab and enter clicking and mouse clicking - could be reduced but I can't get them to work in one  */}
//               {a11y.pressed && (

//                 <Html distanceFactor={mesh.labelDistance}>
//                   <div
//                     className="content"
//                     tabIndex="-1"
//                   >
//                     {mesh.labelContent}
//                   </div>
//                 </Html>
//               )}
//              {/* {...children} */}
//             </mesh>
//           </A11y>
//         )
//       })}
//     </group >
//   )
// }

// useGLTF.preload(gltf)
