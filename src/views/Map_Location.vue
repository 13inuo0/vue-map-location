<template>
  <div>
    <div class="search-box">
      <input v-model="keyword" placeholder="주소나 장소 입력" />
      <button @click="searchAddress">검색</button>
      <button @click="showMyLocation">📍내 위치</button>
    </div>
    <div id="map" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const map = ref(null);
const keyword = ref("");
let geocoder;
let currentMarker = null; // 검색 시 찍히는 마커를 관리하기 위함

onMounted(() => {
  window.kakao.maps.load(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 3,
    };

    map.value = new kakao.maps.Map(container, options);
    geocoder = new kakao.maps.services.Geocoder();

    const locations = [
      { name: "서울 시청", lat: 37.5665, lng: 126.978 },
      { name: "남산타워", lat: 37.5512, lng: 126.9882 },
      { name: "경복궁", lat: 37.5796, lng: 126.977 },
    ];

    locations.forEach((place) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.lat, place.lng),
        map: map.value,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        const info = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${place.name}</div>`,
        });
        info.open(map.value, marker);
        setTimeout(() => info.close(), 2000);
      });
    });
  });
});

// 🔍 주소 검색 함수
const searchAddress = () => {
  if (!keyword.value.trim()) {
    alert("주소나 장소를 입력해주세요");
    return; // 입력 없으면 함수 종료
  }

  geocoder.addressSearch(keyword.value, (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      map.value.setCenter(coords);

      // 이전 마커 삭제 (선택)
      if (currentMarker) {
        currentMarker.setMap(null);
      }

      // 새 마커 생성
      currentMarker = new kakao.maps.Marker({
        map: map.value,
        position: coords,
      });

      const info = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">검색 위치</div>`,
      });
      info.open(map.value, currentMarker);
      setTimeout(() => info.close(), 2000);
    } else {
      alert("검색 결과가 없습니다.");
    }
  });
};

// 📍 내 위치로 이동
const showMyLocation = () => {
  // ✅ 문법 수정: navigator.geolocation 존재 여부 확인
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const currentPos = new kakao.maps.LatLng(lat, lng);

        map.value.setCenter(currentPos);

        // 내 위치 마커 표시
        new kakao.maps.Marker({
          map: map.value,
          position: currentPos,
        });
      },
      (err) => {
        console.error(err);
        alert("위치 정보를 가져올 수 없습니다. 브라우저 권한을 확인해주세요.");
      }
    );
  } else {
    alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
  }
};
</script>

<style scoped>
.search-box {
  margin-bottom: 10px;
}
</style>
