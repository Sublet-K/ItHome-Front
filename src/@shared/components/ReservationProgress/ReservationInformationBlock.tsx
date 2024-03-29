import { Reservation } from "@app/ReservationType";
import { NormalText, PolicyText } from "@shared/styles/Public.styles";

export const ReservationInformationBlock = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="border-solid border-2 border-sky-500 ...">
      <NormalText>{title}</NormalText>
      <br />
      <PolicyText>{content}</PolicyText>
    </div>
  );
};
