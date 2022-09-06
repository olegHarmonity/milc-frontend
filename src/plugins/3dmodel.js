/* eslint-disable */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "./THREEOrbitControls.js";
import { GUI } from "./GuiModule.js";
import * as TWEEN from "@tweenjs/tween.js";
import { debounce } from "lodash";
import router from "@/router";
import { Water } from "@/plugins/Water";
import { Sky } from "./Sky.js";
import { JoyStick } from "./toon3d.js";
import store from "@/store";

function initWalkingMode() {
  /* walking loader */

  if (cityMode === "walking") {
    loaderWalking = new FBXLoader();
    loaderWalking.load("FireFighter.fbx", function (object) {
      object.mixer = new THREE.AnimationMixer(object);
      player.mixer = object.mixer;
      player.root = object.mixer.getRoot();

      object.name = "FireFighter";

      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = false;
        }
      });

      const tLoader = new THREE.TextureLoader();
      tLoader.load("SimplePeople_FireFighter_Brown.png", function (texture) {
        object.traverse(function (child) {
          if (child.isMesh) {
            child.material.map = texture;
          }
        });
      });

      player.object = new THREE.Object3D();
      player.object.scale.multiplyScalar(0.1);
      player.object.position.y = 7;
      scene.add(player.object);
      player.object.add(object);

      animations.Idle = object.animations[0];

      loadNextAnim(loaderWalking);
    });
  }

  /* end walking loader */
}

function changeCityMode(mode = "") {
  //cityMode = mode;
  //console.log("changeCityMode1: " + cityMode);

  if (cityMode === "walking") cityMode = "rotation";
  else cityMode = "walking";
  //console.log("changeCityMode2: " + cityMode);

  if (cityMode === "walking") {
    elementCityMode.innerHTML = "City Mode";
    controls.dispose();
    initWalkingMode();
  } else {
    initControls();
    elementCityMode.innerHTML = "Walking Mode";

    //
    if (player && player.object) scene.remove(player.object);
    colliders = [];
    colliders_spec = [];
    joystick = null;
    player = {};
    animations = {};
    anims = [
      "Walking",
      "Walking Backwards",
      "Turn",
      "Running",
      "Pointing Gesture",
    ];
    var element = document.getElementById("JoyStick");
    element.remove();
    camera.position.set(2000, 600, 3100);
    camera.updateProjectionMatrix();
  }
}

//console.log("robot", process.env.VUE_APP_SHOW_ROBOT);
if (process.env.VUE_APP_SHOW_ROBOT && process.env.VUE_APP_SHOW_ROBOT === "1") {
  var elementCityMode = document.createElement("div");
  elementCityMode.style.cssText =
    "cursor: pointer;position: absolute;bottom: 150px;border-radius: 6px;left: 20px; z-index: 9998;padding: 15px;background: rgb(0, 0, 0);text-align: center;color: rgb(255, 255, 255);opacity: 0.8;font-size: 11px;";
  elementCityMode.innerHTML = "Walking Mode";
  elementCityMode.style.visibility = "hidden";
  elementCityMode.addEventListener("click", changeCityMode);
  document.body.appendChild(elementCityMode);
}

var hex = 0xff0000;
var rangeMaterial = null;
var sphereMaterial = null;
var sphere = null;

var bbox = null;

/*
  "FR",
  "LR",
  "RR",
  "LF",
  "FR_1",
  "LR_1",
  "RR_1",
  "LF_1",
  "FR_2",
  "LR_2",
  "RR_2",
  "LF_2",
  "jeep",
"IinfinityM45_blue5-m45_blue",
*/

var blocked_elements = [
  "Underconstruction",
  "Cinema_import2",
  "City_limit_zone_1",
  "City_limit_zone_2",
  "City_limit_zone_3",
  "City_limit_zone_4",
  "Cinema_import3",
  "Building_19-Building_1",
  "Builiding",
  "Fountain-Concrete_roadside",
  "Fountain1",
  "Fountain",
  "Fountain-Concrete_roadside",
];
var allowed_elements = [
  "Cinema_import",
  "Cube75",
  "Cube74",
  "Cube8",
  "Cube82_1",
  "Cube76",
  "Cube77",
  "Cube78",
  "Cube2",
  "Cube19",
  "Cinema_import-Asphalt",
  "Cube2-Concrete_roadside",
  "Cinema_import-Concrete_roadside",
  "WATER",
];

var blocked_elements_2 = [
  "Cinema_import_1",
  "Cinema_import1",
  "Cinema_import2",
  "Cinema_import3",
  "Cinema_import5",
  "Cinema_import_2",
  "Cinema_import_5",
  "Landscape1",
  "Landscape",
  "Landscape3",
];

var allowed_elements2 = ["Cube82_1", "Cube8_1"];
//rotation, walking
var cityMode = "rotation";
var sky;
var currentTime = null;
var sunSphere = null;
var mesh = null;
var water = null;
var blnFound = false;
var clickConfirmRequest = false;
var clickConfirmApproved = false;
var clickEvent = null;
var clickObjectName = null;
var clickObjectItem = null;
var clickObjectBuilding = null;
var sun = null;
let parameters;
const materials = [];
var particles = [];
//var particleImage = new Image();
//particleImage.src = "snow.png";
THREE.Cache.enabled = true;

var timeClicked = 0;

var lat = null;
var long = null;
var antilat = null;
var antilong = null;
var antitz = null;
var herenow = null;
var antiherenow = null;
var sunPos;
var antisunPos;
var ele3js = 0.3977;
var azi3js = 0.1642;

var clock = new THREE.Clock();

/* walking start */
var colliders = [];
var colliders_spec = [];

var joystick = null;
var player = {};
var animations = {};
var anims = [
  "Walking",
  "Walking Backwards",
  "Turn",
  "Running",
  "Pointing Gesture",
];

var moveForward = 0;
var moveRotate = 0;

const setAction = (name) => {
  const action = player.mixer.clipAction(animations[name]);
  action.time = 0;
  player.mixer.stopAllAction();
  player.action = name;
  player.actionTime = Date.now();
  player.actionName = name;

  //action.fadeIn(0.5);
  action.play();
};
const getAction = () => {
  if (player === undefined || player.actionName === undefined) return "";
  return player.actionName;
};
const playerControl = (forward, turn) => {
  turn = -turn;

  if (forward > 0.3) {
    if (player.action != "Walking" && player.action != "Running")
      setAction("Walking");
  } else if (forward < -0.3) {
    if (player.action != "Walking Backwards") setAction("Walking Backwards");
  } else {
    forward = 0;
    if (Math.abs(turn) > 0.1) {
      if (player.action != "Turn") setAction("Turn");
    } else if (player.action != "Idle") {
      setAction("Idle");
    }
  }

  if (forward == 0 && turn == 0) {
    player.move = undefined;
    // console.log("setuj nula");
  } else {
    player.move = { forward, turn };
  }

  // console.log(forward, turn);
};
const activeCamera = (object) => {
  player.cameras.active = object;
};
const loadNextAnim = (loaderPl) => {
  let anim = anims.pop();
  // console.log(anim);
  loaderPl.load(`${anim}.fbx`, function (object) {
    animations[anim] = object.animations[0];
    if (anims.length > 0) {
      loadNextAnim(loaderPl);
    } else {
      createCameras();
      createColliders();
      joystick = new JoyStick({
        onMove: playerControl,
        game: scene,
      });
      anims = null;
      setAction("Idle");
      animate();
    }
  });
};

const createColliders = () => {
  colliders = [];
  colliders_spec = [];

  //console.log(scene.children);

  //console.log(scene.children[5].children, "usao 1");

  //colliders.push(water);
  var sceneObjects = scene.children[5].children;

  sceneObjects.map(function (sceneChildObj, sceneChildObjKey) {
    //console.log(sceneObj);
    //  console.log(sceneChildObj);

    if (
      sceneChildObj.name === "IinfinityM45_blue5" ||
      sceneChildObj.name.includes("Iinfinit") ||
      sceneChildObj.name.includes("Car")
    ) {
      // if (!allowed_elements.includes(sceneChildObj.name))
      //colliders.push(sceneChildObj);
      pushColiders(sceneChildObj, sceneChildObj.name);
      //console.log("push " + sceneChildObj.name);
    } else if (sceneChildObj.type === "Mesh") {
      //    console.log("dodaj item", childItem);
      // if (!allowed_elements.includes(sceneChildObj.name))
      pushColiders(sceneChildObj, sceneChildObj.name);
    }

    if (sceneChildObj.children) {
      sceneChildObj.children.forEach((childItem) => {
        if (childItem.type === "Mesh") {
          //    console.log("dodaj item", childItem);
          //    if (!allowed_elements.includes(childItem.name))
          //colliders.push(childItem);
          pushColiders(childItem, childItem.name);
        }

        if (childItem.children) {
          childItem.children.forEach((childItem2) => {
            if (childItem2.type === "Mesh") {
              //    console.log("dodaj item", childItem);
              //   if (!allowed_elements.includes(childItem2.name))
              //colliders.push(childItem2);
              pushColiders(childItem2, childItem2.name);

              if (childItem2.children) {
                childItem2.children.forEach((childItem3) => {
                  if (childItem3.type === "Mesh") {
                    //   console.log("dodaj item 3", childItem3);
                    //   if (!allowed_elements.includes(childItem2.name))
                    //colliders.push(childItem3);
                    pushColiders(childItem3, childItem3.name);
                  }
                });
              }
            }
          });
        }
      });
    }
  });

  //console.log("kraj", colliders, colliders_spec);
};
var blocked_coliders = ["Cube81_1", "Cube82_1", "Cube83_1", "Cube80"];
const pushColiders = (item, name) => {
  if (!blocked_coliders.includes(name)) {
    colliders.push(item);
  } else {
    console.log("blocked colider " + name);
  }
  name = name.toLowerCase();
  if (name.includes("building")) {
    colliders_spec.push(item);
  }
};
const createCameras = () => {
  const offset = new THREE.Vector3(0, 80, 0);
  const front = new THREE.Object3D();
  front.position.set(112, 100, 600);
  front.parent = player.object;
  const back = new THREE.Object3D();
  back.position.set(0, 300, -600);
  back.parent = player.object;
  const wide = new THREE.Object3D();
  wide.position.set(178, 139, 1665);
  wide.parent = player.object;
  const overhead = new THREE.Object3D();
  overhead.position.set(0, 400, 0);
  overhead.parent = player.object;
  const collect = new THREE.Object3D();
  collect.position.set(40, 82, 94);
  collect.parent = player.object;
  player.cameras = { front, back, wide, overhead, collect };
  activeCamera(player.cameras.back);
};

const movePlayer = (dt) => {
  const pos = player.object.position.clone();
  pos.y += 60;
  const speed = player.action == "Running" ? 100 : 15;
  let dir = new THREE.Vector3();
  player.object.getWorldDirection(dir);
  if (player.move.forward < 0) dir.negate();
  let raycaster = new THREE.Raycaster(pos, dir);
  let blocked = false;

  if (colliders !== undefined) {
    const intersect = raycaster.intersectObjects(colliders);
    if (intersect.length > 0) {
      if (intersect[0].distance < 50) blocked = true;
    }
  }

  if (!blocked) {
    if (player.move.forward > 0) {
      player.object.translateZ(dt * speed);
    } else {
      player.object.translateZ(-dt * 30);
    }
  }

  if (colliders !== undefined) {
    //cast left
    dir.set(-1, 0, 0);
    dir.applyMatrix4(player.object.matrix);
    dir.normalize();
    raycaster = new THREE.Raycaster(pos, dir);

    let intersect = raycaster.intersectObjects(colliders);
    if (intersect.length > 0) {
      if (intersect[0].distance < 50)
        player.object.translateX(10 - intersect[0].distance);
    }

    //cast right
    dir.set(1, 0, 0);
    dir.applyMatrix4(player.object.matrix);
    dir.normalize();
    raycaster = new THREE.Raycaster(pos, dir);

    intersect = raycaster.intersectObjects(colliders);
    if (intersect.length > 0) {
      if (intersect[0].distance < 50)
        player.object.translateX(intersect[0].distance - 10);
    }

    //cast down
    dir.set(0, -1, 0);
    pos.y += 100;
    raycaster = new THREE.Raycaster(pos, dir);
    const gravity = 30;

    var blnBlockRotate = false;
    intersect = raycaster.intersectObjects(colliders);
    if (intersect.length > 0) {
      //  console.log("intersect2 ", intersect);
      const targetY = pos.y - intersect[0].distance;
      if (intersect[0].object.name.includes("City_limit")) {
        blnBlockRotate = true;
        if (player.move.forward > 0) {
          player.object.translateZ(-dt * speed - 50);
          //player.object.translateX(intersect[0].distance - 10);
        } else {
          player.object.translateZ(dt * 30 + 50);
          //player.object.translateX(intersect[0].distance - 10);
        }

        // console.log("usao u limit");
      } else if (
        intersect[0].object.name.toLowerCase().includes("car") ||
        intersect[0].object.name.toLowerCase().includes("jeep") ||
        intersect[0].object.name.toLowerCase().includes("infinity") ||
        intersect[0].object.name.toLowerCase().includes("audi")
      ) {
        blnBlockRotate = true;
        if (player.move.forward > 0) {
          player.object.translateZ(-dt * speed - 25);
          //player.object.translateX(intersect[0].distance - 10);
        } else {
          player.object.translateZ(dt * 30 + 25);
          //player.object.translateX(intersect[0].distance - 10);
        }

        //  console.log("usao u limit auto");
      } else {
        if (targetY > player.object.position.y) {
          //Going up

          //  console.log("1: targetY " + targetY);
          if (targetY < 10) {
            player.object.position.y =
              0.8 * player.object.position.y + 0.2 * targetY;
            player.velocityY = 0;
          } else {
            blnBlockRotate = true;
            if (player.move.forward > 0) {
              player.object.translateZ(-dt * speed - 25);
              //player.object.translateX(intersect[0].distance - 10);
            } else {
              player.object.translateZ(dt * 30 + 25);
              //player.object.translateX(intersect[0].distance - 10);
            }
          }
        } else if (targetY < player.object.position.y) {
          //Falling
          //console.log("2: targetY " + targetY);

          if (player.velocityY == undefined) player.velocityY = 0;
          player.velocityY += dt * gravity;
          player.object.position.y -= player.velocityY;
          if (player.object.position.y < targetY) {
            player.velocityY = 0;
            player.object.position.y = targetY;
          }
        }
      }
    } else if (player.object.position.y > 0) {
      if (player.velocityY == undefined) player.velocityY = 0;
      player.velocityY += dt * gravity;
      player.object.position.y -= player.velocityY;
      if (player.object.position.y < 0) {
        player.velocityY = 0;
        player.object.position.y = 0;
      }
    }
  }

  if (!blnBlockRotate) player.object.rotateY(player.move.turn * dt);
};
const movePlayerOld = (dt) => {
  //console.log(dt);
  const pos = player.object.position.clone();

  pos.y += 40;
  let dir = new THREE.Vector3();
  player.object.getWorldDirection(dir);
  if (player.move.forward < 0) dir.negate();

  //let from = new THREE.Vector3(0, 100, 0);
  //let direction = new THREE.Vector3(0, -1, 0);

  //  dir.applyMatrix4(player.object.matrix);
  //  dir.normalize();
  let raycaster = new THREE.Raycaster(pos, dir);
  let blocked = false;
  // const colliders = colliders;

  var carBlocked = false;
  //console.log("move", colliders);

  if (colliders !== undefined) {
    const intersect = raycaster.intersectObjects(colliders);
    // console.log(intersect);
    if (intersect.length > 0) {
      //   console.log("intersect prvi uslov", intersect);
      let blnRoad = false;
      if (intersect[0].object.name.includes("road")) blnRoad = true;
      else if (intersect[0].object.name.includes("asphalt")) blnRoad = true;
      else if (intersect[0].object.name.includes("roadside")) blnRoad = true;
      else if (intersect[0].object.name.includes("Asphalt")) blnRoad = true;

      if (blnRoad) {
        // console.log("ROAD " + intersect[0].object.name);
      }
      let blnExtraMaterial = false;
      if (
        intersect[0].object.name === "Cube87_1" ||
        intersect[0].object.name === "Cube86_1" ||
        intersect[0].object.name === "Cube81-Asphalt_-_Procedural_-_New"
      ) {
        blnRoad = false;
        blnExtraMaterial = true;
      }

      if (!blnRoad) {
        if (blocked_elements.includes(intersect[0].object.name)) {
          // console.log("blokiraj element odmah");
          if (intersect[0].distance < 30) blocked = true;
        } else {
          if (
            intersect[0].object.name.includes("Iinfinit") ||
            intersect[0].object.name.includes("Car")
          ) {
            carBlocked = true;
            //console.log("car blocked " + intersect[0].object.name);
            if (intersect[0].distance < 50) blocked = true;
          } else {
            if (intersect[0].distance < 50) blocked = true;
          }
        }

        if (blnExtraMaterial) {
          //console.log("extra material");
          if (intersect[0].distance <= 50) blocked = true;
        }
      }

      //if (blocked_elements_2.includes(intersect[0].object.name)) {
      //  console.log("sadrzi blokirano ");
      //  if (intersect[0].distance <= 90) blocked = true;
      // }

      //if (intersect[0].distance <= 0) blocked = true;

      let countBlocked = 0;
      let countAllowed = 0;
      let blnFinished = false;

      // if (blnRoad) {
      // } else {
      /*
      intersect.map((elIntersect, indexIntersect) => {
        if (!blnFinished) {
          if (allowed_elements.includes(elIntersect.object.name)) {
            console.log("allowed");
          } else {
            if (blocked_elements.includes(elIntersect.object.name)) {
              console.log("blokiran " + elIntersect.object.name);
              if (elIntersect.distance <= 50) {
                blocked = true;
                countBlocked++;
                blnFinished = true;
              }
            }
          }
        }
      });
      */
      // }
      //  console.log("provjera", intersect, intersect.length);

      if (blocked) {
        if (allowed_elements2.includes(intersect[0].object.name)) {
          blocked = false;
          //console.log("dozvoli kretanje " + intersect[0].object.name);
        }
      }

      if (blocked_elements_2.includes(intersect[0].object.name)) {
        //console.log("sadrzi blokirano ");
        if (intersect[0].distance <= 60) blocked = true;
      }

      if (blocked_elements.includes(intersect[0].object.name)) {
        //  console.log("sadrzi blokirano2 ");
        if (intersect[0].distance <= 60) blocked = true;
      }
    }
  }

  if (!blocked) {
    if (player.move.forward > 0) {
      const speed = player.action == "Running" ? 100 : 15;
      player.object.translateZ(dt * speed);
    } else {
      player.object.translateZ(-dt * 15);
    }
  } else {
    // console.log("blocked");
  }

  if (!blocked) {
    if (colliders !== undefined) {
      //cast left
      dir.set(-1, 0, 0);
      dir.applyMatrix4(player.object.matrix);
      dir.normalize();
      raycaster = new THREE.Raycaster(pos, dir);

      let intersect = raycaster.intersectObjects(colliders);
      if (intersect.length > 0) {
        //  console.log("intersects2", intersect);

        if (intersect[0].distance < 50) {
          if (!blocked_elements.includes(intersect[0].object.name)) {
            player.object.translateX(100 - intersect[0].distance);
          }
        }
      }

      //cast right
      dir.set(1, 0, 0);
      dir.applyMatrix4(player.object.matrix);
      dir.normalize();
      raycaster = new THREE.Raycaster(pos, dir);

      intersect = raycaster.intersectObjects(colliders);
      if (intersect.length > 0) {
        // console.log("intersects3", intersect);

        if (intersect[0].distance < 50) {
          if (!blocked_elements.includes(intersect[0].object.name)) {
            player.object.translateX(intersect[0].distance - 100);
          }
        }
      }

      //cast down
      dir.set(0, -1, 0);
      //pos.y += 60;
      raycaster = new THREE.Raycaster(pos, dir);
      const gravity = 50;

      intersect = raycaster.intersectObjects(colliders);
      if (intersect.length > 0) {
        //if (!blocked) {
        //   console.log("intersects4", intersect);
        if (!blocked_elements.includes(intersect[0].object.name)) {
          //if (!blocked_elements.includes(intersect[0].object.name)) {
          const targetY = pos.y - intersect[0].distance;
          if (targetY > player.object.position.y) {
            //Going up
            // if (targetY < 10) {

            // console.log("target y " + targetY);
            if (targetY < 7) {
              player.object.position.y =
                0.8 * player.object.position.y + 0.2 * targetY;
              player.velocityY = 0;
            } else {
              //player.object.position.y = player.object.position.y;
              player.object.position.x = pos.x - 3.5;
              //player.velocityY = 0;
            }
            // player.velocityX = 0;

            //  } else {

            //  }
          } else if (targetY < player.object.position.y) {
            //Falling
            //  if (targetY < 10) {
            // console.log("pada ", targetY);

            if (player.velocityY == undefined) player.velocityY = 0;
            player.velocityY += dt * gravity;
            player.object.position.y -= player.velocityY;
            if (player.object.position.y < targetY) {
              player.velocityY = 0;
              player.object.position.y = targetY;
            }
          }
        }
      } else if (player.object.position.y > 0) {
        if (player.velocityY == undefined) player.velocityY = 0;
        player.velocityY += dt * gravity;
        player.object.position.y -= player.velocityY;
        if (player.object.position.y < 0) {
          player.velocityY = 0;
          player.object.position.y = 0;
        }
      }
    }
    if (player.move) player.object.rotateY(player.move.turn * dt);
  } else {
    if (carBlocked) player.object.position.x = pos.x - 3.5;
  }
};
/* walking end */

function r2d(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}

function d2r(degress) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
const building_map = {
  "Point - Department store 1": {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    title: "Department Store 1",
    name: "Department1",
  },
  "Point - Dapertment store 2": {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    title: "Content Palace",
    name: "Department2",
    modalName: "contentPalace",
    redirect: true,
  },
  "Content Palace": {
    x: 1.11,
    y: 1.45,
    z: 1.35,
    name: "Department2", // content palace
    redirect: true,
    modalName: "contentPalace",
    title: "Content Palace",
    point: {
      x: 1560.18,
      y: 288.48,
      z: 1000.34,
    },
  },

  "Point - Support": {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    name: "Support",
    title: "Support Building",
  },
  "Point - Drive in cinema": {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    name: "Drivein",
    title: "Drivein",
  },
  "Point - University": {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    name: "University",
    title: "University",
  },
  University: {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    name: "University",
    title: "University",
  },
  "Point - Banking": {
    x: 1.51,
    y: 1.51,
    z: 2.2,
    name: "Banking",
    title: "Banking Building",
  },
  "Point - Exchange": {
    x: 1.51,
    y: 1.51,
    z: 2.2,
    name: "Exchange",
    title: "Exchange Building",
    redirect: true,
    modalName: "exchangeBuilding",
  },
  "Exchange building": {
    x: 1.51,
    y: 1.51,
    z: 2.2,
    name: "Exchange",
    title: "Exchange Building",
    redirect: true,
    modalName: "exchangeBuilding",
  },
  Exchange_building: {
    x: 1.51,
    y: 1.51,
    z: 2.2,
    name: "Exchange",
    title: "Exchange Building",
    redirect: true,
    modalName: "exchangeBuilding",
  },
  "City Tower 3": {
    x: 1.51,
    y: 1.51,
    z: 2.2,
    name: "Tower3",
    title: "Community",
    modalName: "tower3",
  },
  "Point - City Tower 3": {
    x: 1.51,
    y: 1.51,
    z: 2.2,
    name: "Tower3",
    title: "Community",
  },
  "City Tower 4": {
    x: 1.51,
    y: 1.51,
    z: 2.2,
    name: "Tower4",
    title: "Tower 4",
  },
  "Point - City Tower 4": {
    x: 1.51,
    y: 1.51,
    z: 2.2,
    name: "Tower4",
    title: "Tower 4",
  },
  /*s
    "Banking building": {
      x: 1.51,
      y: 1.51,
      z: 2.2,
      name: "Exchange",
      redirect: true,
      modalName: "exchangeBuilding",
    },
    */
  "Plane.3": {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    name: "Support",
    redirect: true,
    modalName: "supportBuilding",
    title: "Support Building",
  },
  "Cube.9": {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    name: "Shopping Center",
    redirect: true,
    modalName: "shoppingCenter",
    title: "Shopping Center",
  },
  MILC_Towerdisplay: {
    x: 1.91,
    y: 1.2,
    z: 1.5,
    name: "Community",
    modalName: "communityBuilding",
    title: "Community",
    redirect: true,
    /*
        point: {
          x: 1000.83,
          y: 180.68,
          z: 419.59,
        },
        */
  },
  "MILC TowerBuilding": {
    x: 1.91,
    y: 1.2,
    z: 1.5,
    name: "Community",
    modalName: "communityBuilding",
    title: "Community",
    redirect: true,
  },
  "MILC Tower  2": {
    x: 1.91,
    y: 1.2,
    z: 1.5,
    name: "Headquarter",
    modalName: "milcTower",
    title: "Milc Tower",
    redirect: true,
  },

  //new mapping

  "Comunity building": {
    x: 1.91,
    y: 1.2,
    z: 1.5,
    name: "Community",
    modalName: "communityBuilding",
    title: "Community",
    redirect: true,
  },
  Headquarter: {
    x: 1.91,
    y: 1.2,
    z: 1.5,
    name: "Headquarter",
    modalName: "milcTower",
    title: "Milc Tower",
    redirect: true,
  },
};

const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
  if (
    process.env.VUE_APP_SHOW_ROBOT &&
    process.env.VUE_APP_SHOW_ROBOT === "1"
  ) {
    elementCityMode.style.visibility = "hidden";
  }
  statusCallback(false, itemsLoaded, itemsTotal);
};

manager.onLoad = function () {
  //console.log("Loading complete!");
  //metoda true
  statusCallback(true);
  if (
    process.env.VUE_APP_SHOW_ROBOT &&
    process.env.VUE_APP_SHOW_ROBOT === "1"
  ) {
    elementCityMode.style.visibility = "visible";
  }
};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
  if (
    process.env.VUE_APP_SHOW_ROBOT &&
    process.env.VUE_APP_SHOW_ROBOT === "1"
  ) {
    elementCityMode.style.visibility = "hidden";
  }
  statusCallback(false, itemsLoaded, itemsTotal);
};

manager.onError = function (url) {};

let scene,
  camera,
  renderer,
  controls,
  hlight,
  directionalLight,
  raycaster,
  loader,
  loaderWalking,
  mouse = null,
  container = null,
  statusCallback = null;

const handleAfterEvent = (obj, tar, tarObj) => {
  var target = tar.trim();
  if (target === "Headquarter") {
    store.commit("city/SHOW_MODAL", tarObj.modalName);
  } else {
    var blnCat = false;
    if (target === "University") {
      blnCat = false;
    } else if (target === "Banking") {
      blnCat = true;
    } else if (target === "Exchange") {
      blnCat = true;
    } else if (target === "Tower3") {
      blnCat = true;
    } else if (target === "Department2") {
      blnCat = true;
    }

    if (tarObj.redirect && tarObj.modalName)
      store.commit("city/SHOW_MODAL", tarObj.modalName);
  }
};

const animate = () => {
  const dt = clock.getDelta();

  //requestAnimationFrame(animate);
  requestAnimationFrame(function () {
    animate();
  });

  if (cityMode === "walking") {
    if (player.mixer !== undefined) player.mixer.update(dt);

    if (player.action == "Walking") {
      const elapsedTime = Date.now() - player.actionTime;
      if (elapsedTime > 1000 && player.move.forward > 0) {
        setAction("Running");
      }
    }

    // console.log(player.action);

    if (player.move !== undefined) {
      // console.log(player.move, "call");
      movePlayer(dt);
    }

    if (player.cameras != undefined && player.cameras.active != undefined) {
      camera.position.lerp(
        player.cameras.active.getWorldPosition(new THREE.Vector3()),
        0.05
      );

      const pos = player.object.position.clone();
      pos.y += 20;
      camera.lookAt(pos);
    }

    if (sun != undefined) {
      sun.position.x = player.object.position.x;
      sun.position.y = player.object.position.y + 200;
      sun.position.z = player.object.position.z + 100;
      sun.target = player.object;
    }
  } else {
    //if rotation

    controls.update();
    TWEEN.update();
  }

  water.material.uniforms["time"].value += 1.0 / 60.0;

  renderer.render(scene, camera);
};

const onMouseMove = (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const moveToObj = (event, obj, targ) => {
  const coords = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  };
  new TWEEN.Tween(coords)
    .easing(TWEEN.Easing.Cubic.InOut)
    .to(
      {
        x: obj.point.x * targ.x,
        y: obj.point.y * targ.y,
        z: obj.point.z * targ.z,
      },
      2000
    )
    .onUpdate(() => camera.position.set(coords.x, coords.y, coords.z))
    .onComplete(
      debounce(function () {
        handleAfterEvent(obj, targ.name, targ);
      }, 500)
    )
    .start();
};

const clickAction = (event) => {
  if (clickObjectName) {
    checkObjectName(clickObjectName, mainEvent, clickObjectItem);
  } else {
    var mainEvent = event;
    event.preventDefault();
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(
      scene.children[5].children,
      true
    );

    blnFound = false;
    intersects.forEach((item) => {
      if (!blnFound) {
        var objectName = "";
        if (item && item.object.parent) {
          if (item.object.parent.userData && item.object.parent.userData.name) {
            objectName = item.object.parent.userData.name;
          } else {
            objectName = item.object.name;
          }
        } else {
          if (item.object.userData && item.object.userData.name) {
            objectName = item.object.userData.name;
          } else {
            objectName = item.object.name;
          }
        }

        objectName = objectName.trim();
        checkObjectName(objectName, mainEvent, item);
      }
    });
  }
};
const checkObjectName = (objectName, mainEvent, item) => {
  if (building_map[objectName] && building_map[objectName].name) {
    if (building_map[objectName].redirect) {
      if (!clickConfirmRequest) {
        clickConfirmRequest = true;
        clickConfirmApproved = false;
        clickEvent = mainEvent;
        clickObjectName = objectName;
        clickObjectItem = item;
        clickObjectBuilding = building_map[objectName];
        showClickNavigation();
      } else if (clickConfirmRequest && clickConfirmApproved) {
        blnFound = true;
        moveToObj(
          clickEvent,
          building_map[objectName].point ? building_map[objectName] : item,
          building_map[objectName]
        );
        resetClickValues();
        hideClickNavigation();
      }
    } else {
      blnFound = true;
    }
  } else {
    if (objectName === "undercons1" || objectName === "undercons2") {
      if (!clickConfirmRequest) {
        clickObjectName = objectName;
        clickObjectItem = item;
        clickConfirmRequest = true;
        clickConfirmApproved = false;
        clickEvent = mainEvent;
        clickObjectBuilding = { title: "In Construction" };
        showClickNavigation();
      } else if (clickConfirmRequest && clickConfirmApproved) {
        blnFound = true;
        store.commit("city/SHOW_MODAL", "underConstruction");
        resetClickValues();
        hideClickNavigation();
      }
    }
  }
};
const showClickNavigation = () => {
  store.commit("city/SHOW_NAVIGATE", {
    name: "navigateConfirmation",
    props: clickObjectBuilding,
  });
  setTimeout(() => {
    document.getElementById("navigateConfirmClick").onclick = function () {
      clickConfirmApproved = true;
      if (clickEvent) {
        clickAction(clickEvent);
      }
    };
    document.getElementById("navigateCancelClick").onclick = function () {
      resetClickValues();
    };

    setTimeout(() => {
      if (clickConfirmRequest) {
        resetClickValues();
        hideClickNavigation();
      }
    }, 3000);
  }, 500);
};

const resetClickValues = () => {
  clickEvent = null;
  clickObjectName = null;
  clickObjectItem = null;
  clickObjectBuilding = null;
  clickConfirmApproved = false;
  clickConfirmRequest = false;
};
const hideClickNavigation = () => {
  store.commit("city/HIDE_NAVIGATE", "navigateConfirmation");
};
const click = (event) => {
  if (timeClicked === 0) {
    timeClicked = 1;
    setTimeout(() => {
      timeClicked = 0;
    }, 2000);

    if (!clickConfirmRequest) clickAction(event);
  }
};

const onKey = (e) => {
  if (cityMode === "rotation") {
    if (e.key == "ArrowLeft") {
      var rotSpeed = 0.05;
      camera.position.x =
        camera.position.x * Math.cos(rotSpeed) -
        camera.position.z * Math.sin(rotSpeed);
      camera.position.z =
        camera.position.z * Math.cos(rotSpeed) +
        camera.position.x * Math.sin(rotSpeed);
    } else if (e.key == "ArrowRight") {
      var rotSpeed = 0.05;
      camera.position.x =
        camera.position.x * Math.cos(rotSpeed) +
        camera.position.z * Math.sin(rotSpeed);
      camera.position.z =
        camera.position.z * Math.cos(rotSpeed) -
        camera.position.x * Math.sin(rotSpeed);
    } else if (e.key == "ArrowUp") {
      camera.position.x = camera.position.x * 0.99;
      camera.position.y = camera.position.y * 0.99;
      camera.position.z = camera.position.z * 0.99;
    } else if (e.key == "ArrowDown") {
      camera.position.x = camera.position.x * 1.01;
      camera.position.y = camera.position.y * 1.01;
      camera.position.z = camera.position.z * 1.01;
    }
  } else {
    //Player movement

    document.onkeydown = function (e) {
      if (e.keyCode === 37) {
        moveRotate -= 0.11;
        //moveForward = 0;
        // right
      } else if (e.keyCode === 39) {
        moveRotate += 0.11;
        //moveForward = 0;
      } else if (e.keyCode === 38) {
        moveForward += 0.11;

        // down
      } else if (e.keyCode === 40) {
        moveForward -= 0.11;
        // moveRotate = 0;
      }
    };

    /* var delta = clock.getDelta(); // seconds.

         var moveDistance = 100 * delta; // 100 pixels per second

         var rotateAngle = (Math.PI / 2) * delta; // pi/2 radians (90 degrees) per second

         var blnClick = true;
         if (e.key == "ArrowLeft") {
           moveRotate -= 0.11;
           //moveForward = 0;
         }

         if (e.key == "ArrowRight") {
           moveRotate += 0.11;
           //moveForward = 0;
         }

         if (e.key == "ArrowUp") {
           moveForward += 0.11;
           //moveRotate = 0;
         }

         if (e.key == "ArrowDown") {
           moveForward -= 0.11;
           //moveRotate = 0;
         }
         */

    //console.log("moveForward: " + moveForward, "moveRotate: " + moveRotate);
    playerControl(moveForward, moveRotate);
    //console.log(joystick);

    //
  }
};

const onKeyUp = (e) => {
  if (cityMode === "rotation") {
  } else {
    //

    //var delta = clock.getDelta(); // seconds.
    moveRotate = 0;
    moveForward = 0;
    playerControl(0, 0);

    //
  }
};

const initControls = () => {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.touches.ONE = THREE.TOUCH.PAN;
  controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
  controls.screenSpacePanning = true;
  controls.enableDamping = true;
  controls.rotateSpeed = 0.2;
  controls.zoomSpeed = 0.5;
  controls.minDistance = 0.4;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.listenToKeyEvents(window);
  controls.update();
};
const init = (el, videoCinema, videoBank, videoCommunity, callback) => {
  container = el;
  statusCallback = callback;
  scene = new THREE.Scene();
  //scene.fog = new THREE.FogExp2(0xffffff, 0.00003);
  //scene.background = new THREE.Color("#01151c");
  scene.background = new THREE.Color("#0095ff");
  //0487e2
  mouse = new THREE.Vector2();
  raycaster = new THREE.Raycaster();

  camera = new THREE.PerspectiveCamera(
    45,
    el.clientWidth / el.clientHeight,
    1,
    20000
  );

  camera.position.set(2000, 600, 3100);
  camera.updateProjectionMatrix();
  scene.add(camera);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xffffff, 0);
  // add event for raycaster events
  renderer.domElement.addEventListener("click", click, true);
  initControls();

  var unitLimit1 = 50;
  var unitLimit2 = 10;
  var unitConversion = 1;

  var effectController = {
    turbidity: 20,
    rayleigh: -2.946,
    mieCoefficient: 0.001,
    mieDirectionalG: 0.517,
    luminance: -0.088,
    ambientIntensity: 5.7519,
    directionalLight: 1.2,
    directionalLightX: 2.0645 / unitConversion,
    directionalLightY: 14.3557,
    directionalLightZ: 19.2721 / unitConversion,
    directionalLight2: 2.2,
    directionalLight2X: 8.2101 / unitConversion,
    directionalLight2Y: 9.4392,
    directionalLight2Z: -20.0595 / unitConversion,
    directionalLight3: 2,
    directionalLight3X: -0.3937 / unitConversion,
    directionalLight3Y: 15.5848,
    directionalLight3Z: -2.8519 / unitConversion,
    directionalLight4: 0.9046,
    directionalLight4X: -6.5393 / unitConversion,
    directionalLight4Y: -6.5393,
    directionalLight4Z: 19.2721 / unitConversion,
    hemiLight: -10,
    hemiLightX: -50,
    hemiLightY: -50,
    hemiLightZ: -50,

    inclination: -0.6794, //1.085, //ele, // 0.8985033172272991, // elevation / inclination
    azimuth: 0.2367, //0.97, //azi, // 0.740544002807376, // Facing front,
    sun: false,

    waterRotationX: -1.5728,
    waterRotationY: 0,
    waterPositionY: -18,
    waterPositionX: -11.45557,
    waterPositionZ: 0.8354,

    sceneRotationY: -400,
    scenePositionX: 2300,
    scenePositionY: 0,
    scenePositionZ: 500,

    landscapeY: -24,
    landscape1Y: -24,
    landscape2Y: -24,
    landscape3Y: -24,
  };

  hlight = new THREE.AmbientLight(0xfff, 1);

  var directionalLight = new THREE.DirectionalLight(
    0xffffff,
    effectController.directionalLight
  );
  directionalLight.position.set(
    effectController.directionalLightX,
    effectController.directionalLightY,
    effectController.directionalLightZ
  );

  var directionalLight2 = new THREE.DirectionalLight(
    0xffffff,
    effectController.directionalLight2
  );
  directionalLight2.position.set(
    effectController.directionalLight2X,
    effectController.directionalLight2Y,
    effectController.directionalLight2Z
  );

  var directionalLight3 = new THREE.DirectionalLight(
    0xffffff,
    effectController.directionalLight3
  );
  directionalLight3.position.set(
    effectController.directionalLight3X,
    effectController.directionalLight3Y,
    effectController.directionalLight3Z
  );

  var directionalLight4 = new THREE.DirectionalLight(
    0xffffff,
    effectController.directionalLight4
  );
  directionalLight4.position.set(
    effectController.directionalLight4X,
    effectController.directionalLight4Y,
    effectController.directionalLight4Z
  );

  //var light2 = new THREE.DirectionalLight(0x204fae, 1.25);
  //light2.position.set(-30, 40, 0);

  //directionalLight.castShadow = false;
  //directionalLight.shadowDarkness = 0;
  /*
    directionalLight.shadowCameraTop = 20;
    directionalLight.shadowCameraRight = 20;
    directionalLight.shadowCameraBottom = -20;
    directionalLight.shadowCameraLeft = -20;
    directionalLight.shadowCameraNear = 0;
    directionalLight.shadowCameraFar = 200;
    directionalLight.shadowMapWidth = 2048;
    directionalLight.shadowMapHeight = 2048;
    directionalLight.shadowBias = 0.0002;
    */

  scene.add(directionalLight);
  scene.add(directionalLight2);
  scene.add(directionalLight3);
  scene.add(directionalLight4);

  const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x006994, -1.5548);
  hemiLight.name = "hemi_light";
  hemiLight.position.set(0, 0, -15.1493);
  ////scene.add(hemiLight);
  //scene.add(hlight);

  //scene.add(light2);

  //directionalLight = new THREE.DirectionalLight(0xc4dce5, 0.5);
  //irectionalLight.position.set(0, 0, 0);
  //scene.add(directionalLight);
  //scene.add(hlight);

  /*
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

    const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x006994, 5);
    hemiLight.name = "hemi_light";
    scene.add(hemiLight);

    scene.add(directionalLight);
    */

  document.addEventListener("mousemove", onMouseMove);
  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKey);
  window.addEventListener("keyup", onKeyUp);

  renderer.setSize(container.clientWidth, container.clientHeight);
  if (container) {
    container.appendChild(renderer.domElement);
  } else {
    document.body.appendChild(renderer.domElement);
  }

  const waterGeometry = new THREE.PlaneGeometry(100000, 100000);

  water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "/textures/waternormals.jpg",
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0x000000,
    waterColor: "#0087ec",
    distortionScale: 0,
    fog: scene.fog !== undefined,
  });

  water.rotation.x = -Math.PI / 2;

  loader = new GLTFLoader(manager);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/"
  );

  dracoLoader.setDecoderConfig({ type: "js" });

  loader.setDRACOLoader(dracoLoader);

  loader.load("city8.glb", function (gltf) {
    gltf.scene.rotation.y = -400;
    gltf.scene.position.x = 2300;
    gltf.scene.position.y = 0;
    gltf.scene.position.z = 500;
    THREE.Cache.enabled = true;

    if (videoCinema) {
      /*
            videoadCinema.muted = true;
            videoadCinema.play();
            videoadCinema.addEventListener("play", function () {
              currentTime = 3;
            });

            let videoCinemaTexture = new THREE.VideoTexture(videoadCinema);
            var materialCinema = new THREE.MeshBasicMaterial({
              map: videoCinemaTexture,
              side: THREE.DoubleSide,
            });

            videoBank.muted = true;
            videoBank.play();
            videoBank.addEventListener("play", function () {
              currentTime = 3;
            });

            let videoBankTexture = new THREE.VideoTexture(videoBank);
            var materialBank = new THREE.MeshBasicMaterial({
              map: videoBankTexture,
              side: THREE.DoubleSide,
            });
            */

      videoBank.muted = true;
      videoBank.play();
      videoBank.addEventListener("play", function () {
        currentTime = 3;
      });

      let videoBankTexture = new THREE.VideoTexture(videoBank);
      var materialBank = new THREE.MeshBasicMaterial({
        map: videoBankTexture,
        side: THREE.DoubleSide,
      });

      videoCinema.muted = true;
      videoCinema.play();
      videoCinema.addEventListener("play", function () {
        currentTime = 3;
      });

      let videoCinemaTexture = new THREE.VideoTexture(videoCinema);
      var materialCinema = new THREE.MeshBasicMaterial({
        map: videoCinemaTexture,
        side: THREE.DoubleSide,
      });

      videoCommunity.muted = true;
      videoCommunity.play();
      videoCommunity.addEventListener("play", function () {
        currentTime = 3;
      });

      let videoCommunityTexture = new THREE.VideoTexture(videoCommunity);
      var materialCommunity = new THREE.MeshBasicMaterial({
        map: videoCommunityTexture,
        side: THREE.DoubleSide,
      });

      //console.log(gltf.scene.children);
      gltf.scene.children.map(function (sceneObj, sceneObjKey) {
        //console.log(sceneObj);

        if (sceneObj.name === "Display_4") {
          //  sceneObj.children.map(function (childObj, childObjKey) {
          //    if (childObj.name === "Display_4-News_Display") {
          gltf.scene.children[sceneObjKey].material = materialNewsSky;
          //   }
          // });
        }

        if (sceneObj.name === "Display_3") {
          //  sceneObj.children.map(function (childObj, childObjKey) {
          //   if (childObj.name === "Display_3-News_Display") {
          gltf.scene.children[sceneObjKey].material = materialNewsSky;
          //   }
          // });
        }
        if (sceneObj.name === "Display_2") {
          // sceneObj.children.map(function (childObj, childObjKey) {
          //   if (childObj.name === "Display_2-News_Display") {
          gltf.scene.children[sceneObjKey].material = materialNewsSky;
          //   }
          // });
        }
        if (sceneObj.name === "Display_1") {
          // sceneObj.children.map(function (childObj, childObjKey) {
          //   if (childObj.name === "Display_1-News_Display") {
          gltf.scene.children[sceneObjKey].material = materialNewsSky;
          //   }
          // });
        }
        if (sceneObj.name === "Landscape1") {
          gltf.scene.children[sceneObjKey].position.y = -24;
        }

        if (sceneObj.name === "Rectangle") {
          gltf.scene.children[sceneObjKey].position.y =
            gltf.scene.children[sceneObjKey].position.y + 10;
        }

        if (sceneObj.name === "Landscape3") {
          gltf.scene.children[sceneObjKey].position.y = -24;
        }

        if (sceneObj.name === "Landscape") {
          gltf.scene.children[sceneObjKey].position.y = -24;

          // gltf.scene.children[sceneObjKey] = null;

          // gltf.scene.children.splice(sceneObjKey, 1);
        }

        if (sceneObj.name === "Sail_boats") {
          // console.log(sceneObj);

          sceneObj.children.map(function (boats, boatsKey) {
            gltf.scene.children[sceneObjKey].children[boatsKey].position.y =
              gltf.scene.children[sceneObjKey].children[boatsKey].position.y +
              3;
          });
        }

        if (sceneObj.name === "MILC_Towerdisplay") {
          gltf.scene.children[sceneObjKey].material = materialCommunity;
        } else if (sceneObj.name === "Banking_building") {
          // console.log(sceneObj);
          sceneObj.children.map(function (childObj, childObjKey) {
            if (
              childObj.name === "Plane2_7" ||
              childObj.name === "Plane1_6" ||
              childObj.name === "Plane3_2" ||
              childObj.name === "Plane3_1" ||
              childObj.name === "Plane2_4" ||
              childObj.name === "Plane1_4" ||
              childObj.name === "Plane1_7" ||
              childObj.name === "Plane4_3" ||
              childObj.name === "Plane" ||
              childObj.name === "Plane_3" ||
              childObj.name === "Plane_4" ||
              childObj.name === "Plane3"
            ) {
              gltf.scene.children[sceneObjKey].children[childObjKey].material =
                materialBank;
            }
          });
        } else if (sceneObj.name === "Cinema") {
          sceneObj.children.map(function (childObj, childObjKey) {
            if (childObj.name === "Cinema_display") {
              gltf.scene.children[sceneObjKey].children[childObjKey].material =
                materialCinema;
            }
          });
        }

        /*
        if (sceneObj.name === "City_limit_zone") {
          rangeMaterial = gltf.scene.children[sceneObjKey];
        }
        */
      });
    }
    scene.add(gltf.scene);
    water.name = "WATER";
    scene.add(water);

    /*
    if (rangeMaterial) {
      var bbox = new THREE.BoundingBoxHelper(rangeMaterial, hex);
      bbox.update();
      scene.add(rangeMaterial);
    }
    */

    // Skybox

    sky = new Sky();
    sky.scale.setScalar(450000);
    scene.add(sky);

    // Add Sun Helper
    sunSphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(80000, 48, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    sunSphere.position.y = -100000;
    sunSphere.visible = false;
    scene.add(sunSphere);

    var distance = 10000;

    function guiChanged() {
      var uniforms = sky.material.uniforms;
      uniforms["turbidity"].value = effectController.turbidity;
      uniforms["rayleigh"].value = effectController.rayleigh;
      uniforms["luminance"].value = effectController.luminance;
      uniforms["mieCoefficient"].value = effectController.mieCoefficient;
      uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

      var theta = Math.PI * (effectController.inclination - 0.2);
      var phi = 2 * Math.PI * (effectController.azimuth - 0.2);

      sunSphere.position.x = distance * Math.cos(phi);
      sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
      sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta);

      sunSphere.visible = effectController.sun;

      uniforms["sunPosition"].value.copy(sunSphere.position);

      hlight.intensity = effectController.ambientIntensity;
      directionalLight.intensity = effectController.directionalLight;
      directionalLight.position.set(
        effectController.directionalLightX,
        effectController.directionalLightY,
        effectController.directionalLightZ
      );

      directionalLight2.intensity = effectController.directionalLight2;
      directionalLight2.position.set(
        effectController.directionalLight2X,
        effectController.directionalLight2Y,
        effectController.directionalLight2Z
      );

      directionalLight3.intensity = effectController.directionalLight3;
      directionalLight3.position.set(
        effectController.directionalLight3X,
        effectController.directionalLight3Y,
        effectController.directionalLight3Z
      );

      directionalLight4.intensity = effectController.directionalLight4;
      directionalLight4.position.set(
        effectController.directionalLight4X,
        effectController.directionalLight4Y,
        effectController.directionalLight4Z
      );

      hemiLight.intensity = effectController.hemiLight;
      hemiLight.position.set(
        effectController.hemiLightX,
        effectController.hemiLightY,
        effectController.hemiLightZ
      );

      water.rotation.x = effectController.waterRotationX;
      water.rotation.y = effectController.waterRotationY;
      water.position.x = effectController.waterPositionX;
      water.position.y = effectController.waterPositionY;
      water.position.z = effectController.waterPositionZ;

      gltf.scene.rotation.y = effectController.sceneRotationY;
      gltf.scene.position.x = effectController.scenePositionX;
      gltf.scene.position.y = effectController.scenePositionY;
      gltf.scene.position.z = effectController.scenePositionZ;
      uniforms["sunPosition"].value.copy(sunSphere.position);

      gltf.scene.children.map(function (sceneObj, sceneObjKey) {
        if (sceneObj && sceneObj.name) {
          if (sceneObj.name === "Landscape1") {
            gltf.scene.children[sceneObjKey].position.y =
              effectController.landscape1Y;
          }

          if (sceneObj.name === "Landscape3") {
            gltf.scene.children[sceneObjKey].position.y =
              effectController.landscape3Y;
          }

          if (sceneObj.name === "Landscape2") {
            gltf.scene.children[sceneObjKey].position.y =
              effectController.landscape2Y;
          }
        }
      });
      renderer.render(scene, camera);
    }

    if (process.env.VUE_APP_SHOW_GUI && process.env.VUE_APP_SHOW_GUI === 1) {
      var gui = new GUI();

      gui
        .add(effectController, "turbidity", -10.0, 20.0, 0.1)
        .onChange(guiChanged);
      gui
        .add(effectController, "rayleigh", -3.0, 4, 0.001)
        .onChange(guiChanged);
      gui
        .add(effectController, "mieCoefficient", -0.1, 0.1, 0.001)
        .onChange(guiChanged);
      gui
        .add(effectController, "mieDirectionalG", -1, 1, 0.001)
        .onChange(guiChanged);
      gui.add(effectController, "luminance", -2, 2).onChange(guiChanged);
      gui
        .add(effectController, "inclination", -1, 1, 0.0001)
        .onChange(guiChanged);
      gui.add(effectController, "azimuth", -1, 1, 0.0001).onChange(guiChanged);
      gui.add(effectController, "sun").onChange(guiChanged);

      gui
        .add(
          effectController,
          "ambientIntensity",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight",
          -unitLimit2,
          unitLimit2,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLightX",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLightY",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLightZ",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight2",
          -unitLimit2,
          unitLimit2,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight2X",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight2Y",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight2Z",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight3",
          -unitLimit2,
          unitLimit2,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight3X",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight3Y",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight3Z",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight4",
          -unitLimit2,
          unitLimit2,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight4X",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight4Y",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(
          effectController,
          "directionalLight4Z",
          -unitLimit1,
          unitLimit1,
          0.0001
        )
        .onChange(guiChanged);

      gui
        .add(effectController, "hemiLight", -unitLimit2, unitLimit2, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "hemiLightX", -unitLimit1, unitLimit1, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "hemiLightY", -unitLimit1, unitLimit1, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "hemiLightZ", -unitLimit1, unitLimit1, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "waterPositionX", -100, 100, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "waterPositionY", -100, 100, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "waterPositionZ", -100, 100, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "waterRotationX", -100, 100, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "waterRotationY", -100, 100, 0.0001)
        .onChange(guiChanged);

      //

      gui
        .add(effectController, "sceneRotationY", -10000, 10000, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "scenePositionX", -10000, 10000, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "scenePositionY", -10000, 10000, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "scenePositionZ", -10000, 10000, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "landscapeY", -100, 100, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "landscape1Y", -100, 100, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "landscape2Y", -100, 100, 0.0001)
        .onChange(guiChanged);

      gui
        .add(effectController, "landscape3Y", -100, 100, 0.0001)
        .onChange(guiChanged);

      //

      const waterUniforms = water.material.uniforms;

      const folderWater = gui.addFolder("Water");
      folderWater
        .add(waterUniforms.distortionScale, "value", 0, 8, 0.1)
        .name("distortionScale");
      folderWater.add(waterUniforms.size, "value", 0.1, 10, 0.1).name("size");
      folderWater.open();
    }

    // createColliders();

    initWalkingMode();
    guiChanged();
    animate();
  });
};

export default {
  init,
  changeCityMode,
  statusCallback: null,
};
