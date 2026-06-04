document.addEventListener('DOMContentLoaded', () => {
    // 1. 지도부터 무조건 띄웁니다! (기본 시흥시 좌표)
    const map = L.map('realMap', { zoomControl: false }).setView([37.3801, 126.8029], 15);

    // 2. 배경 지도 타일 바로 깔아주기
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    let userMarker = null;

    // 아이콘 생성 함수들
    const createCustomIcon = (iconName, color) => {
        return L.divIcon({
            className: 'clear-leaflet-bg',
            html: `<div class="marker-store" style="background: ${color};"><ion-icon name="${iconName}"></ion-icon></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        });
    };

    const myLocIcon = L.divIcon({
        className: 'clear-leaflet-bg',
        html: `
            <div class="marker-me-container">
                <div class="tooltip">현재 내 위치</div>
                <div class="dot"></div>
            </div>`,
        iconSize: [80, 50],
        iconAnchor: [40, 45]
    });

    // 3. 내 위치 불러오기 함수
    function loadRealLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // 지도를 내 위치로 스무스하게 이동
                    map.flyTo([lat, lng], 16);

                    // 기존 마커 지우기
                    if (userMarker) map.removeLayer(userMarker);

                    // 새 위치 마커 꽂기
                    userMarker = L.marker([lat, lng], { icon: myLocIcon }).addTo(map);

                    // 가짜 핫플들 (내 위치 주변에 뿌림)
                    L.marker([lat + 0.002, lng - 0.002], { icon: createCustomIcon('cafe', '#e67e22') }).addTo(map);
                    L.marker([lat - 0.001, lng + 0.003], { icon: createCustomIcon('restaurant', '#e74c3c') }).addTo(map);
                    L.marker([lat + 0.003, lng + 0.001], { icon: createCustomIcon('bed', '#1abc9c') }).addTo(map);
                }, 
                (error) => {
                    console.log("GPS 권한 대기 중이거나 거부됨");
                },
                { timeout: 5000 } // 5초 안에 안 되면 무시
            );
        }
    }

    // 4. 로딩되자마자 내 위치 한 번 찾기
    loadRealLocation();

    // 5. GPS 버튼 누르면 다시 내 위치 찾기
    const gpsBtn = document.getElementById('gpsBtn');
    if(gpsBtn) {
        gpsBtn.addEventListener('click', () => {
            gpsBtn.style.transform = 'scale(0.8)';
            setTimeout(() => gpsBtn.style.transform = 'scale(1)', 150);
            loadRealLocation();
        });
    }

    // 🌟 회색 에러 방지용: 지도가 화면에 그려진 후 사이즈 재계산
    setTimeout(() => { map.invalidateSize(); }, 500);
});