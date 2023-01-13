import React from 'react'
import ParentMesh from './ParentMesh'
import { A11y, useA11y } from '@react-three/a11y'
import processGltf from '../utils/gltfjsx'

export default function Model(props) {
  // console.log('$$$$$$', props.config)

  
  let meshArr = props.meshes
  // **PASS THE SRC FILE HERE FORM THE JSON
  let meshDetails = processGltf(props.config)
  // console.log('meshDetails', meshDetails)

  return (
    <>
      {meshDetails.map((mesh, index) => {
        return (
          <group {...props} dispose={null} scale={50} key={`group` + index}>
            <A11y
              key={props.index}
              role="togglebutton"
              startPressed={false}
              // activationMsg={mesh.A11yMessage}
              deactivationMsg=""
              tabindex="-1"
              a11yElStyle={{ pointerEvents: 'none' }}
            >
              <ParentMesh
                key={`parent` + index}
                index={index}
                mesh={mesh}
                gltf={mesh.gltf}
              />
            </A11y>
          </group>
        )
      })}
    </>
  )
}
