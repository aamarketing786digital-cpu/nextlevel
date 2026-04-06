"use client";

import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // error is required by Next.js but not used in this global error handler
  void (typeof reset);
  return (
    <html>
      <body className="min-h-screen bg-teal-950 flex items-center justify-center pt-24 md:pt-32">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          {/* Error Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 mb-8">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Critical Error
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-400 mb-8">
            A critical error has occurred. Please refresh the page or contact support if the problem persists.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              size="lg"
              className="rounded-full bg-orange-500 hover:bg-orange-400 text-slate-950 transition-colors"
            >
              Try Again
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white"
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
