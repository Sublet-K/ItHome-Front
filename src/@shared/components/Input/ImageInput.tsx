import Image from "next/image";
import React, { ChangeEventHandler, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { StyleComponent } from "../StaticComponents/StaticComponents";

interface ImageUploadComponentProps {
  imgIndex: number;
  setImage: (files: File[], idx: number) => void;
}

export const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  imgIndex,
  setImage,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((currentPreviews) => [...currentPreviews, ...newPreviews]);
    setImage(files, imgIndex);
  };
  const onDrop = (acceptedFiles: File[]) => {
    handleFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleClickImage = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const imgSize = 500;

  return (
    <div>
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
      >
        <input
          accept="image/jpg, image/jpeg, image/png"
          id="dropzone-file"
          className="hidden"
          type="file"
          multiple
          onChange={handleImageChange}
          ref={fileInputRef}
          {...getInputProps()}
        />
        <StyleComponent content="ImageDrop" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {previews.map((preview, index) => (
          <Image
            key={index}
            width={imgSize}
            height={imgSize * 0.75}
            src={preview}
            alt={`Image preview ${index}`}
            onClick={handleClickImage}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
};
