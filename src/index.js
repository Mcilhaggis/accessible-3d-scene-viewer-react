import React from 'react';
import ReactDOM from 'react-dom';
import SceneViewer from './components/SceneViewer'
import './styles.scss'


import App from './App';
ReactDOM.render(
    <App />,
    document.querySelector('#root')
)


// Find all DOM containers
document.querySelectorAll('.holder')
  .forEach((domContainer, index) => {
    console.log(domContainer, index)
    // Read the config from a data-* attribute.
    const _config = domContainer.dataset.config;

    let _tfc = (_config !== undefined && _config !== '') ? (<SceneViewer id={index} config={_config} />) : (<div class='warn'>error: 3D Object Viewer - missing config</div >);

    ReactDOM.render(_tfc, domContainer);
  });