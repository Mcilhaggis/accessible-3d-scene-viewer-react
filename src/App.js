
// Entry point of react App
import React, { Suspense, useState, useEffect } from "react";
import { Canvas, camera } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei'

import MenuPanel from './components/MenuPanel'
import Progress from './components/Progress'
import SceneViewer from './components/SceneViewer'

import './styles.scss'

const App = () => {
  // Find all DOM containers
  // document.querySelectorAll('.flowchart-container')
  //   .forEach((domContainer, index) => {
  //     // Read the config from a data-* attribute.
  //     const _config = domContainer.dataset.config;
  //     let _tfc = (_config !== undefined && _config !== '') ? (<SceneViewer id={index} config={_config} />) : (<div classNAme='warn'>Error: SceneViewer - Missing config</div >);

  //     ReactDOM.render(_tfc, domContainer);
  //   });

  // For each model folder output a Sceneviewer pointing to its respective glft file in assets
  return (
    <>
      <div className="holder">
        <SceneViewer />
      </div>
    </>

  )
}

export default App