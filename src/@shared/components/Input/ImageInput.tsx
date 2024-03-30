import React, {
  useState,
  useRef,
  ChangeEvent,
  ChangeEventHandler,
} from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { colors } from "@mui/material";
import Image from "next/image";

export const ImageUploadComponent = ({
  key,
  imgIndex,
  setImage,
}: {
  key: number;
  imgIndex: number;
  setImage: (file: any, idx: number) => void;
}) => {
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력에 대한 참조 생성

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file, imgIndex);
    }
  };

  const handleClickImage = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click(); // 이미지 클릭 시 파일 입력 클릭 이벤트 트리거
  };

  const imgSize = 500; // 이미지 크기, next 의 Image 태그는 width, height가 필수.
  return (
    <div>
      {preview ? (
        <Image
          width={imgSize}
          height={imgSize*0.75}
          src={preview}
          alt="Image preview"
          onClick={handleClickImage}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <button onClick={handleClickImage}>
          <AddBoxIcon style={{ color: colors.blue[500], fontSize: 100 }} />
        </button>
      )}
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: "none" }} // 입력 필드를 숨김
        ref={fileInputRef} // 참조 연결
      />
    </div>
  );
};
