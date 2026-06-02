let map;
let markerLayer = L.layerGroup();
let userLocationMarker = null; // 내 위치 마커 변수

function initMap() {
    map = L.map('map').setView([37.380, 126.800], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    markerLayer.addTo(map);
    loadPlaces('all');

    // 내 위치 버튼 이벤트 리스너 추가
    document.getElementById('my-loc-btn').addEventListener('click', findMyLocation);
}

// --- 추가된 내 위치 찾기 로직 ---
function findMyLocation() {
    const btn = document.getElementById('my-loc-btn');
    
    // 위치 권한이 있는지 확인
    if (navigator.geolocation) {
        // 로딩 스피너로 아이콘 변경
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // 지도 중심을 내 위치로 부드럽게 이동
                map.flyTo([lat, lng], 15, { animate: true, duration: 1 });
                
                // 내 위치를 나타내는 파란색 커스텀 마커 생성
                if (!userLocationMarker) {
                    const userIcon = L.divIcon({
                        className: 'user-loc-icon',
                        html: "<div style='background-color:#4285F4; width:16px; height:16px; border-radius:50%; border:3px solid white; box-shadow:0 0 10px rgba(0,0,0,0.5);'></div>",
                        iconSize: [22, 22],
                        iconAnchor: [11, 11]
                    });
                    // zIndexOffset으로 다른 마커들보다 항상 위에 보이게 설정
                    userLocationMarker = L.marker([lat, lng], {icon: userIcon, zIndexOffset: 1000}).addTo(map);
                } else {
                    userLocationMarker.setLatLng([lat, lng]); // 이미 있으면 위치만 갱신
                }
                
                // 아이콘 원상복구
                btn.innerHTML = '<i class="fa-solid fa-crosshairs"></i>';
            }, 
            function(error) {
                alert('위치 정보를 가져올 수 없습니다. 브라우저 GPS 권한을 확인해주세요.');
                btn.innerHTML = '<i class="fa-solid fa-crosshairs"></i>';
            }
        );
    } else {
        alert('현재 브라우저에서는 위치 정보 기능을 지원하지 않습니다.');
    }
}

// ... (기존 loadPlaces, renderList, updateMarkers, filterCategory 함수는 동일하게 유지) ...

window.onload = initMap;