import { RequestForm } from "@/@type/Type";
import { FetchGetRequest } from "@shared/components/FetchList/FetchList";
import {
  DateFormat,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
import {
  NormalButton,
  NormalText,
  SecondHead,
} from "@shared/styles/Public.styles";
import { useState } from "react";
import { RequsetSummaryBlock } from "../Blocks/RequsetSummaryBlock";

export function RequestListComponent() {
  const [requestInfo, setRequestInfo] = useState<RequestForm[]>([]);
  FetchGetRequest(setRequestInfo);

  return (
    <div className="mb-4 mt-8">
      <div className="flex justify-between">
        <SecondHead className="inline">요청서 현황</SecondHead>

        <NormalButton>요청서 올리기</NormalButton>
      </div>

      {(requestInfo && requestInfo.length) > 0 ? (
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
              price={price}
            />
          );
        })
      ) : (
        <NormalText>올린 요청서가 아직 없습니다.</NormalText>
      )}
    </div>
  );
}
