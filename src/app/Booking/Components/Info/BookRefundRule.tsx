import {
  DisableButton,
  Horizon,
  NormalButton,
  NormalText,
  SecondHead,
} from '@shared/components/styles/Public.styles';

export const BookRefundRule = ({
  totalRefundDate,
  partRefundDate,
  checkState,
  handlePostReservation,
}) => {
  return (
    <div>
      <SecondHead className="mt-4">규칙 / 정책</SecondHead>
      <Horizon />
      <div className="mt-2 ml-4">
        <NormalText className="mt-2">
          • {totalRefundDate} 전까지 무료로 취소하실 수 있습니다. <br />•{' '}
          {partRefundDate} 전에 취소하면 부분 환불을 받으실 수 있습니다.
          <br />
          <br />
          • 훌륭한 게스트가 되기 위한 몇 가지 간단한 규칙을 지켜주실 것을 모든
          게스트에게 당부드리고 있습니다.
          <br />
          1. 숙소 이용규칙을 준수하세요.
          <br />
          2. 호스트의 집도 자신의 집처럼 아껴주세요.
          <br />
          3. 아래 버튼을 선택하면 호스트가 설정한 숙소 이용규칙, 게스트에게
          적용되는 기본 규칙, 에어비앤비 재예약 및 환불 정책에 동의하며, 피해에
          대한 책임이 본인에게 있을 경우 에어비앤비가 결제 수단으로 청구의
          조치를 취할 수 있다는 사실에 동의하는 것입니다.
        </NormalText>
      </div>
      <div className="mt-4" fullWidth>
        {checkState ? (
          <NormalButton onClick={handlePostReservation}>결제하기</NormalButton>
        ) : (
          <DisableButton disabled>결제하기</DisableButton>
        )}
      </div>
    </div>
  );
};
