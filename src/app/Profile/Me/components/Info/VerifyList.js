import { NormalText } from '@shared/components/styles/Public.styles';

export function VerifyList({ k, v }) {
  return (
    <NormalText>
      {k} {v ? '인증 완료✅' : '인증 안됨❌'}
    </NormalText>
  );
}
