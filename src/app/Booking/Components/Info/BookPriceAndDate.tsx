import { priceToString } from '@shared/components/StaticComponents/StaticComponents';
import {
  Horizon,
  JustifyBlock,
  NormalText,
  PolicyText,
  SecondHead,
} from '@shared/components/styles/Public.styles';

export const BookPriceAndDate = ({
  startDay,
  endDay,
  totalDay,
  totalPay,
  monthPay,
}) => {
  return (
    <div>
      <SecondHead>기간 / 금액</SecondHead>
      <Horizon />

      <PolicyText className="ml-2">
        {startDay} ~ {endDay} ({totalDay}일)
      </PolicyText>
      <div>
        {totalDay >= 28 && (
          <div className="ml-2 mt-4">
            <JustifyBlock>
              <NormalText>매월 결제 금액</NormalText>
              <NormalText className="mr-4">
                {priceToString(monthPay)} 원
              </NormalText>
            </JustifyBlock>

            <PolicyText className="ml-2">
              * 28일이 넘는 경우에는 월마다 결제합니다.
            </PolicyText>
            <Horizon />
          </div>
        )}

        <JustifyBlock className="ml-2 font-bold flex justify-between">
          <NormalText className="mt-1">총 결제 금액 </NormalText>
          <p className="text-l text-[#2478F6]">{priceToString(totalPay)} 원</p>
        </JustifyBlock>
      </div>
    </div>
  );
};
