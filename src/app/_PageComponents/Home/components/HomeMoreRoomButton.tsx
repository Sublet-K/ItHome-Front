import { NormalButton } from "@shared/styles/Public.styles";
import styled from "styled-components";
import { PolicyText } from "@shared/styles/Public.styles";
import { Post } from "@type/Type";
import { Dispatch, SetStateAction } from "react";
import { fetchMoreRoomsDefault } from "@shared/components/FetchList/FetchList";

const NoButtonLayout = styled(PolicyText)`
  margin-top: 3rem;
`;

export const HomeMoreRoomButton = ({
  listRoomAmount,
  listPageAmount,
  roomsData,
  preRoomsData,
  setRoomsData,
  setPreRoomsData,
  setListPageAmount,
}: {
  listRoomAmount: number;
  listPageAmount: number;
  roomsData: Post[];
  preRoomsData: Post[];
  setRoomsData: Dispatch<SetStateAction<Post[]>>;
  setPreRoomsData: Dispatch<SetStateAction<Post[]>>;
  setListPageAmount: Dispatch<SetStateAction<number>>;
}) => {
  if (preRoomsData.length === 0) {
    return <NoButtonLayout>더 불러올 방이 없습니다.</NoButtonLayout>;
  } else {
    return (
      <NormalButton
        /*variant="contained"*/ onClick={() => {
          fetchMoreRoomsDefault(
            listRoomAmount,
            listPageAmount,
            roomsData,
            preRoomsData,
            setRoomsData,
            setPreRoomsData,
            setListPageAmount
          );
        }}
      >
        방 더보기
      </NormalButton>
    );
  }
};
