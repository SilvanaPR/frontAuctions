"use client";
import React, { useState, useEffect } from "react";

export default function ImageReader({ onImageChange, imagePreview }) {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      onImageChange(file);
    } else {
      setPreview(null);
      onImageChange(null);
    }
  };

  useEffect(() => {
    if (imagePreview) {
      setPreview(imagePreview)
    }
  }, [imagePreview]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {preview && (
        <div className="mt-4">
          <p className="text-sm text-gray-700 mb-2">Vista previa:</p>
          <img
            src={preview}
            alt="Vista previa"
            className="h-40 object-contain rounded-md border border-gray-300"
          />
        </div>
      )}

      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 my-8"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Haz click para subir una imagen</span> o arrastra y suelta
          </p>
          <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
}
