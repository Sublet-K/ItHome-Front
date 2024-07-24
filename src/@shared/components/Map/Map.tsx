import { Post } from "@/@type/Type";
import { useEffect, useRef, useState } from "react";
import { SubletPostStore } from "../../../@store/SubletPostStore";
import { CustomWindow } from "../../../app/RoomType";

export const KakaoMap = ({
  x,
  y,
  name,
}: {
  x?: number;
  y?: number;
  name?: string;
}) => {
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = true;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS}&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      if (name) {
        window.kakao.maps.load(() => {
          var mapContainer = document.getElementById("map"), // 지도를 표시할 div
            mapOption = {
              center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
              level: 3, // 지도의 확대 레벨
            };

          // 지도를 생성합니다
          var map = new window.kakao.maps.Map(mapContainer, mapOption);
          // 주소-좌표 변환 객체를 생성합니다
          var geocoder = new window.kakao.maps.services.Geocoder();
          // 주소로 좌표를 검색합니다
          geocoder.addressSearch(name, function (result, status) {
            // 정상적으로 검색이 완료됐으면

            if (status === window.kakao.maps.services.Status.OK) {
              var coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              // 인포윈도우로 장소에 대한 설명을 표시합니다
              var infowindow = new window.kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">집 위치</div>',
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          });
        });
      } else {
        window.kakao.maps.load(() => {
          var container = document.getElementById("map");
          var options = {
            center: new window.kakao.maps.LatLng(x, y),
            level: 3,
          };

          var map = new window.kakao.maps.Map(container, options);

          var position = new window.kakao.maps.LatLng(x, y);

          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
            position: position,
            clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          });

          marker.setMap(map);
        });
      }
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, [name, x, y]);

  return (
    <div className="w-full flex justify-center">
      <div
        id="map"
        className="w-full h-64 md:h-96 lg:h-[500px] lg:w-[500px]"
      ></div>
    </div>
  );
};

function markerHTML(price: number) {
  return `<div class="marker" 
  style="
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 30px;
    padding: 0 35px;
    border : 1px solid #afafaf;
    border-radius: 15px;
    background-color: white;
    cursor: pointer;
    &:hover {
      background-color: #ceffc8;
      span {
        color: white;
      }
    }
  "><span 
    style="
      color: black;
      font-size: 1rem;
      font-weight: 700;
      pointer-events: none;
    ">&#8361;${price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></div>`;
}

function searchAddressToCoordinate(address: string, map: string | null) {
  // const infoWindow = new window.naver.maps.InfoWindow({
  //   anchorSkew: true,
  // });

  let coordinate_item: { x: number; y: number } | undefined = undefined;
  const { naver } = window as CustomWindow;

  naver.maps.Service.geocode(
    {
      query: address,
    },
    (status: any, response: any) => {
      if (status === naver.maps.Service.Status.ERROR) {
        console.log("status ERROR");
        return undefined;
      }
      // console.log(response.v2);
      if (response.v2.meta.totalCount === 0) {
        console.log("검색정보 없음");
        return undefined;
      }

      const htmlAddresses = [];
      const item = response.v2.addresses[0];
      const point = new naver.maps.Point(item.x, item.y);

      coordinate_item = item;
      // console.log(coordinate_item);

      // if (item.roadAddress) {
      //   htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
      // }

      // if (item.jibunAddress) {
      //   htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
      // }

      // if (item.englishAddress) {
      //   htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
      // }

      // infoWindow.setContent([
      //   '<div style="padding:10px;width:300px;line-height:150%;">',
      //   '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
      //   htmlAddresses[0],
      //   '</div>'
      // ].join('\n'));

      // map.setCenter(point);
      // infoWindow.open(map, point);
    }
  );

  // 검색정보 있으면 좌표 반환
  return coordinate_item;
}

export default function Map(props: Post) {
  const { post, postExist, postAll } = SubletPostStore((state) => ({
    post: state.post,
    postExist: state.postExist,
    postAll: state.postAll,
  }));
  const setPostMarker = SubletPostStore((state) => state.setPostMarker);

  const mapRef = useRef<any>(null);
  const markerRef = useRef(null);
  const [markerAll, setMarkerAll] = useState(false);

  const { naver } = window as CustomWindow;

  useEffect(() => {
    createMap();
    createMarker();
  }, [markerAll]);

  function createMap() {
    mapRef.current = new naver.maps.Map(document.getElementById("map"), {
      zoom: 13,
    });
    if (!mapRef.current) return;
    (mapRef.current as any).setCursor("pointer");
  }

  function createMarker() {
    postAll?.map((post) => {
      let coordinate: { x: number; y: number } | undefined =
        searchAddressToCoordinate(post.position, mapRef.current);
      if (coordinate === undefined && mapRef.current) {
        coordinate = searchAddressToCoordinate(
          `${post.city} ${post.gu} ${post.dong} ${post.street} ${post.street_number}`,
          mapRef.current
        );
        if (coordinate === undefined) {
          coordinate = {
            x: post.x_coordinate,
            y: post.y_coordinate,
          };
        }
      }
      const newCoordinate = coordinate as { x: number; y: number };
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(newCoordinate.y, newCoordinate.x),
        map: mapRef.current,
        icon: {
          content: markerHTML(post.price),
          // size: new window.naver.maps.Size(22, 35),
          anchor: new naver.maps.Point(10, 15),
        },
      });

      markerClickEvent(markerRef.current, post);
      post.marker = markerRef.current;
    });
    setPostMarker(true);
    setMarkerAll(true);
  }

  function markerClickEvent(marker: any, post: any) {
    const { naver } = window as CustomWindow;
    naver.maps.Event.addListener(
      marker,
      "click",
      (e: { coord: { duratiob: number; easing: string } }) => {
        const mapLatLng = new naver.maps.LatLng(
          Number(post?.y_coordinate),
          Number(post?.x_coordinate)
        );
        // 부드럽게 이동하기
        mapRef.current.panTo(mapLatLng, e?.coord);
      }
    );
  }

  return (
    <div
      id="map"
      className="h-screen w-full rounded-lg"
      style={{ height: "calc(100vh - 250px)" }}
    />
  );
}
