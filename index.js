import * as THREE from './node_modules/three/build/three.module.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

init();

function init() {
  const scene = new THREE.Scene();

  const axesHelper = new THREE.AxesHelper(window.innerHeight);
  scene.add(axesHelper);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
  camera.position.set(10, 0, 0);
  camera.lookAt(scene.position);
  
  const controls = new OrbitControls(camera, document.body);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  const dirLight = new THREE.AmbientLight(0xffffff, 2);
  dirLight.position.set(-20, 30, 30);
  scene.add(dirLight);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const loader = new GLTFLoader();
  // [ft-lab プロジェクトファイル置き場](https://ft-lab.github.io/gltf.html
  loader.load('./gltf/cabinet_AR.glb', function(gltf) {
      const model = gltf.scene;
      model.traverse((object) => {
          if(object.isMesh) {
            object.material.trasparent = true;
            object.material.opacity = 0.8;
            object.material.depthTest = true;
          }})
      model.rotation.y = 0.5 * Math.PI
      scene.add(model);
  }, undefined, function(e) {
      console.error(e);
  });

  document.body.appendChild(renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}