"use client";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Trash2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

type ImageUploadProps = {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div className="mb-4 flex flex-wrap items-center gap-4">
      {value.map((url) => (
        <div className="relative w-[200px] h-[200px]">
          <Image
            src={url}
            alt="collection"
            className="object-cover rounded-lg"
            fill
          />
          <div className="absolute top-0 right-0 z-10">
            <Button
              className="bg-red-1 text-white"
              size="sm"
              onClick={() => onRemove(url)}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
      <div></div>
      <CldUploadWidget uploadPreset="n7ja2u0f" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button className="bg-grey-1 text-white" onClick={() => open()}>
              <Plus className="h-4 w-4 mr-2" /> Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
