import { NormalText } from "@shared/styles/Public.styles";

export function VerifyList({ k, v }: { k: string; v: boolean }) {
  return (
    <NormalText>
      {k} {v ? "인증 완료✅" : "인증 안됨❌"}
    </NormalText>
  );
}
