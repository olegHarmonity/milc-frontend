/* eslint-disable */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";
import { debounce } from "lodash";
import router from "@/router";
import { Water } from "@/plugins/Water";

const building_map = {
  "HOROR-Low reflection": { id: 7, name: "category_horror", noColor: true },
  "ACTION-Low reflection": { id: 1, name: "category_action", noColor: true },
  "NEWEST-Low reflection": { id: "all", name: "category_newest", noColor: true },
  "COMEDY-Low reflection": { id: 3, name: "category_comedy", noColor: true },
  "MYSTERY-Low reflection": { id: 12, name: "category_mystery", noColor: true },
  "FANTASY-Low reflection": { id: 5, name: "category_fantasy", noColor: true },
  "DRAMA-Low reflection": { id: 13, name: "category_drama", noColor: true },
  "TOP RATED-Low reflection": {
    id: 15,
    name: "category_topRated",
    noColor: true,
  },
  "CRIME-Low reflection": { id: 4, name: "category_crime", noColor: true },
  "DOCUMENTARY-Low reflection": {
    id: 14,
    name: "category_documentary",
    noColor: true,
  },

  "Display - Horror-Mat.2": { id: 7, name: "category_horror" },
  "Display - Action-Mat.2": { id: 1, name: "category_action" },
  "Display - Newest-Mat.2": { id: 16, name: "category_newest" },
  "Display - Comedy-Mat.2": { id: 3, name: "category_comedy" },
  "Display - Mystery-Mat.2": { id: 12, name: "category_mystery" },
  "Display - Fantasy-Mat.2": { id: 5, name: "category_fantasy" },
  "Display - Drama-Mat.2": { id: 13, name: "category_drama" },
  "Display - Top rated-Mat.2": { id: 15, name: "category_topRated" },
  "Display - Crime-Mat.2": { id: 4, name: "category_crime" },
  "Display - Document--Mat.2": { id: 14, name: "category_documentary" },

  "Display - Horror": { id: 7, name: "category_horror" },
  "Display - Action": { id: 1, name: "category_action" },
  "Display - Newest": { id: 16, name: "category_newest" },
  "Display - Comedy": { id: 3, name: "category_comedy" },
  "Display - Mystery": { id: 12, name: "category_mystery" },
  "Display - Fantasy": { id: 5, name: "category_fantasy" },
  "Display - Drama": { id: 13, name: "category_drama" },
  "Display - Top rated": { id: 15, name: "category_topRated" },
  "Display - Crime": { id: 4, name: "category_crime" },
  "Display - Document-": { id: 14, name: "category_documentary" },

  Horror: { id: 7, name: "category_horror" },
  Action: { id: 1, name: "category_action" },
  Newest: { id: 16, name: "category_newest" },
  Comedy: { id: 3, name: "category_comedy" },
  Mystery: { id: 12, name: "category_mystery" },
  Fantasy: { id: 5, name: "category_fantasy" },
  Drama: { id: 13, name: "category_drama" },
  "Top rated": { id: 15, name: "category_topRated" },
  Crime: { id: 4, name: "category_crime" },
  DOCUMENTARY: { id: 14, name: "category_documentary" },
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

const handleAfterEvent = (item) => {
  var id = 1;
  if (item && item.id) id = item.id;
  router.push({
    name: "app.products.category",
    params: { id: id },
  });
};

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
        handleAfterEvent(item);
      }, 500)
    )
    .start();
};

const click = (event) => {
  console.log(camera, scene);
  event.preventDefault();
  raycaster.setFromCamera(mouse, camera);
  //camera.position.set(3000, 2600, 4100);
  var intersects = raycaster.intersectObjects(scene.children[4].children, true);

  var blnParentCheck = false;
  //  console.log(intersects);
  intersects.forEach((item) => {
    //  console.log(item, item.object.name);
    var objectName = "";
    if (item && item.object.parent && blnParentCheck) {
      if (item.object.parent.userData && item.object.parent.userData.name) {
        objectName = item.object.parent.userData.name.trim();
      } else {
        objectName = item.object.name.trim();
      }
    } else {
      if (item.object.userData && item.object.userData.name) {
        objectName = item.object.userData.name.trim();
      } else {
        objectName = item.object.name.trim();
      }
    }
    console.log(objectName);
    if (building_map[objectName] && building_map[objectName].name) {
      if (!building_map[objectName].noColor) {
        var color = item.object.material.color.getHex();
        if (color === 0xffffff) item.object.material.color.setHex(0x000000);
        else item.object.material.color.setHex(0xffffff);
      }
      moveToObj(event, item, building_map[objectName]);
    }
  });
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
  renderer.setClearColor(0xffffff, 0);
  // add event for raycaster events
  renderer.domElement.addEventListener("click", click, false);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;
  controls.enablePan = false;
  controls.enableDamping = true;
  //controls.enableRotate = true;
  controls.rotateSpeed = 0.2;
  controls.zoomSpeed = 0.2;

  controls.minDistance = 2000;
  controls.maxDistance = 3300;

  //controls.autoRotate = true;
  //controls.maxPolarAngle = Math.PI * 0.45;
  controls.minPolarAngle = Math.PI * 0.45;//0.4;
  controls.maxPolarAngle = Math.PI * 0.53;//Math.PI * 0.6;

  controls.minAzimuthAngle = 0.15; // default
  controls.maxAzimuthAngle = 0.65; // default

  controls.listenToKeyEvents(window);
  controls.update();

  hlight = new THREE.AmbientLight(0x404040, 0.3);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.8 * Math.PI);
  directionalLight.position.set(2, 10, 0.866); // it's a day

  const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  hemiLight.name = "hemi_light";
  scene.add(hemiLight);

  //directionalLight.castShadow = true;
  scene.add(directionalLight);

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
  loader.load("categoryv2.gltf", function (gltf) {
    //loader.load("new10.gltf", function (gltf) {
    gltf.scene.rotation.z = -0.05;
    gltf.scene.rotation.x = 0;
    gltf.scene.rotation.y = 86.79;
    //gltf.scene.rotation.z = -50;
    //gltf.scene.rotation.z = -200;

    gltf.scene.position.x = 530;
    gltf.scene.position.y = -350;
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
