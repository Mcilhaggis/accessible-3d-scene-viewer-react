# Three.js Scene Viewer with React-fiber

A scene viewr built in react using React-fiber and drei. Organically created webpack folder and Babel inetegration. 

```
npm i
```
```
npm run build
```
To rebuild and reload the live server while making changes
```
webpack --watch
```
This will create main file and basic set up to let the application run 

## Packages Used
- react
- babel
- webpack 
- three
- @react-three/fiber
- @react-three/drei
- @react-three/a11y
https://github.com/pmndrs/react-three-a11y 

### To load scss files:
- sass
- sass-loader
- node-sass

To create a css file from the scss files, from the root folder run:
```
 sass src/styles.scss src/styles.css
```


To render glTF files as 2.0 version, which renders, meshes, shadings and animations differently. 
- gltf-pipeline

Once you have your original gltf file, go to the folder it's in and run the following to process and rename the file. 

```
 gltf-pipeline -i src/img/castle_of_loarre/scene.gltf -o dist/assets/gltf/castle.gltf -d
```
Convert the new gltf file into a jsx file with the following command.
```
npx gltfjsx castle.gltf
```

## Wants: 
- No screen reader description
- Use Raycasting to interact with model on screen
- Use JSON file to render model and inital positioning
- Render if there is more than one on the webpage using its repsenctive json file to populate content.
- Click on an area and use lookAt() to focus in on an area
- alert to screen reader that interactive is visible and can be clicked


## Stretch goals
- Having a test page for users to test lighting, camera position and scale 
- Convert to Typescript
- Saturation slider for offering colour contrast controls
- When rotaing the item have the screen reader read out if new visuals/items are now visible

## Concerns to tackle from Sketchfab integration:
- No movement of object with keyboard when in orbit mode, and limited movement in first-person mode


## Features
- Import data (images and controls) from json files
- Custom built collapsable menu for clickable and tabbable key board interaction
- Use arrow keys to rotate model
- At 200% zoom container and visual are maintained
---

## Resources
Royalty free textures found using: https://www.textures.com/

## Accessbility 
- Possbly add information based of the grid location of certain items (like a chess board)

