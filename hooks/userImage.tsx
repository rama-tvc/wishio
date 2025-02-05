// PreviewContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

interface PreviewContextType {
  previewUrl: string;
  setPreviewUrl: (url: string) => void;
}

const PreviewContext = createContext<PreviewContextType | null>(null);

export function PreviewProvider({ children }) {
  const [previewUrl, setPreviewUrl] = useState("");
  return (
    <PreviewContext.Provider value={{ previewUrl, setPreviewUrl }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const ctx = useContext(PreviewContext);
  if (!ctx) {
    throw new Error("usePreview must be used within PreviewProvider");
  }
  return ctx;
}
