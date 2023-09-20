<template>
  <div id="webgl" style="margin-top: 200px; margin-left: 100px; height: 500px; width: 500px;"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// /*---------- 虚拟场景 ----------*/
// // 创建3D场景对象 Scene
// const scene = new THREE.Scene();

// // 创建长方体集合对象
// const geometry = new THREE.BoxGeometry(100, 100, 100);

// // 创建材质对象
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000, // 0xff0000 设置材质颜色为红色
// })

// // 创建网格模型对象，两个参数分别为 几何体geometry，材质material
// const mesh = new THREE.Mesh(geometry, material);

// // 设置网格模型在三维空间中的位置坐标，默认是坐标原点
// mesh.position.set(0, 0, 0);

// // 最后通过 add 将网格模型 mesh 添加到三维场景中
// scene.add(mesh);

// /*---------- 虚拟相机 ----------*/
// // 实例化一个透视投影相机对象
// const camera = new THREE.PerspectiveCamera();

// // 相机在三维坐标系中的位置
// camera.position.set(300, 300, 300);

// // 相机观察目标
// camera.lookAt(mesh.position);

// // 定义相机输出画布的尺寸
// const width = 800;
// const height = 500;
// // 30:视场角度，width / height:Canvas 画布宽高比，1:近裁截面，3000:远裁截面
// // const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);

// /*---------- 渲染器 ----------*/
// // 创建渲染器对象
// const renderer = new THREE.WebGLRenderer();

// // 设置画布尺寸
// renderer.setSize(width, height);

// // 将Canvas画布插入到HTML元素中
// // document.getElementById('webgl')?.appendChild(renderer.domElement);
// document.body.appendChild(renderer.domElement);

// // 渲染器执行渲染
// // renderer.render(scene, camera);

// /*---------- 动画测试 ----------*/
// const animateTest = () => {
//   requestAnimationFrame(animateTest);

//   // mesh.rotation.x += 0.01;
//   mesh.rotation.y += 0.04;

//   renderer.render(scene, camera);
// }
// animateTest();



/*---------- 模型加载测试 ----------*/
const sceneSkull = new THREE.Scene();


const rendererSkull = new THREE.WebGLRenderer();
rendererSkull.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(rendererSkull.domElement);

const cameraSkull = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50);
cameraSkull.position.set(0, 0, 10);
cameraSkull.lookAt(0, 0, 0);

const loaderSkull = new GLTFLoader();
loaderSkull.load('src/assets/models/skull/scene.gltf', function (gltf: any) {

  // 解决模型材质过黑
  gltf.scene.traverse(function (child: any) {
    if (child.isMesh) {
      child.material.emissive = child.material.color;
      child.material.emissiveMap = child.material.map;
    }
  });


  const ambientLight = new THREE.AmbientLight(0xffffff); //设置环境光
  sceneSkull.add(ambientLight); //将环境光添加到场景中
  const pointLight = new THREE.PointLight(0xffffff, 1, 0);
  pointLight.position.set(10, 10, 10); //设置点光源位置
  sceneSkull.add(pointLight); //将点光源添加至场景

  sceneSkull.add(gltf.scene);
  // rendererSkull.render(sceneSkull, cameraSkull);

  // /*---------- 模型动画测试 ----------*/
  const animateTest = () => {
    requestAnimationFrame(animateTest);

    // mesh.rotation.x += 0.01;
    gltf.scene.rotation.y += 0.05;

    rendererSkull.render(sceneSkull, cameraSkull);
  }
  animateTest();


}, function (ProgressEvent: any) {
  console.log(ProgressEvent);
}, function (error: any) {
  console.error(error);
});



// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// function animate() {
//   requestAnimationFrame(animate);

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
// }

// animate();

</script>

<style scoped></style>