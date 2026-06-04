document.addEventListener('DOMContentLoaded', () => {
    const mapIframe = document.getElementById('realMap');
    const gpsBtn = document.getElementById('gpsBtn'); // 강아지 아이콘 버튼

    // 실제 내 위치(위도, 경도)를 가져와서 지도에 띄우기
    function loadRealLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // API 키 없이 구글맵에 좌표 꽂기 (z=15로 확대 비율 조절)
                    mapIframe.src = `http://googleusercontent.com/maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
                    console.log("📍 내 실제 위치 로드 완료:", lat, lng);
                }, 
                () => {
                    alert("위치 정보 접근 권한을 허용해주세요!");
                    // 권한 거부 시 기본 위치 (시흥시청 주변 임시 좌표)
                    mapIframe.src = `http://googleusercontent.com/maps.google.com/maps?q=37.3801,126.8029&z=15&output=embed`;
                }
            );
        } else {
            alert("이 브라우저에서는 GPS를 지원하지 않습니다.");
        }
    }

    // 1. 페이지 켜자마자 내 위치 로드
    loadRealLocation();

    // 2. 우측 하단 강아지(GPS) 버튼 누르면 다시 내 위치로 이동!
    if(gpsBtn) {
        gpsBtn.addEventListener('click', () => {
            // 버튼 클릭 애니메이션
            gpsBtn.style.transform = 'scale(0.8)';
            setTimeout(() => gpsBtn.style.transform = 'scale(1)', 150);
            
            loadRealLocation();
        });
    }
});