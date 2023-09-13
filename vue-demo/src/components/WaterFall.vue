<template>
  <div>
    <button @click="test" style="width: 200px; height: 50px;">test</button>
    <img v-for="(item, i) in imgArr" :src="item" :key="i" alt="" />
  </div>
</template>

<script setup lang=ts>
import { onMounted, ref } from 'vue';

// 获取图片 url
// const getImgUrl = (imgName : string, suffix = 'jpg') => {
//   return new URL(`/src/assets/imgs/${imgName}.${suffix}`, import.meta.url).href;
// }

// 获取图片
const imgList = import.meta.glob('/src/assets/imgs/*.*', { eager: true });
const imgMap = new Map(Object.entries(imgList));
const imgArr = ref<string[]>([]);

// 防抖
const debounce = function (func: Function, delay = 1000) {
  let timer: number = 0;
  return function (...args: any) {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
const winWidth = ref(window.innerWidth);
const getWinWidth = () => {
  winWidth.value = window.innerWidth;
  console.log(winWidth.value);
}
// 重新获取视窗宽度
const reGetWinWidth = debounce(getWinWidth, 2000);

onMounted(() => {
  imgMap.forEach((val = '', key) => {
    imgArr.value.push(key);
  }),
    window.addEventListener('resize', reGetWinWidth);
})
const test = () => {

}
</script>

<style scoped></style>