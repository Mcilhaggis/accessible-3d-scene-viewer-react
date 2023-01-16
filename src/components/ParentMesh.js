import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { A11y, useA11y } from '@react-three/a11y'
import { Html } from '@react-three/drei'
import ChildMesh from './ChildMesh'

let gltf;
export default function ParentMesh(props, name) {
  console.log('props.jsonData', props.jsonData)
  console.log('props.index', props.index)
  console.log('props.name', name)

  let parentProperties = props.mesh
  gltf = parentProperties.src

  const { nodes, materials } = useGLTF(gltf)
  const [hasLabel, setHasLabel] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  let positioning = Object.values(parentProperties.position)
  const meshRef = useRef()
  // Using this allows the focussed and hover state to be rendered visible
  const a11y = useA11y()
  let labelContent;
  let labelDistance;
console.log('test', props.jsonData[props.index])
  if (props.jsonData[props.index] != undefined) {
    labelContent = props.jsonData[props.index].labelContent
    labelDistance = props.jsonData[props.index].labelDistance
  } else {
    labelContent = ''
    labelDistance = 0
  }
  return (
    <>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          setClicked(!clicked)
          if (props.jsonData[props.index].labelContent != undefined) {
            setHasLabel(true)
          } else {
            setHasLabel(false)

          }
          if (a11y.pressed) {
            a11y.pressed = false
          } else {
            a11y.pressed = true
          }
        }}

        key={`containerMesh` + props.index}
        geometry={nodes[parentProperties.name]["geometry"]}
        material={parentProperties.material}
        position={positioning}

        ref={meshRef}
        onPointerOver={e => {
          e.stopPropagation()
          // Trigger re-render
          setHovered(true)
          // Set for a11y users
          a11y.hover = true

        }}
        onPointerLeave={e => {
          e.stopPropagation()
          setHovered(false)
          a11y.hover = false
        }}
      >
        {clicked || a11y.focus || hovered || a11y.hover || a11y.pressed ? <meshStandardMaterial
          attach="material"
          color={clicked || a11y.pressed ? "purple" : a11y.focus ? "blue" : a11y.hover ? "grey" : ""}
        /> : ""}

        {clicked && hasLabel && (
          <Html distanceFactor={labelDistance}>
            <div
              className="content"
              tabIndex="-1"
            >
              {labelContent}
            </div>
          </Html>
        )}
        {/* duplicate code for tab and enter clicking and mouse clicking - could be reduced but I can't get them to work in one  */}
        {a11y.pressed && (

          <Html distanceFactor={labelDistance}>
            <div
              className="content"
              tabIndex="-1"
            >
              {labelContent}
            </div>
          </Html>
        )}
      </mesh>

      {parentProperties.children ?
        parentProperties.children.map((mesh, index) => {
          console.log('parentProperties', parentProperties)
          return (
            <A11y
              key={`Ally` + index}
              role="togglebutton"
              startPressed={false}
              activationMsg={mesh.A11yMessage}
              deactivationMsg=""
              tabindex="-1"
              a11yElStyle={{ pointerEvents: 'none' }}

            >
              <ChildMesh
                key={`childMesh` + index}
                index={index}
                mesh={mesh}
                geometry={nodes[mesh]["geometry"]}
                material={nodes[mesh]["material"]}
              />
            </A11y>
          )
        })
        : console.log("no children ")}
    </>
  )
}

useGLTF.preload(gltf)
