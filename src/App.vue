<template>
  <div>
    <router-link to="/">기본 지도</router-link> |
    <router-link to="/marker">여러마커 지도</router-link> |
    <router-link to="/location">주소검색 지도</router-link> |
    <h2>카카오 지도 연습하기</h2>
    <router-view></router-view>
  </div>
</template>
<script setup>
</script>

<style scoped></style>
