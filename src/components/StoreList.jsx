// StoreList.jsx
const StoreList = ({ stores, selectedStore, onStoreClick }) => {
  return (
    <div style={{ 
      width: "350px", 
      borderRight: "1px solid #ddd", 
      padding: "20px", 
      overflowY: "auto",
      backgroundColor: "#fff" 
    }}>
      <h2 style={{ margin: "0 0 20px 0", fontSize: "1.5rem" }}>
        🥐 화면 속 소금빵 ({stores.length})
      </h2>
      
      {stores.length === 0 ? (
        <div style={{ color: "#888", textAlign: "center", marginTop: "50px", lineHeight: "1.6" }}>
          앗, 이 근처에는 아직 발견된 소금빵 맛집이 없네요 🥲<br/>
          지도를 움직여서 숨겨진 빵집을 찾아볼까요?
        </div>
      ) : (
        stores.map((store) => (
          <div 
            key={store.id} 
            onClick={() => onStoreClick(store)}
            style={{ 
              padding: "15px", 
              borderBottom: "1px solid #eee", 
              cursor: "pointer",
              backgroundColor: selectedStore?.id === store.id ? "#fff9eb" : "transparent",
              transition: "background-color 0.2s",
              borderRadius: "8px",
              marginBottom: "5px"
            }}
          >
            <strong style={{ fontSize: "18px", color: "#333" }}>{store.name}</strong>
            <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
              <div>📍 {store.address}</div>
              {store.operating_hours && (
                <div style={{ marginTop: "3px", color: "#999" }}>⏰ {store.operating_hours}</div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StoreList;