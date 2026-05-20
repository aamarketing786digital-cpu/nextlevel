"use client";

import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

export function trackGAEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  sendGAEvent("event", action, params ?? {});
}

export function trackGTMEvent(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  sendGTMEvent({ event: eventName, ...(data ?? {}) });
}

export function trackConversion(value: number = 1, currency: string = "USD") {
  if (typeof window === "undefined") return;

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

  if (!adsId || !label) {
    console.warn("[trackConversion] Missing Ads ID or label");
    return;
  }

  const sendTo = `${adsId}/${label}`;
  sendGAEvent("event", "conversion", {
    send_to: sendTo,
    value,
    currency,
  });
}