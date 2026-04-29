const StoreSidebar = ({ visibleStores, selectedStore, onStoreClick }) => {
  return (
    <div style={{ width: "350px", borderRight: "1px solid #ddd", padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <h2 style={{ margin: "0 0 20px 0" }}>🥐 화면 속 소금빵 ({visibleStores.length})</h2>

      {visibleStores.length === 0 ? (
        <div style={{ color: "#888", textAlign: "center", marginTop: "50px" }}>
          이 근처에는 아직 소금빵 맛집이 없네요 🥲<br/>지도를 움직여 보세요!
        </div>
      ) : (
        visibleStores.map(store => (
          <div 
            key={store.id} 
            onClick={() => onStoreClick(store)} 
            style={{ 
              padding: "15px", borderBottom: "1px solid #eee", cursor: "pointer",
              backgroundColor: selectedStore?.id === store.id ? "#fff9eb" : "transparent",
              transition: "background-color 0.2s"
            }}
          >
            <strong style={{ fontSize: "18px" }}>{store.name}</strong>
            <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
              <div>📍 {store.address}</div>
              {store.phone_number && <div>📞 {store.phone_number}</div>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StoreSidebar;