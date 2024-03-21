import {
  DeleteButton,
  InfoButton,
  SecondHead,
} from "@shared/styles/Public.styles";
import { RequestDeleteDialog } from "../Dialog/RequestDeleteDialog";
import { RequestDetailDialog } from "../Dialog/RequestDetailDialog";
import { RequestRespondDialog } from "../Dialog/RequestRespondDialog";
import { MouseEventHandler, useState } from "react";
import { RequestForm } from "@/app/RequestType";

export function RequsetSummaryBlock({
  request,
  startDate,
  endDate,
  price,
}: {
  request: RequestForm;
  startDate: Date;
  endDate: Date;
  price: string;
}) {
  const address = request.city + " " + request.gu + " " + request.dong;

  const [inputs, setInputs] = useState({
    detailPopUpState: false,
    respondPopUpState: false,
    deletePopUpState: false,
  });
  const { detailPopUpState, respondPopUpState, deletePopUpState } = inputs;
  const infoButtonList = {
    detailPopUpState: "상세 정보",
    respondPopUpState: "응답 리스트",
  };
  const onChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]:
        !inputs[e.currentTarget.name as keyof typeof inputs],
    });
  };

  return (
    <div className="ml-4">
      <SecondHead>• {address}</SecondHead>
      {/*  */}
      <div className="ml-2">
        {request.complete ? (
          <p className="ml-3 text-lg text-[#F62424] font-medium">요청서 완료</p>
        ) : (
          <p className="ml-3 text-sm text-blue-700 font-bold">요청서 진행중</p>
        )}
      </div>
      {/* 공개 변경 버튼 추가 */}
      <div className="block">
        {Object.keys(infoButtonList).map((k, index) => {
          return (
            <InfoButton
              key={index}
              className="ml-4"
              name={k}
              onClick={onChange}
            >
              {infoButtonList[k as keyof typeof infoButtonList]}
            </InfoButton>
          );
        })}
        <DeleteButton name="deletePopUpState" onClick={onChange}>
          삭제하기
        </DeleteButton>
      </div>
      <RequestDetailDialog
        onChange={onChange}
        detailPopUpState={detailPopUpState}
        request={request}
        address={address}
        price={price}
        startDate={startDate}
        endDate={endDate}
      />

      <RequestRespondDialog
        respondPopUpState={respondPopUpState}
        onChange={onChange}
        request={request}
      />

      <RequestDeleteDialog
        key={request.key.toString()}
        deletePopUpState={deletePopUpState}
        onChange={onChange}
      />
    </div>
  );
}
