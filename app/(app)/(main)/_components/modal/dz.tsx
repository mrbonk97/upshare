import { FilePlus2 } from "lucide-react";
import React from "react";
import Dropzone from "react-dropzone";

interface DzProps {
  handleFile: (e: File) => void;
}

export const Dz = ({ handleFile }: DzProps) => (
  <Dropzone onDrop={(acceptedFiles) => handleFile(acceptedFiles[0])}>
    {({ getRootProps, getInputProps }) => (
      <div
        className="h-44 w-full flex2 flex-col rounded-lg border-2 border-dashed border-blue-400 text-blue-400"
        {...getRootProps()}
      >
        <FilePlus2 size={48} />
        <span className="mt-2 text-sm">파일을 그래그 하거나 클릭</span>
        <input {...getInputProps()} />
      </div>
    )}
  </Dropzone>
);
