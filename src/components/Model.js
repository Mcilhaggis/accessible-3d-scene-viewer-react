import React from 'react'
import ParentMesh from './ParentMesh'
import { A11y } from '@react-three/a11y'
import processGltf from '../utils/gltfjsx'

export default function Model(props) {
  let meshDetails = processGltf(props.config['models'])
  // {console.log('*****props*******', props)}

  return (
    <>
      {meshDetails.map((mesh, index) => {
        return (
          <group {...props} dispose={null} scale={50} key={`group` + index}>
            <A11y
              key={props.index}
              role="togglebutton"
              startPressed={false}
              activationMsg={props.jsonData.A11yMessage}
              deactivationMsg=""
              tabindex="-1"
              a11yElStyle={{ pointerEvents: 'none' }}
            >
              <ParentMesh
                key={`parent` + index}
                name={mesh['name']}
                index={index}
                mesh={mesh}
                gltf={mesh.gltf}
                jsonData={props.jsonData}
              />
            </A11y>
          </group>
        )
      })}
    </>
  )
}
