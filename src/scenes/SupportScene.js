/* eslint-disable */
import { Engine, Scene } from "@babylonjs/core";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

const createScene = canvas => {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);

  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 500, 600), scene);
  camera.setTarget(new BABYLON.Vector3(-1400, 400, -500));
  camera.attachControl(canvas, true);
  var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  // Append glTF model to scene.
  BABYLON.SceneLoader.AppendAsync('/', '3DSupportroom.gltf', scene);

  scene.onPointerPick = function (evt, pickInfo) {
    if (pickInfo.hit && pickInfo.pickedMesh) {
      switch (pickInfo.pickedMesh.name) {
        case 'F.1-Mat.2':
        case 'F.1-Low reflection':
        case 'MILC - 3D logo.3-Mat.2': // Feedback
          camera.position = new BABYLON.Vector3(-1400, 400, -500);
          break;
        case '1.1-Mat.2':
        case '1.1-Low reflection':
        case 'MILC - 3D logo.2-Mat.2': // Privacy Policy
          camera.position = new BABYLON.Vector3(-800, 400, -500);
          break;
        case '1-Mat.2':
        case 'MILC - 3D logo-Mat.2': // Terms of Use
          camera.position = new BABYLON.Vector3(0, 400, -500);
          break;
        case '1.3-Mat.2':
        case 'MILC - 3D logo.1-Mat.2': // Technical Support
          camera.position = new BABYLON.Vector3(600, 400, -600);
          break;
        case 'Q&.1-Low reflection':
        case 'Q&.1-Mat.2':
        case 'MILC - 3D logo.4-Mat.2': // Q & A
          camera.position = new BABYLON.Vector3(1300, 400, -450);
          break;
        case 'Cube.30-Mat.12':
          // window.open('https://milc.global/support/feedback');
          break;
        case 'Cube.29-Mat.11':
          // window.open('https://milc.global/support/privacy_policy');
          break;
        case 'Cube.26-Mat.10':
          // window.open('https://milc.global/support/terms_of_use');
          break;
        case 'Cube.27-Mat.13':
          // window.open('https://milc.global/support/technical_support');
          break;
        case 'Cube.28-Mat.14':
          // window.open('https://milc.global/support/question_answer');
          break;
        default:
          // camera.position = new BABYLON.Vector3(0, 300, 200);
          break;
      }
      camera.attachControl(canvas, true);
    }
  }

  // Move the light with the camera
  scene.registerBeforeRender(function() {
    light.position = camera.position;
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
};

export { createScene };
