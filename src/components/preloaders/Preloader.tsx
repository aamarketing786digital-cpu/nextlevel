"use client";

import { useState } from "react";
import { PreloaderFluid } from "@/components/preloaders/Variations";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  if (!isLoading) return null;

  return <PreloaderFluid onComplete={() => setIsLoading(false)} />;
}
