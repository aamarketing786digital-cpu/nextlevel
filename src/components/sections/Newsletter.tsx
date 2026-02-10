"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema } from "@/lib/validation";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setMessage(result.error.issues[0]?.message || "Invalid email");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to subscribe. Please try again.");
    }
  };

  return (
    <section className="py-32 section-dark bg-background relative overflow-hidden border-t border-white/5">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 max-w-3xl mx-auto text-center px-6 md:px-0">
        <div className="overflow-hidden mb-6 md:mb-8">
            <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight"
            >
            Join the <span className="text-gradient-gold">Inner Circle</span>
            </motion.h2>
        </div>
        <p className="mb-8 md:mb-12 text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
          Exclusive insights on AI, design, and growth. <br className="hidden md:block"/> No noise, just signal.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto max-w-lg relative group">
           {/* Glowing Border Container */}
          <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-2 transition-all duration-300 focus-within:border-primary/50 focus-within:shadow-[0_0_40px_-10px_rgba(212,165,32,0.3)] hover:border-white/20">
            
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading" || status === "success"}
              className="flex-1 bg-transparent border-none text-white placeholder:text-slate-500 focus-visible:ring-0 h-12 md:h-14 pl-4 md:pl-6 text-base md:text-lg"
              required
            />
            
            <Button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="h-12 md:h-14 px-6 md:px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base md:text-lg shadow-lg hover:shadow-primary/25 transition-all w-auto whitespace-nowrap"
            >
              {status === "loading" ? (
                  <span className="animate-pulse">Sending...</span>
              ) : (
                  "Subscribe"
              )}
            </Button>
          </div>

          {/* Status Messages */}
          <div className="absolute top-full left-0 w-full mt-4">
               {status === "success" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary font-medium bg-primary/10 py-2 px-4 rounded-full inline-block border border-primary/20 text-sm md:text-base">
                    {message}
                </motion.div>
              )}
              {status === "error" && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 font-medium bg-red-500/10 py-2 px-4 rounded-full inline-block border border-red-500/20 text-sm md:text-base">
                    {message}
                </motion.div>
              )}
          </div>
        </form>

        <p className="mt-10 md:mt-16 text-[10px] md:text-xs text-slate-600 uppercase tracking-widest font-medium">
          NextLevel Marketerz • Dubai • UAE
        </p>
      </div>
    </section>
  );
}
