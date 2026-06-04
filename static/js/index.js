document.addEventListener('DOMContentLoaded', () => {
    const mapIframe = document.getElementById('realMap');
    const gpsBtn = document.getElementById('gpsBtn');

    function loadRealLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // 🌟 404 에러 해결: 정상적인 구글 맵 임베드 주소로 변경!
                    mapIframe.src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
                    console.log("📍 내 실제 위치 로드 완료:", lat, lng);
                }, 
                () => {
                    alert("위치 정보 접근 권한을 허용해주세요!");
                    // 권한 거부 시 기본 위치 (시흥시청 주변)
                    mapIframe.src = `https://maps.google.com/maps?q=37.3801,126.8029&z=15&output=embed`;
                }
            );
        } else {
            alert("이 브라우저에서는 GPS를 지원하지 않습니다.");
        }
    }

    // 1. 페이지 로드 시 위치 불러오기
    loadRealLocation();

    // 2. 우측 하단 강아지 버튼 클릭 이벤트
    if(gpsBtn) {
        gpsBtn.addEventListener('click', () => {
            gpsBtn.style.transform = 'scale(0.8)';
            setTimeout(() => gpsBtn.style.transform = 'scale(1)', 150);
            
            loadRealLocation();
        });
    }
});