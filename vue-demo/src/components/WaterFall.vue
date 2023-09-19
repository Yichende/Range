<template>
  <!-- BUG: v-if 导致 DOM 渲染失效, 保留isReloadAlive -->
  <div class="container" v-if="true">
    <div v-for="(item, i) in imgArr" ref="boxRef" class="box">
      <div class="box-img" ref="boxImgRef">
        <img :src="item" :key="i" alt="" />
      </div>
    </div>
  </div>
  <button @click="test" style="width: 200px; height: 50px; z-index: 100;">test</button>
  <button @click="test1" style="width: 200px; height: 50px; z-index: 100;">true</button>
  <button @click="test2" style="width: 200px; height: 50px; z-index: 100;">false</button>
</template>

<script setup lang=ts>
import { onMounted, onBeforeMount, nextTick, ref } from 'vue';

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

// 刷新
const isReloadAlive = ref(true);

async function reload() {
  isReloadAlive.value = false;
  await nextTick(() => {
    isReloadAlive.value = true;
    console.log("触发了reload");
  })
}



// 存储 box 容器Dom
const boxRef = ref<HTMLElement[]>([]);

// 视窗宽度
const winWidth = ref(window.innerWidth);

const getWinWidth = () => {
  winWidth.value = window.innerWidth;
  console.log("testWindowWidth", winWidth.value);
}
// 重新获取视窗宽度
const reGetWinWidth = debounce(getWinWidth, 1000);

// 图片宽度
const imgWidth = ref(0);

const getImgWidth = () => {
  const boxImg = document.querySelector(".box-img") as HTMLElement; //BUG
  if (boxImg) {
    imgWidth.value = boxImg.offsetWidth;
    console.log("testBoxImgOffsetW", boxImg.offsetWidth);
  } else {
    return 0;
  }
}

// 一行的图片数量
let imgNum = ref(0);
// 计算一行图片数量
const getImgNum = () => {
  imgNum.value = imgWidth.value === 0 ? 0 : Math.floor(winWidth.value / imgWidth.value);
  console.log("testImgWidth", imgWidth.value);
  // console.log("testImgNum", imgNum.value);
}

const waterFall = () => {
  const BoxHeightArr = [];
  const boxArr = boxRef.value;
  // console.log("testBoxArr", boxArr);
  for (let i = 0; i < boxArr.length; i++) {
    if (i < imgNum.value) {
      // 第一行各个图片的高度
      BoxHeightArr.push(boxArr[i].offsetHeight);
      console.log("testBoxArrLength", boxArr.length)
      console.log("test i<imgNum:", i);
      console.log("testBoxHeightArr", BoxHeightArr[i]);
      console.log(" ");
    } else {
      let minHeight = Math.min.apply(null, BoxHeightArr);
      console.log("testMinHeight", minHeight);
      // 返回数组下标
      let minIndex = BoxHeightArr.indexOf(minHeight);
      boxArr[i].style.position = "absolute";
      boxArr[i].style.top = minHeight + "px";
      boxArr[i].style.left = (imgWidth.value) * minIndex + 'px';
      console.log("i: ", i + ", top: ", boxArr[i].style.top + ", left: ", boxArr[i].style.left);
      console.log("minHeigth: ", minHeight + ", minIndex: ", minIndex);
      console.log(" ");
      // 更新最短一列的高度
      BoxHeightArr[minIndex] += boxArr[i].offsetHeight;
    }
  }
  console.log("imgWidth", imgWidth.value);
  console.log("imgNum", imgNum.value);
  // reload();
}


const reWaterFall = debounce(waterFall, 1200);

window.onload = function () {
  // 监听窗口宽度变化
  window.addEventListener('resize', () => {
    reGetWinWidth();
    reWaterFall();
  });
}

onBeforeMount(() => {
  // 将图片文件放入数组
  imgMap.forEach((val = '', key) => {
    imgArr.value.push(key);
  });
});

const domPromise = new Promise((resolve) => {
  // 获取视窗宽度
  getWinWidth();
  // 获取图片宽度
  getImgWidth();
  // 获取第一行图片数量
  getImgNum();

  setTimeout(() => {
    resolve("resolve");
  }, 1000)
});

onMounted(() => {
  // 获取视窗宽度
  getWinWidth();
  // 获取图片宽度
  getImgWidth();
  // 获取第一行图片数量
  getImgNum();

  // domPromise.then(() => waterFall);
  setTimeout(() => {
    waterFall();
  }, 100);
});

const test = () => {
  // for (const i of boxImgRef.value) {
  //   console.log(i.offsetHeight);
  // }
  // getImgNum();
  // console.log(imgNum.value);
  waterFall();
  // reload();
}

const test1 = () => {
  isReloadAlive.value = true;
  console.log("isReload", isReloadAlive.value);
}

const test2 = () => {
  isReloadAlive.value = false;
  console.log("isReload", isReloadAlive.value);
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
  overflow: scroll;
  height: calc(100vh);
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