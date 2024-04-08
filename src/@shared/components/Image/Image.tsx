import Image from "next/image";

export const NormalImage = ({
  imageLink,
  altContent,
}: {
  imageLink: string;
  altContent: string;
}) => {
  return (
    <div style={{ width: "308px", height: "292px", position: "relative" }}>
      <Image
        loader={() => imageLink}
        src={imageLink}
        className="rounded-lg"
        layout="fill"
        objectFit="contain stroke-gray-50	"
        alt={altContent}
      />
    </div>
  );
};
