/* global THREE, requestAnimationFrame, console */

var camera, scene, renderer;

var frontalCamera, lateralCamera, topCamera, perspectiveCamera, orthogonalCamera;

var material, geometry, mesh;

/*  CYLINDER CUBE SPHERE TORUS

    HEAD  ---------> 2 ANTENNA                                      (1 CUBE) + (2 CYLINDERS) 
          ---------> 2 EYES                                         (2 SPHERES)

    ARMS  ---------> EACH ONE HAS ONE FOREARM AND AN EXHAUST PIPE   (2 CUBE) + 2 * (CUBE + CYLINDER)

    BODY                                                            (1 CUBE)
    
    ABDOMEN                                                         (1 CUBE)

    WAIST ---------> 2 ROADS                                        (1 CYLINDER) + (2 TORUS)   

    THIGHS                                                          (2 CUBE)  

    LEGS  ---------> EACH ONE HAS TWO ROADS                         (2 CUBE) + 2 * (2 TORUS)

    FEETS                                                           (2 CUBE)

    */

function addHead(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(15, 12, 9);
    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

    geometry = new THREE.CylinderGeometry(1, 1, 5, 20);
    material = new THREE.MeshBasicMaterial({ color: 0x7d3d3d, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 6, y + 8.5, z);
    obj.add(mesh);

    geometry = new THREE.CylinderGeometry(1, 1, 5, 20);
    material = new THREE.MeshBasicMaterial({ color: 0x7d3d3d, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x - 6, y + 8.5, z);
    obj.add(mesh);

    /*geometry = new THREE.SphereGeometry(1, 5, 50);
    material = new THREE.MeshBasicMaterial({ color: 0x008000, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 3, y + 1.5, z + 4.5);
    obj.add(mesh);*/

    geometry = new THREE.CircleGeometry(1, 5, 50);
    material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 3, y + 1.5, z + 4.5);

    geometry = new THREE.SphereGeometry(1, 5, 50);
    material = new THREE.MeshBasicMaterial({ color: 0x008000, wireframe: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x - 3, y + 1.5, z + 4.5);
    obj.add(mesh);
}

function addArm(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(2, 10, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

    geometry = new THREE.CubeGeometry(2, 10, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z + 6);
    obj.add(mesh);

    geometry = new THREE.CylinderGeometry(1, 1, 2, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 5, z + 3);
    obj.add(mesh);
}

function addBody(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(30, 30, 30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 10, y - 21, z);
    obj.add(mesh);
}

function addAbdomen(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(10, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addWaist(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(2, 2, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

    geometry = new THREE.TorusGeometry(3, 1, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    //mesh.rotation.x = Math.PI / 2;
    obj.add(mesh);

    geometry = new THREE.TorusGeometry(3, 1, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    //mesh.rotation.x = Math.PI / 2;
    //mesh.rotation.z = Math.PI / 2;
    obj.add(mesh);
}

function addThigh(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(2, 10, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

    geometry = new THREE.CubeGeometry(2, 10, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z + 6);
    obj.add(mesh);
}

function addLeg(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(2, 10, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

    geometry = new THREE.TorusGeometry(3, 1, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    //mesh.rotation.x = Math.PI / 2;
    obj.add(mesh);

    geometry = new THREE.TorusGeometry(3, 1, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    //mesh.rotation.x = Math.PI / 2;
    //mesh.rotation.z = Math.PI / 2;
    obj.add(mesh);
}

function addFeet(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(2, 2, 5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

    geometry = new THREE.CubeGeometry(2, 2, 5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z + 6);
    obj.add(mesh);
}

function createRobo(x, y, z) {
    'use strict';

    var robo = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addHead(robo, 10, 0, 0);
    addBody(robo, 0, 0, 0);
    //addArm(robo, 10, 0, 0);
    //addArm(robo, -10, 0, 0);
    //addAbdomen(robo, -10, 0, 0);
    //addWaist(robo, -20, 0, 0);
    //addThigh(robo, -25, -5, 0);
    //addLeg(robo, -25, -15, 0);
    //addLeg(robo, -25, -20, 0);
    //addFeet(robo, -25, -20, 0);

    scene.add(robo);

    robo.position.x = x;
    robo.position.y = y;
    robo.position.z = z;
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0xFFFFFF);

    scene.add(new THREE.AxisHelper(10));

    createRobo(0, 0, 0);
}

function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
    case 49: //1 (frontal)
        camera = frontalCamera;
        break;    
    case 50: //2 (lateral)
        camera = lateralCamera;
        break;
    case 51: //3 (topo)
        camera = topCamera;
        break;
    case 52: //4 (perspetiva isometrica - proj perspetiva)
        camera = perspectiveCamera;
        break;
    case 53: //5 (perspetiva isometrica - proj ortogonal)
        camera = orthogonalCamera;
        break;
    }

}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    //Camara frontal
    frontalCamera = new THREE.OrthographicCamera(window.innerWidth / -10, 
            window.innerWidth / 10,        
            window.innerHeight / 10,
            window.innerHeight / -10);
    frontalCamera.position.x = 0;
    frontalCamera.position.y = 0;
    frontalCamera.position.z = 50;
    frontalCamera.lookAt(scene.position);

    //Camara lateral
    lateralCamera = new THREE.OrthographicCamera(70,
            window.innerWidth / window.innerHeight,
            1,
            1000);
    lateralCamera.position.x = 50;
    lateralCamera.position.y = 0;
    lateralCamera.position.z = 0;
    lateralCamera.lookAt(scene.position);

    //Camara de topo
    topCamera = new THREE.OrthographicCamera(70,
            window.innerWidth / window.innerHeight,
            1,
            1000);
    topCamera.position.x = 0;
    topCamera.position.y = 50;
    topCamera.position.z = 0;
    topCamera.lookAt(scene.position);

    //Camara perspetiva isometrica - proj perspetiva
    perspectiveCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    perspectiveCamera.position.x = 50;
    perspectiveCamera.position.y = 50;
    perspectiveCamera.position.z = 50;
    perspectiveCamera.lookAt(scene.position);

    //Camara perspetiva isometrica - proj ortogonal
    orthogonalCamera = new THREE.OrthographicCamera(-5, 5, 5, -5, 1, 1000);
    orthogonalCamera.position.x = 50;
    orthogonalCamera.position.y = 50;
    orthogonalCamera.position.z = 50;
    var position = new THREE.Vector3(0, 0, 0);
    orthogonalCamera.lookAt(position/*scene.position*/);

    render();

    window.addEventListener("keydown", onKeyDown);
    /* so existe resize para o trabalho C */
    window.addEventListener("resize", onResize);

}

function animate() {
    'use strict';

    /*if (ball.userData.jumping) {
        ball.userData.step += 0.04;
        ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)));
        ball.position.z = 15 * (Math.cos(ball.userData.step));
    }*/
    render();

    requestAnimationFrame(animate);

}
