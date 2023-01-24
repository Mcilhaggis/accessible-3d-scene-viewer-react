import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { A11y, useA11y } from '@react-three/a11y'
import { Html } from '@react-three/drei'
import ChildMesh from './ChildMesh'

let gltf;
export default function ParentMesh(props) {
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
  let currentItemJSON = props.jsonData.find(x => x.geometry === props.name);
  if (currentItemJSON != undefined) {
    labelContent = currentItemJSON.labelContent
    labelDistance = currentItemJSON.labelDistance
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
          if (currentItemJSON && currentItemJSON.labelContent != undefined) {
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

        {/* HIDE */}
        {clicked || a11y.focus || hovered || a11y.hover || a11y.pressed ? <meshStandardMaterial
          attach="material"
          color={clicked || a11y.pressed ? "purple" : a11y.focus ? "blue" : a11y.hover ? "pink" : ""}
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
                currentItemJSON={currentItemJSON['children'] ? currentItemJSON['children'][index] : undefined}
              />
            </A11y>
          )
        })
        : console.log("no children ")}
    </>
  )
}

useGLTF.preload(gltf)
