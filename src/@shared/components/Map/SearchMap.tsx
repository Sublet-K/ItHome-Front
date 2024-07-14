import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { SubletPostStore } from "../../../@store/SubletPostStore";
import { CustomWindow, Room } from "../../../app/RoomType";

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
    }
  );

  // 검색정보 있으면 좌표 반환
  return coordinate_item;
}

export default function SearchMap(
  mapType: string,
  name: string,
  room: Room,
  currentPos: [number, number],
  setPos: (newValue: [number, number]) => void
) {
  const setPostMarker = SubletPostStore((state) => state.setPostMarker);

  const mapRef = useRef<any>(null);
  const markerRef = useRef(null);
  const [marker, setMarker] = useState(false);

  const { naver } = window as CustomWindow;

  useEffect(() => {
    createMap();
    mapType == "searchByMarker" && searchingByDragAdd();
    createMarker();
  }, [marker]);

  function createMap() {
    mapRef.current = new naver.maps.Map(document.getElementById("map"), {
      zoom: 13,
    });
    if (!mapRef.current) return;
    (mapRef.current as any).setCursor("pointer");
  }

  function createMarker() {
    let coordinate: { x: number; y: number } | undefined;

    const newCoordinate = coordinate as { x: number; y: number };

    markerRef.current = new naver.maps.Marker({
      position: new naver.maps.LatLng(newCoordinate.y, newCoordinate.x),
      map: mapRef.current,
      icon: {
        content: markerHTML(room.price),
        anchor: new naver.maps.Point(10, 15),
      },
    });

    markerClickEvent(markerRef.current, room);
    setPostMarker(true);
    setMarker(true);
  }

  function markerClickEvent(marker: any, room: any) {
    const { naver } = window as CustomWindow;
    naver.maps.Event.addListener(
      marker,
      "click",
      (e: { coord: { duratiob: number; easing: string } }) => {
        const mapLatLng = new naver.maps.LatLng(
          Number(room?.y_coordinate),
          Number(room?.x_coordinate)
        );
        // 부드럽게 이동하기
        mapRef.current.panTo(mapLatLng, e?.coord);
      }
    );
  }

  const searchingByDragAdd = () => {
    const { naver } = window as CustomWindow;
    naver.maps.Event.addListener(mapRef.current, "dragend", dragendEvent);
    const mapLatLng = new naver.maps.LatLng(
      Number(currentPos[0]),
      Number(currentPos[1])
    );
    mapRef.current.panTo(mapLatLng, {
      x: currentPos[0],
      y: currentPos[1],
    });
  };

  const dragendEvent = () => {
    if (!mapRef.current) return;
    const center = mapRef.current.getCenter();
    setPos([center.y, center.x]);
  };

  return (
    <div
      id="map"
      className="h-screen w-full rounded-lg"
      style={{ display: "flex", height: "calc(50vh)" }}
    />
  );
}
