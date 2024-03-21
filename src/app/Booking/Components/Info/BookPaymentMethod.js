import {
  Horizon,
  NormalText,
  SecondHead,
} from '@shared/components/styles/Public.styles';
import {
  Box,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { FormControl } from 'react-bootstrap';
import PaymentForm from '../Pay/Payment';
import { AccountPayment } from '../Pay/AccountPayment.js';
import { BookPaymentForm } from './BookPaymentForm.js';

export const BookPaymentMethod = ({
  paySelect,
  onPaySelectHandle,
  checkState,
  checkHandled,
}) => {
  return (
    <>
      <SecondHead className="mt-4">결제 수단</SecondHead>
      {/* 카드 번호, 유효기간, vs */}
      <Horizon />
      <div className="mt-2 ml-4">
        <NormalText>예약 확정 전에는 요금이 청구되지 않습니다.</NormalText>
        <Box className="mt-4 mx-9" justifyContent="center" alignItems="center">
          <BookPaymentForm
            paySelect={paySelect}
            onPaySelectHandle={onPaySelectHandle}
          />
          {paySelect === 'account' ? <AccountPayment /> : <PaymentForm />}
          <NormalText className="mt-2">
            <Checkbox
              type="checkbox"
              checked={checkState}
              onChange={checkHandled}
            />
            체크박스를 클릭하시면 이체를 완료하셨음을 동의하는 것입니다.
          </NormalText>
        </Box>
      </div>
    </>
  );
};
