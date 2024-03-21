import {
  DateFormat,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
import { FetchGetRequest } from "@shared/components/FetchList/FetchList";
import { useState } from "react";
import {
  NormalButton,
  NormalText,
  SecondHead,
} from "@shared/styles/Public.styles";
import { RequsetSummaryBlock } from "../Blocks/RequsetSummaryBlock";
import { RequestForm } from "@app/RequestType";

export function RequestListComponent() {
  const [requestInfo, setRequestInfo] = useState<RequestForm[]>([]);
  FetchGetRequest(setRequestInfo);

  return (
    <div className="mb-4 mt-8">
      <SecondHead className="inline">요청서 현황</SecondHead>
      <NormalButton>요청서 올리기</NormalButton>
      {requestInfo.length > 0 ? (
        requestInfo.map((res, index) => {
          const startDate = DateFormat(res.start_day);
          const endDate = DateFormat(res.end_day);
          const price = priceToString(res.price);

          return (
            <RequsetSummaryBlock
              key={index}
              request={res}
              startDate={startDate}
              endDate={endDate}
              pay={price}
            />
          );
        })
      ) : (
        <NormalText>올린 요청서가 아직 없습니다.</NormalText>
      )}
    </div>
  );
}
