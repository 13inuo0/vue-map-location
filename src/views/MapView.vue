<template>
  <div>map</div>
  <!-- 지도를 표시할 div 입니다 -->
  <div id="map" style="width: 100%; height: 350px"></div>
</template>
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // 카카오 지도 SDK가 로드된 후 실행
  window.kakao.maps.load(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표 (위도,경도) ex) 대구 광역시 (35.798838, 128.583052)

      level: 3, // 지도의 확대 레벨 (숫자가 작을수록 확대)
    };
    const map = new kakao.maps.Map(container, options);

    // 🚩마커
    // 마커가 표시될 위치입니다
    // const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

    // 마커 이미지 설정
    const imageSrc = "/delivery.png"; //
    const imageSize = new kakao.maps.Size(50, 40); //이미지 크기
    const imageOption = { offset: new kakao.maps.Point(15, 40) }; // 중심좌표 기준 위치 조정 15,40
    // 마커 이미지 객체 생성
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: options.center,
      image: markerImage, //이미지 적용
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  });
});
</script>

<style scoped></style>
