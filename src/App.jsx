import { Map, MapMarker } from "react-kakao-maps-sdk";

function App() {
  return (
    /* fixed와 inset-0는 부모 CSS를 무시하고 화면 전체를 강제로 차지하게 합니다. */
    <div style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100vw", 
      height: "100vh",
      backgroundColor: "#f0f0f0" // 지도가 안 뜰 때 배경이라도 보이는지 확인용
    }}>
      <Map
        center={{ lat: 35.1532, lng: 129.1189 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
      >
        <MapMarker position={{ lat: 35.1532, lng: 129.1189 }}>
          <div style={{ padding: "5px", color: "#000" }}>🥐 광안리 소금빵 원정대</div>
        </MapMarker>
      </Map>
    </div>
  );
}

export default App;