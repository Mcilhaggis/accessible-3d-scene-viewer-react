import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from './loaders/GLTFLoader';
import { DRACOLoader } from './loaders/DRACOLoader';

let srcfile;
// let srcfile = '../../dist/assets/gltf/trashes.gltf'

// **PASS THE SRC FILE FROM THE JSON
export default function processGltf(props) {
    let modelInstanceArr = []
    srcfile = props[0].gltf
    let gltf = useLoader(GLTFLoader, srcfile, loader => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./libs/draco/');
        loader.setDRACOLoader(dracoLoader);
    });

    // console.log('gltf', gltf)
    for (const property in gltf.nodes) {
        let parentMesh = {
            name: '',
            position: {},
            material: '',
            children: [],
            src: srcfile
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
                    if (parentMeshName == 'Scene' && !modelInstanceArr.some(e => e.name === gltf.nodes[property].name)) {
                        // the model is rendering twice, to avoid adding too many items to the array until figured issue out - addeed this some function catch
                        Object.create(parentMesh);
                        // Store it as a parent object
                        parentMesh.name = gltf.nodes[property].name
                        parentMesh.position = gltf.nodes[property].position
                        parentMesh.material = gltf.nodes[property].material
                        modelInstanceArr.push(parentMesh)
                    }
                    else {
                        // otherwise it has a true parent container that it needs to sit within to render in the scene
                        for (var i = 0; i < modelInstanceArr.length; i++) {
                            if (parentMeshName === modelInstanceArr[i].name) {
                                if (!modelInstanceArr[i].children.includes(property)) {
                                    modelInstanceArr[i].children.push(property)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return modelInstanceArr
    
}