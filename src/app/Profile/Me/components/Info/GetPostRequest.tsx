import {
  DateFormat,
  Information,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents.js";
import {
  DetailParagraph,
  Horizon,
  NormalButton,
  SecondHead,
} from "@shared/components/styles/Public.styles";
import { RequestForm } from "@/app/RequestType";

export function PostRequest({ requestInfo }: { requestInfo: RequestForm }) {
  return (
    <div className="mb-4">
      <SecondHead>요청서 현황</SecondHead>
      <Horizon />
      {requestInfo.map((res) => {
        const infoList = {
          비용: priceToString(res.price),
          "방 개수": res.number_room,
          "욕실 개수": res.number_bathroom,
          "침실 개수": res.number_bedroom,
          "계약 형태": res.accomodation_type,
          건물: res.building_type,
          학교: res.school,
          요청사항: res.request_text,
        };

        return (
          <>
            <div className="mt-2">
              <SecondHead>
                {res.city + " " + res.gu + " " + res.dong}
              </SecondHead>
              <DetailParagraph>
                요청 날짜: {DateFormat(res.start_day)} ~{" "}
                {DateFormat(res.end_day)}
              </DetailParagraph>
              {Object.keys(infoList).map((k) => (
                <Information title={k} info={infoList[k]} />
              ))}

              <NormalButton>메세지 보내기</NormalButton>
            </div>
            <div>
              <Horizon className="mt-2" />
            </div>
          </>
        );
      })}
    </div>
  );
}
