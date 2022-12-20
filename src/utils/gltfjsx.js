import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from './loaders/GLTFLoader';

let modelInstanceArr = [];

export default function processGltf() {
    const gltf = useLoader(GLTFLoader, '../../dist/assets/gltf/double-mushroom.gltf');

    for (const property in gltf.nodes) {
        let parentMesh = {
            name: '',
            children: []
        }
        // if its the scene ignore, this is top level and not an individual parent
        if (gltf.nodes[property].name === "Scene") {
            continue
        } else {
            // if it has a parent...
            for (const childProperty in gltf.nodes[property]) {
                if (childProperty == 'parent') {

                    let parentMeshName = gltf.nodes[property][childProperty].name
                    // and that parent is Scene, it is a main container for child meshes to make up an object
                    if (parentMeshName == 'Scene') {
                        Object.create(parentMesh);
                        // Store it as a parent object
                        parentMesh.name = gltf.nodes[property].name
                        modelInstanceArr.push(parentMesh)
                    } else {
                        // otherwise it has a true parent container that it needs to sit within to render in the scene
                        for (var i = 0; i < modelInstanceArr.length; i++) {
                            if (parentMeshName === modelInstanceArr[i].name) {
                                modelInstanceArr[i].children.push(property)
                            }
                        }
                    }

                }
            }
        }
    }
    console.log(modelInstanceArr)
}




