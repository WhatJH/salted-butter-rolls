// const StoreDetail = ({ store, onClose }) => {
//   if (!store) return null;

//   return (
//     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[50] w-[90%] max-w-[380px] bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <h2 className="text-xl font-bold text-gray-900">{store.name}</h2>
//           <button onClick={() => onClose(null)} className="text-gray-400 p-1">✕</button>
//         </div>
        
//         <p className="text-sm text-gray-500 mb-4">{store.address}</p>

//         <div className="flex gap-2">
//           <a
//             href={store.place_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex-1 bg-black text-white text-center py-3 rounded-xl font-bold text-sm"
//           >
//             상세페이지
//           </a>
//           <a
//             href={`https://map.kakao.com/link/to/${store.id}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex-1 bg-yellow-400 text-yellow-900 text-center py-3 rounded-xl font-bold text-sm"
//           >
//             길찾기
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoreDetail;