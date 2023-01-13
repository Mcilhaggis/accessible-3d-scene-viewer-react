
// Entry point of react App
import React from "react";

import SceneViewer from './components/SceneViewer'
import './styles.scss'
    
const App = () => {

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