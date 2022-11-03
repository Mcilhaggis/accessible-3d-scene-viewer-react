import GUI from 'lil-gui';
import React, {useEffect} from 'react'

const createGui = () => {

    console.log(document.getElementById('container1'))

    const gui = new GUI({
        container: document.getElementById('container1')
    });
    

    const myObject = {
        myString: 'lil-gui',
        moveLeft: function () { alert('move left') },
        moveRight: function () { alert('move right') },
        moveUp: function () { alert('move up') },
        moveDown: function () { alert('move down') }
    }
    // keyboard Controls
    gui.add(myObject, 'moveLeft'); // ButtonLeft
    gui.add(myObject, 'moveRight'); // ButtonRight
    gui.add(myObject, 'moveUp'); // ButtonUp
    gui.add(myObject, 'moveDown'); // ButtonDown


    let guiMenu = gui

    return { guiMenu }
}

export default createGui();