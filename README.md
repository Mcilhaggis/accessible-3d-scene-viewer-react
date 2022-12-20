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

To update gh pages run: 

npm run deploy


Because we set this up the package.json like so:   
```
  "deploy": "gh-pages -d dist"
```
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

Once you have your original gltf file, go to the folder it's in and run the following to process and rename the file. I think if its already a 2.0 glft file skip this step

```
 gltf-pipeline -i src/img/donutV2.gltf -o dist/assets/gltf/donutV2.gltf -d
```
Navigate to the folder hosting the gltf file and convert the new gltf file into a jsx file with the following command.
```
npx gltfjsx double-mushroom.gltf
```

Export blender file as glft (combined)
Drop into gltf folder - shouldn't need to run a node command


## Wants: 
- Render if there is more than one container on the webpage using its repsective json file to populate content.
- Click/or tab on an area and use lookAt() to focus in on an area
- Reduced motion and reduced color scheme considerations
- A small window with any labelled text that is static at the side of the screen?

## Stretch goals
- Having a test page for users to test lighting, camera position and scale 
- Convert to Typescript
- Saturation slider for offering colour contrast controls
- When rotaing the item have the screen reader read out if new visuals/items are now visible (raycasting)

## Features
- Use arrow keys to rotate and scale model
- Custom built collapsable menu for clickable and tabbable key board interaction
- Screen reader descriptions added with A11y for each model on screen
- Interact with model on screen using mouse or keybaord to reveal labels, these are also read by the screen reader
- Uses JSON file to render model, labels and inital positioning
- At 200% zoom container and visual are maintained
- Insert GLTF model and interact with the different parts of a model
---

## Resources
Royalty free textures found using: https://www.textures.com/

## Accessbility 
- Possbly add information based of the grid location of certain items (like a chess board)

A11y allows us to navigate a second DOM that represents a version of the 3d rendering and use sematics that are required for assistive technologies. This library makes sure everything is placed in order and same 2d location as primary DOM. Aria live regions are available to give status updates on the page. 

 Including prefers-reduced-motion & prefers-color-scheme = https://docs.pmnd.rs/a11y/access-user-preferences 


## Future Development Ideas from this baseline
 - Sticker placing game withere you drop itms on the plane and can switch out the stickers. You
Drop a ball, a park bench, a slide, a flower into a scene - 

https://www.littleworkshop.fr/



