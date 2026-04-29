import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapContainer = ({ center, visibleStores, selectedStore, onStoreClick, onCreate, onIdle, showSearchButton, onSearchClick }) => {
  return (
    <div style={{ flex: 1, position: "relative" }}>
      {/* 데이터 수집 버튼 */}
      {showSearchButton && (
        <button 
          onClick={onSearchClick}
          style={{ 
            position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 10,
            padding: "10px 20px", borderRadius: "25px", backgroundColor: "#3b82f6", color: "white", 
            border: "none", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", cursor: "pointer", fontWeight: "bold"
          }}
        >
          현 지도에서 소금빵 찾기 🔄
        </button>
      )}

      <Map 
        center={selectedStore ? { lat: selectedStore.lat, lng: selectedStore.lng } : center} 
        style={{ width: "100%", height: "100%" }} 
        level={4} 
        onCreate={onCreate}
        onIdle={onIdle} 
      >
        {visibleStores.map((store) => (
          <MapMarker 
            key={store.id} 
            position={{ lat: store.lat, lng: store.lng }}
            onClick={() => onStoreClick(store)}
          >
            {/* 카카오맵 스타일 상세 정보창 */}
            {selectedStore?.id === store.id && (
              <div style={{ padding: "10px", minWidth: "150px", backgroundColor: "#fff" }}>
                <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>{store.name} 🥐</div>
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>{store.address}</div>
                <a 
                  href={`https://map.kakao.com/link/to/${store.name},${store.lat},${store.lng}`}
                  target="_blank" rel="noreferrer"
                  style={{ fontSize: "12px", color: "#3b82f6", textDecoration: "none" }}
                >
                  카카오맵 길찾기 →
                </a>
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
};

export default MapContainer;