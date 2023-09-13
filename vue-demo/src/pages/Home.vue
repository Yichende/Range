<template>
  <div class="flex-container">
    <div>
      <div>1</div>
    </div>
    <div>
      <div>1</div>
    </div>
    <div>
      <div>1</div>
    </div>
    <div>
      <div>1</div>
    </div>
    <div>
      <div>1</div>
    </div>
    <div>
      <div>1</div>
    </div>
    <div>
      <div>1</div>
    </div>
    <div>
      <div>1</div>
    </div>
    <div>
      <div>1</div>
    </div>
    <div>
      <div>1</div>
    </div>
    <div>
      <div>1</div>
    </div>
  </div>
  <WaterFall />
</template>

<script setup lang=ts>
import WaterFall from "@/components/WaterFall.vue"
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
  width: 400px;
  background-color: aquamarine;
  padding: 20px;
}

.flex-container div {
  background-color: aliceblue;
  position: relative;
  width: 50%;
  height: 50px;
}

.flex-container div div {
  position: absolute;
  margin: auto;
  background-color: azure;
  text-align: center;
  line-height: 30px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 30px;
}</style>