import Image from "next/image";

export const MainProfileImage = ({
  imageLink,
  altContent,
}: {
  imageLink: string;
  altContent: string;
}) => {
  return (
    <div
      style={{ width: "100%", height: "292px", position: "relative" }}
      className="hover:grow hover:shadow-lg cursor-pointer"
    >
      <Image
        loader={() => imageLink}
        src={imageLink}
        className="rounded"
        layout="fill"
        objectFit="contain stroke-gray-50	"
        alt={altContent}
      />
    </div>
  );
};
export const ProfileImage = ({
  imageLink,
  altContent,
}: {
  imageLink: string;
  altContent: string;
}) => {
  return (
    <div style={{ width: "128px", height: "128px", position: "relative" }}>
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
