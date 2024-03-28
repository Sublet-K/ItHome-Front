import styled from 'styled-components';
import tw from 'twin.macro';

export const ImgContainer = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  height: 300px;
`;

export const RoomInfoSection = styled.section`
  ${tw`bg-white p-4 rounded-lg shadow-md mx-3 mb-6`}
`;

export const RoomTitle = styled.section`
  ${tw`text-3xl font-bold mx-3 mt-1 mb-6`}
`;

export const RoomInfoButton = styled.button`
  ${tw`w-full rounded-lg bg-gray-300 text-black p-1`}
`;
