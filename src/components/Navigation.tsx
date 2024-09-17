'use client'

// According to the mode, define the type of action.
import React, { useRef } from 'react';
import Button from "./ui/Button";

interface NavigationProps {
  children?: React.ReactNode;
  onUpload?: (blob: string) => void;
  getImageData: () => Promise<any>;
  remove_bg: () => void;
};

const Navigation = ({ onUpload, getImageData, remove_bg }: NavigationProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadButtonClick = () => {
    inputRef.current?.click();
  }

  const onLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files[0]) {
      if (onUpload) {
        onUpload(URL.createObjectURL(files[0]));
      }
    }

    event.target.value = "";
  }
  return (
    <div className='flex flex-row justify-between gap-10'>
      <Button onClick={onUploadButtonClick}>
        File Upload
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onLoadImage}
          className="hidden"
        />
      </Button>

      <Button onClick={remove_bg}>
        <span>Generate Images</span>
      </Button>
    </div>
  )
}

export default Navigation;