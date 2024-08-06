import Image from "next/image";
import React, { ChangeEventHandler, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDropzone } from "react-dropzone";

interface ImageUploadComponentProps {
  imgIndex: number;
  setImage: (files: File[], idx: number) => void;
}

export const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({
  imgIndex,
  setImage,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((currentPreviews) => [...currentPreviews, ...newPreviews]);
    setImages((currentImages) => [...currentImages, ...files]);
    setImage([...images, ...files], imgIndex); // 이미지 업데이트
  };

  const onDrop = (acceptedFiles: File[]) => {
    handleFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleClickImage = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleDeleteImage = (index: number) => {
    setPreviews((currentPreviews) => {
      const newPreviews = [...currentPreviews];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
    setImages((currentImages) => {
      const newImages = [...currentImages];
      newImages.splice(index, 1);
      setImage(newImages, imgIndex); // 부모 컴포넌트 업데이트
      return newImages;
    });
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(previews);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPreviews(items);

    const reorderedImages = Array.from(images);
    const [reorderedFile] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedFile);

    setImages(reorderedImages);
    setImage(reorderedImages, imgIndex); // 부모 컴포넌트 업데이트
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
        <p>이미지를 클릭하거나 드래그하여 업로드하세요.</p>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="imagePreviews" direction="horizontal">
          {(provided) => (
            <div
              className="grid grid-cols-3 gap-4 mt-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {previews.map((preview, index) => (
                <Draggable
                  key={`draggable-${index}`}
                  draggableId={`draggable-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative"
                    >
                      <Image
                        width={imgSize}
                        height={imgSize * 0.75}
                        src={preview}
                        alt={`Image preview ${index}`}
                        style={{ cursor: "grab" }} // 손 모양 커서로 변경
                      />
                      <button
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        onClick={() => handleDeleteImage(index)}
                      >
                        X
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
