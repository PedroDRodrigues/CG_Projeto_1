/* global THREE, requestAnimationFrame, console */

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var camera, scene, renderer;

var frontalCamera, lateralCamera, topCamera, perspectiveCamera, orthogonalCamera;

var material, geometry, mesh;

var keysPressed = {};

var materials = [];

var robo = new THREE.Object3D();

var reboque = new THREE.Object3D();

var head = new THREE.Object3D();

var upper_body = new THREE.Object3D();

var abdomen = new THREE.Object3D();

var lower_body = new THREE.Object3D();

var arms = new THREE.Object3D();

var neck = new THREE.Object3D();

const rotationSpeed = 1.5;

const rotationSpeed2 = 1.6;

var chest_box = new THREE.Object3D();

var legs_box = new THREE.Object3D();

var wheels_box = new THREE.Object3D();

var container_box = new THREE.Object3D();

const ROBOT_LEGS_BOX = {
    x_max : null,
    x_min : null,
    y_max : null,
    y_min : null,
    z_max : null,
    z_min : null
};

const ROBOT_CHEST_BOX = {
    x_max : null,
    x_min : null,
    y_max : null,
    y_min : null,
    z_max : null,
    z_min : null 
};

const REBOQUE_WHEELS_BOX = {
    x_max : null,
    x_min : null,
    y_max : null,
    y_min : null,
    z_max : null,
    z_min : null
};

const REBOQUE_CONTAINER_BOX = {
    x_max : null,
    x_min : null,
    y_max : null,
    y_min : null,
    z_max : null,
    z_min : null
};

/////////////////////
/* CREATE SCENE(S) */
/////////////////////

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0xFFFFFF);

    scene.add(new THREE.AxisHelper(100));

    createRobo(-1, -18, 0);
    createReboque();
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////

function createCamera() {
    'use strict';

    //Camara inicial
    camera = new THREE.PerspectiveCamera(140,
        window.innerWidth / window.innerHeight,
        0.1,
        5000);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    var position = new THREE.Vector3(0, 0, 0);
    camera.lookAt(position);

    //Camara frontal
    frontalCamera = new THREE.OrthographicCamera(window.innerWidth / -7.5,
        window.innerWidth / 7.5,
        window.innerHeight / 7.5,
        window.innerHeight / -7.5);
    frontalCamera.position.x = 0;
    frontalCamera.position.y = 0;
    frontalCamera.position.z = 50;
    frontalCamera.lookAt(scene.position);

    //Camara lateral
    lateralCamera = new THREE.OrthographicCamera(window.innerWidth / -7.5,
        window.innerWidth / 7.5,
        window.innerHeight / 7.5,
        window.innerHeight / -7.5);
    lateralCamera.position.x = 50;
    lateralCamera.position.y = 0;
    lateralCamera.position.z = 0;
    lateralCamera.lookAt(scene.position);

    //Camara de topo
    topCamera = new THREE.OrthographicCamera(window.innerWidth / -7.5,
        window.innerWidth / 7.5,
        window.innerHeight / 7.5,
        window.innerHeight / -7.5);
    topCamera.position.x = 0;
    topCamera.position.y = 50;
    topCamera.position.z = 0;
    topCamera.lookAt(scene.position);

    //Camara perspetiva isometrica - proj perspetiva
    perspectiveCamera = new THREE.PerspectiveCamera(140, window.innerWidth / window.innerHeight, 0.1, 5000);    
    perspectiveCamera.position.x = 50;
    perspectiveCamera.position.y = 50;
    perspectiveCamera.position.z = 50;
    var position = new THREE.Vector3(0, 0, 0);
    perspectiveCamera.lookAt(position);

    //Camara perspetiva isometrica - proj ortogonal
    orthogonalCamera = new THREE.OrthographicCamera(-300, 300, 300, -300, 5, 1000);
    orthogonalCamera.position.x = 50;
    orthogonalCamera.position.y = 50;
    orthogonalCamera.position.z = 50;
    var position = new THREE.Vector3(0, 0, 0);
    orthogonalCamera.lookAt(position);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

function createLight() {
    'use strict';

}

//////////////////////
/*  CYLINDER CUBE SPHERE TORUS

    HEAD  ---------> 2 ANTENNA                                      (1 CUBE) + (2 CYLINDERS) 
          ---------> 2 EYES                                         (2 SPHERES)

    ARMS  ---------> EACH ONE HAS ONE FOREARM AND AN EXHAUST PIPE   (2 CUBE) + 2 * (CUBE + CYLINDER)

    BODY                                                            (1 CUBE)
    
    ABDOMEN                                                         (1 CUBE)

    WAIST ---------> 2 ROADS                                        (1 CYLINDER) + (2 TORUS)   

    THIGHS                                                          2 * (1 CUBE)  

    LEGS  ---------> EACH ONE HAS TWO ROADS                         2 * (1 CUBE) + 2 * (2 TORUS)

    FEETS                                                           2 * (1 CUBE)

*/

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function addHead(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(15, 12, 9);
    material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 10, y + 15, z - 5);
    materials.push(material);
    obj.add(mesh);

    geometry = new THREE.CylinderGeometry(1, 1, 4, 20);
    var material = new THREE.MeshBasicMaterial({ color: 0x7d3d3d });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 16, y + 23.5, z - 5);
    materials.push(material);
    obj.add(mesh);

    geometry = new THREE.CylinderGeometry(1, 1, 4, 20);
    material = new THREE.MeshBasicMaterial({ color: 0x7d3d3d });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 4, y + 23.5, z - 5);
    materials.push(material);
    obj.add(mesh);

    geometry = new THREE.SphereGeometry(1, 5, 50);
    material = new THREE.MeshBasicMaterial({ color: 0x008000 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 13, y + 16.5, z - 0.5);
    materials.push(material);
    obj.add(mesh);

    geometry = new THREE.SphereGeometry(1, 5, 50);
    material = new THREE.MeshBasicMaterial({ color: 0x008000 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 7, y + 16.5, z - 0.5);
    materials.push(material);
    obj.add(mesh);
}

function addNeck(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(3, 3, 8, 320);
    material = new THREE.MeshBasicMaterial({ color: 0x3d3d3d });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 10, y + 5, z - 5);
    materials.push(material);
    obj.add(mesh);
}

function addArm(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(10, 22, 10);
    material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x - 10, y + 13, z - 10);
    materials.push(material);
    obj.add(mesh);

    geometry = new THREE.BoxGeometry(10, 8, 25);
    material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x - 10, y - 2, z - 2.5);
    materials.push(material);
    obj.add(mesh);
}

function addArmExhaustPipe(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(2, 2, 10, 20);
    material = new THREE.MeshBasicMaterial({ color: 0x3d3d3d });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x - 15, y + 13, z - 15);
    mesh.rotation.y = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;
    materials.push(material);
    obj.add(mesh);
}

function addBody(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(30, 30, 20);
    material = new THREE.MeshBasicMaterial({ color: 0x008000 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 10, y + 9, z - 5);
    materials.push(material);
    obj.add(mesh);
}

function addAbdomen(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(15, 10, 20);
    material = new THREE.MeshBasicMaterial({ color: 0x3d3d3d });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 10, y - 5, z);
    materials.push(material);
    obj.add(mesh);
}

function addWaist(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(5, 5, 50, 10);
    material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 10, y - 20, z + 2);
    mesh.rotation.z = Math.PI / 2;
    materials.push(material);
    obj.add(mesh);
}

function addWaistRoad(obj, x, y, z) {
    'use strict';

    geometry = new THREE.TorusGeometry(6, 2, 50, 50);
    material = new THREE.MeshBasicMaterial({ color: 0x3d3d3d });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 35, y - 20, z + 2);
    mesh.rotation.y = Math.PI / 2;
    materials.push(material);
    obj.add(mesh);
}

function addThigh(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(15, 20, 10);
    material = new THREE.MeshBasicMaterial({ color: 0x008000 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x - 5, y - 33, z + 2);
    materials.push(material);
    obj.add(mesh);

    geometry = new THREE.BoxGeometry(15, 20, 10);
    material = new THREE.MeshBasicMaterial({ color: 0x008000 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 25, y - 33, z + 2);
    materials.push(material);
    obj.add(mesh);
}

function addLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(15, 30, 10);
    material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 25, y - 57, z + 2);
    materials.push(material);
    obj.add(mesh);

}

function addLegRoad(obj, x, y, z) {
    'use strict';

    geometry = new THREE.TorusGeometry(6, 2, 50, 50);
    material = new THREE.MeshBasicMaterial({ color: 0x3d3d3d });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x - 14, y - 44, z + 5);
    mesh.rotation.y = Math.PI / 2;
    materials.push(material);
    obj.add(mesh);

    geometry = new THREE.TorusGeometry(6, 2, 50, 50);
    material = new THREE.MeshBasicMaterial({ color: 0x3d3d3d });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x - 14, y - 63, z + 5);
    mesh.rotation.y = Math.PI / 2;
    materials.push(material);
    obj.add(mesh);

}

function addFeet(obj, x, y, z) {
    'use strict';

    geometry = new THREE.BoxGeometry(15, 10, 12.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x - 5, y - 77, z + 3.25);
    materials.push(material);
    obj.add(mesh);

    geometry = new THREE.BoxGeometry(15, 10, 12.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + 25, y - 77, z + 3.25);
    materials.push(material);
    obj.add(mesh);
}

function addBox(final ,obj) {

    geometry = new THREE.BoxGeometry(obj.x_max - obj.x_min, obj.y_max - obj.y_min, obj.z_max - obj.z_min);
    material = new THREE.MeshBasicMaterial({ color: 0x00ffd0 }); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((obj.x_max + obj.x_min)/2, (obj.y_max + obj.y_min)/2,(obj.z_max + obj.z_min) / 2);
    materials.push(material);
    final.add(mesh);
}

function createRobotBOX() {

    ROBOT_CHEST_BOX.x_max = 35;
    ROBOT_CHEST_BOX.x_min = -17;
    ROBOT_CHEST_BOX.y_max = 25;
    ROBOT_CHEST_BOX.y_min = -10;
    ROBOT_CHEST_BOX.z_max = 10;
    ROBOT_CHEST_BOX.z_min = -15;

    ROBOT_LEGS_BOX.x_max = 37;
    ROBOT_LEGS_BOX.x_min = -17;
    ROBOT_LEGS_BOX.y_max = 6;
    ROBOT_LEGS_BOX.y_min = -14;
    ROBOT_LEGS_BOX.z_max = 0;
    ROBOT_LEGS_BOX.z_min = -82;
}

function createRobo(x, y, z) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });

    addHead(head, 0, 0, 0);
    neck.add(head);
    addNeck(neck, 0, 0, 0);
    neck.position.set(0, 23, -5);
    robo.add(neck);

    addBody(upper_body, 0, 0, 0);
    addArm(upper_body, 0, 0, 0);
    addArmExhaustPipe(upper_body, 0, 0, 0);
    addArm(upper_body, 40, 0, 0);
    addArmExhaustPipe(upper_body, 50, 0, 0);
    robo.add(upper_body);

    addAbdomen(abdomen, 0, 0, 0);
    robo.add(abdomen);

    addWaist(lower_body, 0, 0, 0);
    addWaistRoad(lower_body, 0, 0, 0);
    addWaistRoad(lower_body, -50, 0, 0);
    addThigh(lower_body, 0, 0, 0);
    addLeg(lower_body, 0, 0, 0);
    addLegRoad(lower_body, 48, 0, 0);
    addLeg(lower_body, -30, 0, 0);
    addLegRoad(lower_body, 0, 0, 0);
    addFeet(lower_body, 0, 0, 0);
    robo.add(lower_body);

    createRobotBOX();

    scene.add(robo);  

    robo.position.x = x;
    robo.position.y = y;
    robo.position.z = z;
}

function checkIfTruck() {
    if (neck.rotation.x <= -Math.PI && lower_body.rotation.x >= Math.PI / 2
        && lower_body.children[11].rotation.x >= Math.PI / 2 && upper_body.children[1].position.x >= -10) {
        return true;
    }
    return false;
} 

function createReboqueBOX() {

    REBOQUE_CONTAINER_BOX.x_max = 25;
    REBOQUE_CONTAINER_BOX.x_min = -25;
    REBOQUE_CONTAINER_BOX.y_max = 20;
    REBOQUE_CONTAINER_BOX.y_min = -20;
    REBOQUE_CONTAINER_BOX.z_max = 100;
    REBOQUE_CONTAINER_BOX.z_min = -80;

    REBOQUE_WHEELS_BOX.x_max = 25;
    REBOQUE_WHEELS_BOX.x_min = -25;
    REBOQUE_WHEELS_BOX.y_max = -13;
    REBOQUE_WHEELS_BOX.y_min = -30;
    REBOQUE_WHEELS_BOX.z_max = -22;
    REBOQUE_WHEELS_BOX.z_min = -58; 
}

function createReboque() {
    'use strict';

    const container = new THREE.Mesh(
        new THREE.BoxGeometry(50, 40, 160), // Dimensions of the parent object
        new THREE.MeshBasicMaterial({ color: 0x808080 }) // Color of the parent object
    );

    materials.push(container.material);
    reboque.add(container);

    // Função para criar as rodas
    const wheelGeometry = new THREE.TorusGeometry(6, 2, 50, 50); // Geometry of the wheel cylinder
    const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x3d3d3d }); // Color da roda
    materials.push(wheelMaterial);

    // Roda dianteira esquerda
    const frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontLeftWheel.position.set(-25, -22, -50); // Position of the wheel
    frontLeftWheel.rotation.x += rotationSpeed;
    frontLeftWheel.rotation.z += rotationSpeed2;
    frontLeftWheel.rotation.y = Math.PI / 2;
    materials.push(frontLeftWheel.material);
    reboque.add(frontLeftWheel);

    // Roda dianteira direita
    const frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontRightWheel.position.set(25, -22, -50); // Position of the wheel
    frontRightWheel.rotation.x += rotationSpeed;
    frontRightWheel.rotation.z += rotationSpeed2;
    frontRightWheel.rotation.y = Math.PI / 2;
    materials.push(frontRightWheel.material);
    reboque.add(frontRightWheel);

    // Roda traseira esquerda
    const rearLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rearLeftWheel.position.set(-25, -22, -30); // Position of the wheel
    rearLeftWheel.rotation.x += rotationSpeed;
    rearLeftWheel.rotation.z += rotationSpeed2;
    rearLeftWheel.rotation.y = Math.PI / 2;
    materials.push(rearLeftWheel.material);
    reboque.add(rearLeftWheel);

    // Roda traseira direita
    const rearRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rearRightWheel.position.set(25, -22, -30); // Position of the wheel
    rearRightWheel.rotation.x += rotationSpeed;
    rearRightWheel.rotation.z += rotationSpeed2;
    rearRightWheel.rotation.y = Math.PI / 2;
    materials.push(rearRightWheel.material);
    reboque.add(rearRightWheel);

    // Função para criar a peça de ligação
    const hitch = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5, 40, 1000),
        new THREE.MeshBasicMaterial({ color: 0x999999 }) // Color of the hitch
    );
    hitch.position.set(0, -15, 80); // Position of the hitch
    hitch.rotation.x += 1.57;
    reboque.add(hitch);

    reboque.position.set(18, 0, -256); // Position of the reboque


    createReboqueBOX();

    materials.push(hitch.material);
    scene.add(reboque);
}

function alternate_mesh() {
    for (var i = 0; i < materials.length; i++) {
        materials[i].wireframe = !materials[i].wireframe;
    }
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////

function connect_reboque() {
    reboque.position.set(9, 0, -100); 
}

function checkCollision(box_Robot, box_Reboque) {
    return !(
        box_Robot.x_max < (box_Reboque.x_min + reboque.position.x) ||
        box_Robot.x_min > (box_Reboque.x_max + reboque.position.x) || 
        box_Robot.y_max < box_Reboque.y_min || 
        box_Robot.y_min > box_Reboque.y_max ||
        box_Robot.z_max < (box_Reboque.z_min + reboque.position.z) ||
        box_Robot.z_min > (box_Reboque.z_max + reboque.position.z));
}

function checkCollisions() {

    console.log(ROBOT_LEGS_BOX);
    console.log(REBOQUE_CONTAINER_BOX);

    let legsContainer = checkCollision(ROBOT_LEGS_BOX, REBOQUE_CONTAINER_BOX);
    let chestContainer = checkCollision(ROBOT_CHEST_BOX, REBOQUE_CONTAINER_BOX);
    let legsWheels = checkCollision(ROBOT_LEGS_BOX, REBOQUE_WHEELS_BOX);
    let chestWheels = checkCollision(ROBOT_CHEST_BOX, REBOQUE_WHEELS_BOX);

    return legsContainer || legsWheels || chestContainer || chestWheels;
}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////

function handleCollisions() {
    if (checkIfTruck())
        connect_reboque();
}

////////////
/* UPDATE */
////////////

const clock = new THREE.Clock();

function update() {
    'use strict';
    let delta_time = clock.getDelta();
    let rotation_speed = 1;
    let movement_speed = 10;
    let reboque_speed = 100;

    if (checkCollisions())
    {
        handleCollisions();
    }

    // MOVER REBOQUE

    var diff = new THREE.Vector3();
    if (keysPressed[37]) diff.x--; // left
    if (keysPressed[39]) diff.x++; // right
    if (keysPressed[38]) diff.z++; // up
    if (keysPressed[40]) diff.z--; // down
    if (diff.x || diff.z)
        reboque.position.add(diff.normalize().multiplyScalar(reboque_speed * delta_time));
    
    // RODAR PERNAS

    var legDiff = 0;
    if (keysPressed[83]) legDiff--; // S
    if (keysPressed[87]) legDiff++; // W
    if (legDiff) {
        lower_body.rotation.x += legDiff * rotation_speed * delta_time;
        // bounds check
        lower_body.rotation.x = Math.min(Math.max(lower_body.rotation.x, 0), Math.PI / 2)
    }

    // RODAR PES

    var footDiff = 0;
    if (keysPressed[65]) footDiff--; // A
    if (keysPressed[81]) footDiff++; // Q
    if (footDiff) {
        lower_body.children[11].rotation.x += footDiff * rotation_speed * delta_time;
        // bounds check
        lower_body.children[11].rotation.x = Math.min(Math.max(lower_body.children[11].rotation.x, 0), Math.PI / 2)
        // copy to other foot
        lower_body.children[12].rotation.x = lower_body.children[11].rotation.x
    }

    // RODAR CABECA

    var headDiff = 0;
    if (keysPressed[82]) headDiff--; // R
    if (keysPressed[70]) headDiff++; // F
    if (headDiff) {
        neck.rotation.x += headDiff * rotation_speed * delta_time;
        // bounds check
        neck.rotation.x = Math.min(Math.max(neck.rotation.x, -Math.PI), 0)
    }

    // MOVER BRACOS

    var armDiff = 0;
    if (keysPressed[69]) armDiff--; // E
    if (keysPressed[68]) armDiff++; // D
    if (armDiff) {
        armDiff *= movement_speed * delta_time;
        // isto precisa de ser refeito, usar children[] para referenciar objetos especificos é pedir problemas
        //falta isto        
        
        upper_body.children[1].position.x += armDiff;
        upper_body.children[2].position.x += armDiff;
        upper_body.children[3].position.x += armDiff;
        upper_body.children[4].position.x -= armDiff;
        upper_body.children[5].position.x -= armDiff;
        upper_body.children[6].position.x -= armDiff;
    }
}

/////////////
/* DISPLAY */
/////////////

function render() {
    'use strict';

    renderer.render(scene, camera);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    /* so existe resize para o trabalho C */
    //window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////

function animate() {
    'use strict';
    update();
    render();
    requestAnimationFrame(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////

function onKeyDown(e) {
    'use strict';
    keysPressed[e.keyCode] = true;
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
        case 54: //6 (alternar mesh between wireframe and solid)
            alternate_mesh();
            break;
        }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////

function onKeyUp(e) {
    'use strict';

    // Remove the released key from the keysPressed object
    delete keysPressed[e.keyCode];
}