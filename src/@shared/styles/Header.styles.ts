import styled from "styled-components";

// 유의 : state 값에 따른 디자인 변경으로 인해, 몇몇 요소는 직접 .js 코드에서 react style과 혼용해서 사용.

// searchFilteringComponents 의 스타일.
export const blackBoldFont = styled.div`
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
`;

export const acceptOrCancleButton = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
  margin-bottom: 0.5em;
`;
