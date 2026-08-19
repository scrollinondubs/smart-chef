"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Ingredient } from "@/lib/types";

interface ImageUploadProps {
  onRecognized: (ingredients: Ingredient[]) => void;
}

export function ImageUpload({ onRecognized }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError(null);
    setIsProcessing(true);

    try {
      const imageDataUrl = await readFileAsDataUrl(file);
      const response = await fetch("/api/ingredients/recognize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageDataUrl }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error ?? "Couldn't process that photo.");
      }

      const { ingredients } = await response.json();
      onRecognized(ingredients);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setIsProcessing(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan your fridge</CardTitle>
        <CardDescription>
          Upload a photo and we&apos;ll suggest what&apos;s inside. This runs on a local mock recognizer for
          now - you can always add or correct ingredients below.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          id="fridge-photo"
          onChange={handleFileChange}
        />
        <Button type="button" onClick={() => inputRef.current?.click()} disabled={isProcessing}>
          {isProcessing ? "Analyzing photo..." : "Upload fridge photo"}
        </Button>
        {fileName && !error && <span className="text-sm text-slate-500">{fileName}</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </CardContent>
    </Card>
  );
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
