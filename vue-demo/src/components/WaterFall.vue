<template>
  <div class="container">
    <div v-for="(item, i) in imgArr" ref="boxRef" class="box">
      <div class="box-img" ref="boxImgRef">
        <img :src="item" :key="i" alt="" />
      </div>
    </div>
  </div>
  <button @click="test" style="width: 200px; height: 50px;">test</button>
</template>

<script setup lang=ts>
import { onMounted, onBeforeMount, ref } from 'vue';

// 获取图片
const imgList = import.meta.glob('/src/assets/imgs/*.*', { eager: true });
const imgMap = new Map(Object.entries(imgList));
const imgArr = ref<string[]>([]);

// 防抖
const debounce = function (func: Function, delay = 1000) {
  let timer: number = 0;
  return function (this: any, ...args: any) {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 存储 box 容器Dom
const boxRef = ref<HTMLElement[]>([]);


// 视窗宽度
const winWidth = ref(window.innerWidth);
const getWinWidth = () => {
  winWidth.value = window.innerWidth;
  console.log("windowWidth", winWidth.value);
  // 重新获取一行图片数量
  getImgNum();
}
// 重新获取视窗宽度
const reGetWinWidth = debounce(getWinWidth, 1000);

const getImgWidth = () => {
  const boxImg = document.querySelector(".box-img") as HTMLElement;
  if (boxImg) {
    return boxImg.offsetWidth;
  } else {
    return 0;
  }
}

// 一行的图片数量
let imgNum = ref(0);
// 图片宽度
let imgWidth = ref(0);
// 计算一行图片数量
const getImgNum = () => {
  imgWidth.value = getImgWidth();
  imgNum.value = imgWidth.value === 0 ? 0 : Math.floor(winWidth.value / imgWidth.value);
}
onBeforeMount(() => {
  // 将图片放入数组
  imgMap.forEach((val = '', key) => {
    imgArr.value.push(key);
  });
});
onMounted(() => {

  // 获取初始图片宽度
  getWinWidth();
  // 监听窗口宽度变化
  window.addEventListener('resize', () => {
    reGetWinWidth();
    waterFall();
  });

});

const waterFall = () => {
  const BoxHeightArr = [];
  const boxArr = boxRef.value;
  for (let i = 0; i < boxArr.length; i++) {
    if (i < imgNum.value) {
      // 第一行各个图片的高度
      BoxHeightArr.push(boxArr[i].offsetHeight);
    } else {
      let minHeight = Math.min.apply(null, BoxHeightArr);
      // 返回数组下标
      let minIndex = BoxHeightArr.indexOf(minHeight);
      boxArr[i].style.position = "absolute";
      boxArr[i].style.top = minHeight + "px";
      boxArr[i].style.left = (imgWidth.value) * minIndex + 'px'; //BUG
      console.log("i: ", i + ", top: ", boxArr[i].style.top + ", left: ",boxArr[i].style.left);
      console.log("minHeigth: ", minHeight + ", minIndex: ", minIndex);
      console.log(" ");
      // 更新最短一列的高度
      BoxHeightArr[minIndex] += boxArr[i].offsetHeight;
    }
  }
  console.log(imgWidth.value);
}
window.onload = function () {
  waterFall();
}
const test = () => {
  // for (const i of boxImgRef.value) {
  //   console.log(i.offsetHeight);
  // }
  // getImgNum();
  // console.log(imgNum.value);
  waterFall();
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  position: relative;
  /* TODO */
  /* overflow: hidden;  */
}

.box {
  float: left;
}

.box-img {
  width: 150px;
  padding: 15px;
}

.box-img img {
  width: 100%;
}
</style>