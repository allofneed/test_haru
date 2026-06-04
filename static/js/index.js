document.addEventListener('DOMContentLoaded', () => {
    const mapIframe = document.getElementById('realMap');
    const gpsBtn = document.querySelector('.gps-button');

    // 🌟 실제 내 위치(위도, 경도)를 가져와서 지도에 띄우는 마법의 함수
    function loadRealLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // API 키 없이도 구글맵에 위도/경도 좌표를 꽂아버리는 URL 구조
                    mapIframe.src = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
                    console.log("📍 내 실제 위치 로드 완료:", lat, lng);
                }, 
                () => {
                    alert("위치 정보 접근 권한을 허용해주세요!");
                    // 권한 거부 시 기본 위치(서울 강남역) 띄우기
                    mapIframe.src = `https://maps.google.com/maps?q=37.4979,127.0276&z=15&output=embed`;
                }
            );
        } else {
            alert("이 브라우저에서는 GPS를 지원하지 않습니다.");
        }
    }

    // 1. 페이지 켜자마자 내 위치 로드
    loadRealLocation();

    // 2. 우측 하단 GPS 버튼 누르면 다시 내 위치로 이동!a
    if(gpsBtn) {
        gpsBtn.addEventListener('click', () => {
            // 버튼 누를 때 살짝 애니메이션 효과 (선택사항)
            gpsBtn.style.transform = 'scale(0.8)';
            setTimeout(() => gpsBtn.style.transform = 'scale(1)', 150);
            
            loadRealLocation();
        });
    }
});