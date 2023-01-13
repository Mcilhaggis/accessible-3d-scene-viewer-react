
// Entry point of react App
import React from "react";

const App = () => {
  // For each model folder output a Sceneviewer pointing to its respective glft file in assets
  return (
    <>
      <div className="holder" data-config="num1">
      </div>

      <div className="holder" data-config="../../dist/assets/gltf/sv-1.json">
      </div>

    </>

  )
}

export default App