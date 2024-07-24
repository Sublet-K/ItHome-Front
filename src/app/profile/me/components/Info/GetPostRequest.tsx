import { RequestForm } from "@/app/RequestType";
import {
  DateFormat,
  Information,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
import {
  DeleteButton,
  DetailParagraph,
  Horizon,
  NormalButton,
  NormalText,
  SecondHead,
} from "@shared/styles/Public.styles";

export function PostRequest({ requestInfo }: { requestInfo: RequestForm[] }) {
  return (
    <div className="mb-4">
      <SecondHead>요청서 현황</SecondHead>
      <Horizon />
      {requestInfo !== undefined ? (
        <>
          {requestInfo.map((res, index) => {
            const infoList = {
              비용: priceToString(res.price),
              요청사항: res.request_text,
            };

            return (
              <div key={index}>
                <div className="mt-2">
                  <DetailParagraph>
                    요청 날짜: {DateFormat(res.start_day)} ~{" "}
                    {DateFormat(res.end_day)}
                  </DetailParagraph>
                  {Object.keys(infoList).map((k, i) => (
                    <Information
                      key={i}
                      title={k}
                      info={infoList[k as keyof typeof infoList]}
                    />
                  ))}

                  <NormalButton>수락하기</NormalButton>

                  <DeleteButton>거절하기</DeleteButton>
                </div>
                <div>
                  <Horizon className="mt-2" />
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <NormalText>요청서가 없습니다</NormalText>
        </>
      )}
    </div>
  );
}
