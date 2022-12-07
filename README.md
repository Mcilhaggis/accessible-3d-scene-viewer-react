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
- Use JSON file to render model and inital positioning
- Render if there is more than one on the webpage using its repsenctive json file to populate content.
- Click/or tab on an area and use lookAt() to focus in on an area
- Reduced motion and reduced color scheme considerations

## Stretch goals
- Having a test page for users to test lighting, camera position and scale 
- Convert to Typescript
- Saturation slider for offering colour contrast controls
- When rotaing the item have the screen reader read out if new visuals/items are now visible

## Features
- Import data (images and controls) from json files
- Custom built collapsable menu for clickable and tabbable key board interaction
- Use arrow keys to rotate and scale model
- At 200% zoom container and visual are maintained
- Screen reader descriptions added with A11y for each model on screen
- - Interact with model on screen using mouse or keybaord to reveal labels, these are also read by the screen reader
---

## Resources
Royalty free textures found using: https://www.textures.com/

## Accessbility 
- Possbly add information based of the grid location of certain items (like a chess board)

AA11y allows us to navigate a second DOM that represents a version of the 3d rendering and use sematics that are required for assistive technologies. This library makes sure everything is placed in order and same 2d location as primary DOM. Aria live regions are available to give status updates on the page. 

 Including prefers-reduced-motion & prefers-color-scheme = https://docs.pmnd.rs/a11y/access-user-preferences 
