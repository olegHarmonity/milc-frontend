/* eslint-disable */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";
import { debounce } from "lodash";
import router from "@/router";
import { Water } from "@/plugins/Water";

var timeClicked = 0;
const building_map = {
  Export_za_3D_Converted_3: {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    name: "GateLink",
    redirect: true,
  },
  Cube1: {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    name: "First screen",
    redirect: true,
    url: "https://www.gate.io/de",
  },
  Cube4: {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    name: "Second screen",
    url: "https://www.gate.io/de/trade/BTC_USDT",
    redirect: true,
  },
  Cube3: {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    name: "Third screen",
    url: "https://www.gate.io/de/trade/MLT_USDT",
    redirect: true,
  },
  Cube2: {
    x: 1.01,
    y: 1.01,
    z: 1.2,
    name: "Fourth screen",
    redirect: true,
  },
};
const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
  statusCallback(false, itemsLoaded, itemsTotal);
};

manager.onLoad = function () {
  //console.log("Loading complete!");
  //metoda true
  statusCallback(true);
};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
  //console.log(itemsLoaded + " of " + itemsTotal + " files.");
  //saljemo progress
  statusCallback(false, itemsLoaded, itemsTotal);
};

manager.onError = function (url) {
  //console.log("There was an error loading " + url);
};
// function getAutoRotationAngle() {

//   return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

// }
/**
 * TWEEN.Easing.Quadratic.Out
 * TWEEN.Easing.Cubic.InOut
 *
 */

let scene,
  camera,
  renderer,
  controls,
  hlight,
  directionalLight,
  raycaster,
  loader,
  mouse = null,
  container = null,
  statusCallback = null;

const animate = () => {
  controls.update();
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

const onMouseMove = (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  mouse.z = 0.5;
};
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const moveToObj = (event, obj, item) => {
  const coords = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  };
  let sc = 1.105;
  new TWEEN.Tween(coords)
    .easing(TWEEN.Easing.Cubic.InOut)
    .to({ x: obj.point.x * sc, y: obj.point.y * sc, z: obj.point.z * sc }, 2000)
    .onUpdate(() => {
      camera.position.set(coords.x, coords.y, coords.z);
    })
    .onComplete(
      debounce(function () {
        // handleAfterEvent(item);

        handleAfterEvent(obj, item.name, item);
      }, 500)
    )
    .start();
};
const handleAfterEvent = (obj, tar, tarObj) => {
  //console.log(camera);
  var target = tar.trim();
  if (target === "GateLink") {
    //store.commit("city/SHOW_MODAL", "contentPalace");
    window.open("https://www.gate.io/", "_blank");
  } else {
    if (tarObj.url) {
      window.open(tarObj.url, "_blank");
    }
  }
};
const click = (event) => {
  return false;
  //console.log(timeClicked + " time");
  if (timeClicked === 0) {
    timeClicked = 1;
    setTimeout(() => {
      timeClicked = 0;
    }, 2000);

    event.preventDefault();
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(
      scene.children[2].children,
      true
    );

    var blnFound = false;
    intersects.forEach((item) => {
      if (!blnFound) {
        var objectName = "";
        if (item && item.object.parent) {
          //if (item.object.parent.userData && item.object.parent.userData.name) {
          //  objectName = item.object.parent.userData.name;
          // } else {
          objectName = item.object.parent.name;
          // }
        } else {
          if (item.object.userData && item.object.userData.name) {
            objectName = item.object.userData.name;
          } else {
            objectName = item.object.name;
          }
        }

        objectName = objectName.trim();

        // console.log(objectName);
        // console.log(item);
        //console.log(building_map);
        if (building_map[objectName] && building_map[objectName].name) {
          if (building_map[objectName].redirect) {
            blnFound = true;
            moveToObj(
              event,
              building_map[objectName].point ? building_map[objectName] : item,
              building_map[objectName]
            );
          } else {
            blnFound = true;
          }
        }
      }
    });
  }
};

const onKey = (e) => {
  // move to raf
  if (e.key == "ArrowLeft") {
    var rotSpeed = 0.01;
    camera.position.x =
      camera.position.x * Math.cos(rotSpeed) -
      camera.position.z * Math.sin(rotSpeed);
    camera.position.z =
      camera.position.z * Math.cos(rotSpeed) +
      camera.position.x * Math.sin(rotSpeed);
  } else if (e.key == "ArrowRight") {
    var rotSpeed = 0.01;
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
};

const init = (el, callback) => {
  container = el;
  statusCallback = callback;
  scene = new THREE.Scene();

  scene.background = new THREE.Color("#000000");
  mouse = new THREE.Vector3();
  //raycaster = new THREE.Raycaster();

  raycaster = new THREE.Raycaster();

  camera = new THREE.PerspectiveCamera(
    45,
    el.clientWidth / el.clientHeight,
    1,
    4000
  );

  //camera.position.set(2000, 600, 3100);
  //camera.position.set(1197.4656947501264, 394.8424152213564, 2389.339145893237);
  //camera.position.set(592.424, 163.343, 814.707);

  //working
  //camera.position.set(1303.1609093547065, 449.69714548308, 2527.92749358023);
  camera.position.set(1133.9627403765535, 0, 2774.6326679754425);
  //camera.rotation.set(1000, 1000,10);
  camera.rotateOnAxis(2000);
  camera.updateProjectionMatrix();

  scene.add(camera);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  //renderer.setPixelRatio( window.devicePixelRatio );
  //renderer.setClearColor(0xffffff, 0);
  renderer.domElement.addEventListener("click", click, true);

  renderer.outputEncoding = THREE.sRGBEncoding;
  // add event for raycaster events
  controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;
  controls.enablePan = false;
  controls.enableDamping = true;
  //controls.enableRotate = true;
  controls.rotateSpeed = 0.2;
  controls.zoomSpeed = 0.2;

  controls.minDistance = 1900;
  controls.maxDistance = 3500;

  //controls.autoRotate = true;
  //controls.maxPolarAngle = Math.PI * 0.45;
  controls.minPolarAngle = Math.PI * 0.47; //0.4;
  controls.maxPolarAngle = Math.PI * 0.57; //Math.PI * 0.6;

  controls.minAzimuthAngle = 0.15; // default
  controls.maxAzimuthAngle = 0.65; // default

  controls.listenToKeyEvents(window);
  controls.update();

  hlight = new THREE.AmbientLight(0x404040, 0.3);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.4 * Math.PI);
  directionalLight.position.set(1, 5, 0.666); // it's a day
  //directionalLight.position.set(2, 0, 0.866); // it's a night

  //const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  //hemiLight.name = "hemi_light";
  //scene.add(hemiLight);

  //directionalLight.castShadow = true;
  //scene.add(directionalLight);

  document.addEventListener("mousemove", onMouseMove);
  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKey);

  renderer.setSize(container.clientWidth, container.clientHeight);
  if (container) {
    container.appendChild(renderer.domElement);
  } else {
    document.body.appendChild(renderer.domElement);
  }

  loader = new GLTFLoader(manager);
  loader.load("bankbuilding.gltf", function (gltf) {
    //loader.load("new10.gltf", function (gltf) {
    gltf.scene.rotation.z = -0.05;
    gltf.scene.rotation.x = 0;
    gltf.scene.rotation.y = 86.79;
    //gltf.scene.rotation.z = -50;
    //gltf.scene.rotation.z = -200;

    gltf.scene.position.x = 530;
    gltf.scene.position.y = -950;
    gltf.scene.position.z = 3170;
    //gltf.scene.quaternion.w = 1.1856549679993724;
    //gltf.scene.rotateOnAxis(10, 10, 10);

    /*
    var val = -2;
    gltf.scene.position.x = -632.439 * val;
    gltf.scene.position.y = 588.889 * val;
    gltf.scene.position.z = 721.5 * val;

    */
    gltf.scene.scale.set(1, 1, 1);

    /*

    gltf.scene.rotation.y = 87.255;
    //gltf.scene.rotation.z = -50;
    //gltf.scene.rotation.z = -200;
    gltf.scene.position.x = 690.102;
    gltf.scene.position.y = 0.769;
    gltf.scene.position.z = 2441.885;
    gltf.scene.scale.set(1, 1, 1);



    gltf.scene.rotation.y = 87.135;
    //gltf.scene.rotation.z = -200;
    gltf.scene.position.x = -1089.102;
    gltf.scene.position.y = 0.769;
    gltf.scene.position.z = 2241.885;
    */
    scene.add(gltf.scene);
    var axisHelper = new THREE.AxesHelper(0.1);
    scene.add(axisHelper);
    animate();
  });
};

export default {
  init,
  statusCallback: null,
};
