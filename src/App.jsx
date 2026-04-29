import { useEffect, useState } from "react";
import { supabase } from "./api/supabaseClient"; 
import { searchSaltBread } from "./api/kakaoApi";
import StoreList from "./components/StoreList";
import MapContainer from "./components/MapContainer";

function App() {
  const [stores, setStores] = useState([]);
  const [visibleStores, setVisibleStores] = useState([]); 
  const [selectedStore, setSelectedStore] = useState(null);
  const [map, setMap] = useState(null);
  const [franchiseList, setFranchiseList] = useState([]);
  const [showSearchButton, setShowSearchButton] = useState(false);

  
  const fetchStores = async () => {
    const { data: storeData } = await supabase
      .from('stores')
      .select('*')
      .eq('is_franchise', false) 
      .order('id', { ascending: false });
    
    if (storeData) setStores(storeData);

    const { data: franchiseData } = await supabase
      .from('franchise_brands')
      .select('name');
    
    if (franchiseData) setFranchiseList(franchiseData.map(f => f.name));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchStores();
      } catch (error) {
        console.error("초기 데이터 로딩 실패:", error);
      }
    };
    
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const updateVisibleStores = (mapInstance) => {
    if (!mapInstance || stores.length === 0) return;
    const bounds = mapInstance.getBounds();
    const visible = stores.filter((store) => {
      return bounds.contain(new window.kakao.maps.LatLng(store.lat, store.lng));
    });
    setVisibleStores(visible);
  };

  const handleMapIdle = (mapInstance) => {
    setMap(mapInstance);
    updateVisibleStores(mapInstance);
    setShowSearchButton(true);
  };

  const handleCollectData = async () => {
    try {
      if (!map) return;
      setShowSearchButton(false);
      const lat = map.getCenter().getLat();
      const lng = map.getCenter().getLng();
      const documents = await searchSaltBread(lat, lng);
      
      const storesToSave = documents.map((s) => ({
        name: s.place_name,
        address: s.address_name,
        lat: parseFloat(s.y),
        lng: parseFloat(s.x),
        phone_number: s.phone,
        is_franchise: franchiseList.some((brand) => s.place_name.includes(brand)),
        operating_hours: "정보 없음",
      }));

      if (storesToSave.length > 0) {
        await supabase.from("stores").upsert(storesToSave, { onConflict: "name" });
        fetchStores();
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <StoreList stores={visibleStores} selectedStore={selectedStore} onStoreClick={setSelectedStore} />
      <MapContainer 
        center={{ lat: 35.1532, lng: 129.1189 }}
        visibleStores={visibleStores}
        selectedStore={selectedStore}
        onStoreClick={setSelectedStore}
        onCreate={setMap}
        onIdle={handleMapIdle}
        showSearchButton={showSearchButton}
        onSearchClick={handleCollectData}
      />
    </div>
  );
}

export default App;