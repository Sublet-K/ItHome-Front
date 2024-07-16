// import React, { useState, useRef, RefObject } from "react";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { useSearchLocationStore } from "../../store/SearchLocationStore";
// import * as headerStyle from "@shared/styles/Header.styles";
// import styled from "styled-components";
// import { IconButton } from "@mui/material";
// import AdministrativeDistricts from "@shared/StaticData/AdministrativeDistricts";
// import DropBoxSelect from "@shared/components/Input/DropBoxSelect";

// const Popup = styled.div<{ buttonref: RefObject<HTMLButtonElement> }>`
//   background-color: white;
//   border: 1px solid black;
//   position: absolute;
//   width: 20em;
//   top: ${({ buttonref }) =>
//     buttonref.current
//       ? buttonref.current.offsetTop + buttonref.current.offsetHeight
//       : 0}px;
//   left: ${({ buttonref }) =>
//     buttonref.current ? buttonref.current.offsetLeft : 0}px;
//   padding: 1.5em 1em 0 1em;
//   z-index: 101;
//   justify-content: center;
// `;

// const Layout = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   gap: 10px;
// `;

// const SearchLocation = () => {
//   const { searchLocation, setSearchLocation } = useSearchLocationStore();
//   const [tempPos, setTempPos] = useState(searchLocation); // 실제 값은 priceRange에 저장 // 추후 위치 기반으로 초기화.
//   const [isListVisible, setIsListVisible] = useState(false);
//   const buttonRef = useRef<HTMLButtonElement>(null);
//   const cities = Object.keys(AdministrativeDistricts) as string[];

//   const togglePosFilter = () => {
//     setIsListVisible(!isListVisible);
//   };

//   const handleSubmit = () => {
//     setSearchLocation(tempPos["city"], tempPos["gu"]);
//     setIsListVisible(false);
//   };

//   const handleCancel = () => {
//     setTempPos(searchLocation);
//     setIsListVisible(false);
//   };

//   const onChange = (e: any) => {
//     setTempPos({ ...tempPos, [e.target.name]: e.target.value });
//   };

//   return (
//     <span className="font-semibold leading-6 text-gray-900">
//       <IconButton ref={buttonRef} onClick={togglePosFilter}>
//         <headerStyle.blackBoldFont>
//           위치
//           <LocationOnIcon />
//         </headerStyle.blackBoldFont>
//       </IconButton>
//       {isListVisible && (
//         <Popup buttonref={buttonRef}>
//           <Layout>
//             시/도
//             <DropBoxSelect
//               name="city"
//               state={tempPos["city"]}
//               onChange={onChange}
//               labelName="시/도"
//               labelId="city"
//               id="city"
//               menuItems={cities}
//             />
//             구/시/군/면
//             <DropBoxSelect
//               name="gu"
//               state={tempPos["gu"]}
//               onChange={onChange}
//               labelName="구/시/군/면"
//               labelId="gu"
//               id="gu"
//               menuItems={
//                 tempPos["city"]
//                   ? (AdministrativeDistricts as { [key: string]: string[] })[
//                       tempPos["city"]
//                     ]
//                   : ["시/군을 먼저 선택해주세요"]
//               }
//             />
//           </Layout>
//           <headerStyle.acceptOrCancleButton>
//             <button onClick={handleSubmit}>적용</button>
//             <button onClick={handleCancel}>취소</button>
//           </headerStyle.acceptOrCancleButton>
//         </Popup>
//       )}
//     </span>
//   );
// };

// export default SearchLocation;

// /* 지도로 위치 입력하던 부분 보류. -> 아예 지도 검색 부분은 다른 페이지로 넘어가서 하는게 나을 듯. searchedSublet 기반으로. <- 이 페이지가 직방 지도 검색하고 비슷한 느낌이어서
// import { LocationInput } from "@shared/components/Input/LocationInput";

//           <LocationInput
//             pos={tempPos}
//             currentPos={searchLocation}
//             onChange={setTempPos}
//           />
// */
