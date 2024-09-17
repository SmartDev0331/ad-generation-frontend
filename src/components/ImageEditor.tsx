'use client'
import { useState, useRef } from "react";
import Navigation from "./Navigation";
import { CropperRef, FixedCropper, FixedCropperRef, Coordinates, ImageRestriction } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { drawImage, getCanvasData, createCanvas } from "@/lib/canvas";
import ImageSelector from "./ImageSelector";
import { useAtom } from "jotai";
import { srcAtom } from "@/context/srcAtom";
import { LoadingIcon } from "./LoadingIcon";
import { resolve } from "path";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ImageEditor = () => {

  const cropperRef = useRef<FixedCropperRef>(null);
  const [mode, setMode] = useState("crop");
  const isGenerating = mode === "generate";
  const [selectionRect, setSelectionRect] = useState<Coordinates | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useAtom(srcAtom);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [src, setSrc] = useState("https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/livewire-tmp/2ILk0g1tgpk7wFFlc72hyAtdmHjxAj-metaZjNkNzVjMWQtMTI1OS00NDA4LTg0YmQtNzA0NTVmMTljZjcwLTAucG5n-.png");
  console.log('src------>', src);

  const onUpload = (imageSrc: string) => {
    console.log('uploading------->', imageSrc);
    setSrc(imageSrc);
    setImg(imageSrc);
    setMode('crop');
  }

  const getImageData = async () => {
    if (!src) return;

    const canvas = createCanvas();
    await drawImage(canvas, src);

    console.log('canvas--------->', canvas);
    return getCanvasData(canvas);
  }

  const onSelectionChange = (cropper: CropperRef) => {
    setSelectionRect(cropper.getCoordinates());
  };

  const remove_bg = async () => {
    setIsLoading(true);
    const image = await (getImageData()) as Blob;

    if (!image) console.log("image----->", image);
    const storageRef = ref(storage, `images/${Date.now()}-${image}`);

    try {
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);

      setImageUrl(url);
      setError(null); // Clear any previous errors
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }



    const samurl = "https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/livewire-tmp/2ILk0g1tgpk7wFFlc72hyAtdmHjxAj-metaZjNkNzVjMWQtMTI1OS00NDA4LTg0YmQtNzA0NTVmMTljZjcwLTAucG5n-.png";



    const API_KEY = "y6hMEN8KOxK4VZprH4DMwSwbfUfJWwHrg0lnBZHOrD5E9pLfURoCGEpbdsiy";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "key": API_KEY,
      "seed": 12345,
      "image": src,
      "post_process_mask": false,
      "only_mask": false,
      "alpha_matting": false,
      "webhook": null,
      "track_id": null
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    }

    try {
      const response = await fetch("https://modelslab.com/api/v6/image_editing/removebg_mask", requestOptions);
      const result = await response.json();
      console.log('result------>', result);
      setIsLoading(false)

      if (result.status != "error") {
        const futureLink = result.future_links ? result.future_links[0] : null;
        if (futureLink) {

          await new Promise(resolve => setTimeout(resolve, 1000));

          const imageResponse = await fetch(futureLink);
          const imageBlob = await imageResponse.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          console.log('future_link------->', futureLink);
          setSrc(imageUrl);
        }
        else {
          console.log('No future link provided');
        }
      }
      else {
        console.log("Failed to upload the image");
      }


      return result;
    } catch (error) {
      console.error('Error removing background:', error);
      throw error;
    }

  }

  return (
    <div className="flex flex-col items-center relative">
      <div className="w-full relative flex flex-col items-center gap-4 pt-10">
        {
          isGenerating ? (
            <ImageSelector
              src={src} selectionRect={selectionRect} OnSelectionChange={onSelectionChange}
            />
          ) : (
            <FixedCropper
              src={src}
              ref={cropperRef}
              className={"h-[600px] flex flex-row"}
              stencilProps={{
                movable: false,
                resizable: false,
                lines: false,
                handlers: false,
              }}
              stencilSize={{
                width: 600,
                height: 600,
              }}
              imageRestriction={ImageRestriction.stencil}
            />
          )
        }

        <Navigation onUpload={onUpload} getImageData={getImageData} remove_bg={remove_bg} />


        {isLoading &&
          (
            <div className="absolute w-full h-full flex flex-row items-center justify-center">
              <LoadingIcon />
            </div>
          )
        }
      </div>
    </div>

  )
}

export default ImageEditor;