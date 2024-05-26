"use client";

import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    naver?: any;
  }
}

interface AddressItem {
  name: string;
  region: {
    area1: { name?: string };
    area2: { name?: string };
    area3: { name?: string };
    area4: { name?: string };
  };
  land?: {
    number1?: string;
    number2?: string;
    type?: string;
    name?: string;
    addition0: { value?: string };
  };
}

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const { naver } = window;
    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.3595316, 127.1052133),
      zoom: 15,
      mapTypeControl: true,
    });

    const infoWindow = new naver.maps.InfoWindow({
      anchorSkew: true,
    });

    map.setCursor("pointer");

    function hasArea(area?: { name?: string }): boolean {
      return !!(area && area.name && area.name !== "");
    }

    function hasData(data: any): boolean {
      return !!(data && data !== "");
    }

    function checkLastString(
      word: string | undefined = "",
      lastString: string | undefined
    ): boolean {
      return new RegExp(lastString + "$").test(word);
    }

    function hasAddition(addition: { value?: string }): boolean {
      return !!(addition && addition.value);
    }

    function makeAddress(item: AddressItem): string {
      const { region, land, name } = item;
      let { area1, area2, area3, area4 } = region;
      let rest: string | undefined = "";
      let ri: string | undefined = "";
      let dongmyun: string | undefined = "";
      let sigugun: string | undefined = "";
      let sido: string | undefined = "";

      if (hasArea(area1)) sido = area1.name;
      if (hasArea(area2)) sigugun = area2.name;
      if (hasArea(area3)) dongmyun = area3.name;
      if (hasArea(area4)) ri = area4.name;

      if (land) {
        if (hasData(land.number1)) {
          if (hasData(land.type) && land.type === "2") {
            rest += "산";
          }
          rest += land.number1;
          if (hasData(land.number2)) {
            rest += "-" + land.number2;
          }
        }
        if (name === "roadaddr") {
          if (checkLastString(dongmyun, "면")) {
            ri = land.name;
          } else {
            dongmyun = land.name;
            ri = "";
          }
          if (hasAddition(land.addition0)) {
            rest += " " + land.addition0.value;
          }
        }
      }

      return [sido, sigugun, dongmyun, ri, rest].join(" ");
    }

    function searchCoordinateToAddress(latlng: naver.maps.LatLng) {
      infoWindow.close();
      naver.maps.Service.reverseGeocode(
        {
          coords: latlng,
          orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(","),
        },
        function (status: any, response: any) {
          if (status !== naver.maps.Service.Status.ERROR) {
            const items = response.v2.results;
            const htmlAddresses = items.map((item: any, i: number) => {
              const address = makeAddress(item) || "";
              const addrType =
                item.name === "roadaddr" ? "[도로명 주소]" : "[지번 주소]";
              return `<div>${i + 1}. ${addrType} ${address}</div>`;
            });

            infoWindow.setContent(
              `<div style="padding:10px;min-width:200px;line-height:150%;"><h4 style="margin-top:5px;">검색 좌표</h4><br />${htmlAddresses.join(
                "<br />"
              )}</div>`
            );
            infoWindow.open(map, latlng);
          } else {
            alert("Something Wrong!");
          }
        }
      );
    }

    map.addListener("click", function (e: any) {
      searchCoordinateToAddress(e.coord);
    });
  }, []);

  return <div ref={mapRef} style={{ width: "40rem", height: "40rem" }} />;
};

export default MapComponent;
