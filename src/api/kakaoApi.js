const KAKAO_REST_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

export const searchSaltBread = async (lat, lng) => {
    const query = "소금빵"; 
    const radius = 500;    
    
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&y=${lat}&x=${lng}&radius=${radius}&sort=distance`;

    const response = await fetch(url, {
        headers: { Authorization: `KakaoAK ${KAKAO_REST_KEY}` },
    });

    if (!response.ok) {
        throw new Error("카카오 API 호출에 실패했습니다.");
    }

    const result = await response.json();
    return result.documents;
    };