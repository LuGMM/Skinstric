"use client";

import CameraCapture from "@/app/components/cameraCapture";
import PreparingAnalysis from "@/app/components/preparingAnalysis";
import { useEffect, useState } from "react";

export default function Capture() {
  const [isLoading, setIsLoading] = useState<any>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  }, []);
  return (
    <>
      {isLoading ? (
        <PreparingAnalysis preparingTitle={"PREPARING CAMERA"} />
      ) : (
        <CameraCapture />
      )}
    </>
  );
}
