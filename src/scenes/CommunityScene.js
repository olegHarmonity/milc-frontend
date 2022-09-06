/* eslint-disable */
import { Engine, Scene } from "@babylonjs/core";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

const createScene = (canvas, callback) => {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);
  callback(true);

  function CustomLoadingScreen() {
    console.log('customLoadingScreen creation');
  }
  CustomLoadingScreen.prototype.displayLoadingUI = function () {
    console.log('customLoadingScreen loading');
  };
  CustomLoadingScreen.prototype.hideLoadingUI = function () {
    window.document.getElementById('loadingScreen').style.visibility = 'hidden';
  };
  engine.loadingScreen = new CustomLoadingScreen();

  const camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(-1000, 500, -700),
    scene
  );
  camera.setTarget(new BABYLON.Vector3(0, 500, -700));
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0;

  // Append glTF model to scene.
  BABYLON.SceneLoader.AppendAsync("/", "community.gltf", scene);

  scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

  scene.onPointerPick = function (evt, pickInfo) {
    if (pickInfo.hit && pickInfo.pickedMesh) {
      switch (pickInfo.pickedMesh.name) {
        case "Spline.1-Mat.2": // Left
          window.open("https://community.milc.global/app/messages");
          break;
        case "Spline.2-Mat.2": // Center
          window.open("https://community.milc.global/app/");
          break;
        case "Spline-Mat.2": // Right
          window.open("https://community.milc.global/app/profile");
          break;
      }
    }
  };

  scene.executeWhenReady(function () {
    engine.hideLoadingUI();
    callback(false);
  });

  engine.runRenderLoop(function () {
    if (scene) {
      scene.render();
    }
  });

  // Move the light with the camera
  scene.registerBeforeRender(function () {
    light.position = camera.position;
    camera.rotation.x = 0;

    if (camera.rotation.y > 2.1348654935302314) {
      camera.rotation.y = 2.1348654935302314;
    }

    if (camera.rotation.y < 1.2285572855556068) {
      camera.rotation.y = 1.2285572855556068;
    }
  });
};

export {createScene};