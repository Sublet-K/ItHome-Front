import { NormalText, SecondHead } from "@shared/styles/Public.styles";

export const ReservationInformationBlock = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  if (title == "입주방식" && content == "") {
  }
  return (
    <div className="border-solid border-2 rounded-lg text-left">
      <div className="ml-1">
        <SecondHead>{title}</SecondHead>
        <div className="ml-1">
          {title == "입주방식" && content == "" ? (
            <NormalText>입주 확정 이후 공개됩니다.</NormalText>
          ) : (
            <NormalText>{content}</NormalText>
          )}
        </div>
      </div>
    </div>
  );
};
