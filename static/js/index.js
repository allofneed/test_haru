document.addEventListener('DOMContentLoaded', () => {
    // 1. 지도부터 띄웁니다 (기본 시흥시 좌표)
    const map = L.map('realMap', { zoomControl: false }).setView([37.3801, 126.8029], 15);

    // 2. 타일 깔기
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

    // 3. 🌟 위치 찾기 및 이동 함수 (강력 업데이트)
    function fetchAndGoToLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // 🌟 지도를 드래그해 뒀어도, 이 함수가 실행되면 내 위치로 부드럽게 날아감!
                    map.flyTo([lat, lng], 16, {
                        animate: true,
                        duration: 0.8 
                    });

                    // 내 위치 마커 갱신
                    if (userMarker) map.removeLayer(userMarker);
                    userMarker = L.marker([lat, lng], { icon: myLocIcon }).addTo(map);

                    // 가짜 핫플들 (내 위치 주변에 다시 세팅)
                    L.marker([lat + 0.002, lng - 0.002], { icon: createCustomIcon('cafe', '#e67e22') }).addTo(map);
                    L.marker([lat - 0.001, lng + 0.003], { icon: createCustomIcon('restaurant', '#e74c3c') }).addTo(map);
                    L.marker([lat + 0.003, lng + 0.001], { icon: createCustomIcon('bed', '#1abc9c') }).addTo(map);
                }, 
                (error) => {
                    console.log("GPS 권한 대기 중이거나 거부됨");
                },
                { 
                    enableHighAccuracy: true, // 🌟 GPS 정확도 최대로!
                    timeout: 5000, 
                    maximumAge: 0 // 🌟 캐시된 예전 위치 무시하고 즉시 새로 측정!
                }
            );
        }
    }

    // 4. 로딩되자마자 한 번 실행
    fetchAndGoToLocation();

    // 5. 🌟 강아지 발바닥 버튼 클릭 이벤트 확실하게 연결!
    const gpsBtn = document.getElementById('gpsBtn');
    if(gpsBtn) {
        gpsBtn.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 동작 방지
            
            // 시각적 피드백 (버튼이 쏙 눌리는 효과)
            gpsBtn.style.transform = 'scale(0.8)';
            setTimeout(() => gpsBtn.style.transform = 'scale(1)', 150);
            
            // 클릭할 때마다 위치 다시 찾아서 스무스하게 이동!
            fetchAndGoToLocation();
        });
    }

    // 지도가 화면에 정상적으로 그려지도록 크기 재계산
    setTimeout(() => { map.invalidateSize(); }, 500);
});



// ==========================================
    // 🌟 QR 코드 모달 열기/닫기 로직
    // ==========================================
    // 바텀 네비게이션의 5번째 요소 (QR코드 버튼) 찾기
    const qrNavItem = document.querySelectorAll('.navigation ul li')[4];
    const qrModal = document.getElementById('qrModal');
    const closeQrBtn = document.getElementById('closeQrBtn');

    if(qrNavItem && qrModal && closeQrBtn) {
        // QR 메뉴 클릭 시 모달 열기
        qrNavItem.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 링크 이동 막기
            qrModal.classList.add('show');
        });

        // X 버튼 클릭 시 모달 닫기
        closeQrBtn.addEventListener('click', () => {
            qrModal.classList.remove('show');
        });
    }