'use client'
import { Coordinates, Cropper, CropperRef, ImageSize } from "react-advanced-cropper";

interface ImageSelectorProps {
  src?: string;
  selectionRect?: Coordinates | null;
  OnSelectionChange: (cropper: CropperRef) => void;
}

const ImageSelector = ({ src, selectionRect, OnSelectionChange }: ImageSelectorProps) => {
  const defaultCoordinates = ({ imageSize }: { imageSize: ImageSize }) => {
    return (
      selectionRect || {
        top: imageSize.width * 0.1,
        left: imageSize.width * 0.1,
        width: imageSize.width * 0.8,
        height: imageSize.height * 0.8,
      }
    );
  };

  return (
    <Cropper
      src={src}
      className={"h-[600px]"}
      stencilProps={{
        overlayClassName: "cropper-overlay",
      }}
      backgroundWrapperProps={{
        scaleImage: false,
        moveImage: false,
      }}
      defaultCoordinates={defaultCoordinates}
      onChange={OnSelectionChange}
    />
  );
}

export default ImageSelector;