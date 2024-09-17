'use client'
import { useRef } from "react";
import Button from "./ui/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileUploadProps {
  onUploadButtonClick: () => void;
  onLoadImage: () => void;
  inputRef: HTMLInputElement
}

export const FileUpload = ({ onUploadButtonClick, onLoadImage, inputRef }: FileUploadProps) => {
  return (
    <div>
      {/* <Button onClick={onUploadButtonClick}>
        <CloudUploadIcon /> File Upload
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onLoadImage}
          className="hidden"
        />
      </Button> */}
    </div>
  )
}
