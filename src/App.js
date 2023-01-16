
// Entry point of react App
import React from "react";

const App = () => {
  // For each model folder output a Sceneviewer pointing to its respective glft file in assets
  return (
    <>
      <div className="scene-viewer-holder" data-config="./data/sv-1.json">
      </div>
      <div className="scene-viewer-holder" data-config="./data/sv-2.json">
      </div>
    </>

  )
}

export default App