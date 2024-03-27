import { NormalButton } from "@shared/styles/Public.styles";
import styled from "styled-components";
import { PolicyText } from "@shared/styles/Public.styles";
import { Room } from "@app/RoomType";

const NoButtonLayout = styled(PolicyText)`
  margin-top: 3rem;
`;

export const HomeMoreRoomButton = ({
  preRoomsData,
  fetchRoomsDefault,
}: {
  preRoomsData: Room[];
  fetchRoomsDefault: () => void;
}) => {
  if (preRoomsData.length === 0) {
    return <NoButtonLayout>더 불러올 방이 없습니다..</NoButtonLayout>;
  } else {
    return (
      <NormalButton /*variant="contained"*/ onClick={fetchRoomsDefault}>
        방 더보기
      </NormalButton>
    );
  }
};
